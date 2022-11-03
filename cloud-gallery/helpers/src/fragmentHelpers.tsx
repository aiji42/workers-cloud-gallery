import { component$, SSRStream, useEnvData } from "@builder.io/qwik";

type CacheConfig = { maxAge: number; revalidate: number };

export const FragmentPlaceholder = component$(
	({ name, cacheConfig }: { name: string; cacheConfig?: CacheConfig }) => {
		const env = useEnvData<Record<string, unknown>>("env")!;
		const request = useEnvData<Request>("request")!;
		const context = useEnvData<ExecutionContext>("context")!;
		const decoder = new TextDecoder();
		return (
			<SSRStream>
				{async (streamWriter) => {
					const fragment = await fetchFragment(
						env,
						name,
						request,
						context,
						cacheConfig
					);
					const reader = fragment.getReader();
					let fragmentChunk = await reader.read();
					while (!fragmentChunk.done) {
						streamWriter.write(decoder.decode(fragmentChunk.value));
						fragmentChunk = await reader.read();
					}
				}}
			</SSRStream>
		);
	}
);

/**
 * Attempt to get an asset hosted by a fragment service.
 *
 * Such asset requests start with `/_fragment/{service-name}/`, which enables us
 * to choose the appropriate service binding and delegate the request there.
 */
export async function tryGetFragmentAsset(
	env: Record<string, unknown>,
	request: Request
) {
	const url = new URL(request.url);
	const match = /^\/_fragment\/([^/]+)(\/.*)$/.exec(url.pathname);
	if (match === null) {
		return null;
	}
	const serviceName = match[1];
	const service = env[serviceName];
	if (!isFetcher(service)) {
		throw new Error("Unknown fragment service: " + serviceName);
	}
	return await service.fetch(
		new Request(new URL(match[2], request.url), request)
	);
}

export async function fetchFragment(
	env: Record<string, unknown>,
	fragmentName: string,
	request: Request,
	context: ExecutionContext,
	cacheConfig?: CacheConfig
) {
	const service = env[fragmentName];
	if (!isFetcher(service)) {
		throw new Error(
			`Fragment ${fragmentName} does not have an equivalent service binding.`
		);
	}
	const url = new URL(request.url);
	url.searchParams.set("base", `/_fragment/${fragmentName}/`);
	const newRequest = new Request(url, request);
	const [cache, stale] = await restore(newRequest, env, context, cacheConfig);

	if (cache && !stale) return cache;

	if (!cache) {
		const response = await service.fetch(newRequest);
		const cloned = response.clone();
		if (response.body === null || cloned.body === null) {
			throw new Error(`Response from "${fragmentName}" request is null.`);
		}

		context.waitUntil(store(newRequest, cloned.body, env, cacheConfig));
		return response.body;
	}

	// existing cache but it is stale
	context.waitUntil(
		(async () => {
			const response = await service.fetch(newRequest);
			if (response.body === null) {
				throw new Error(`Response from "${fragmentName}" request is null.`);
			}
			return store(newRequest, response.body, env, cacheConfig);
		})()
	);
	return cache;
}

function isFetcher(obj: unknown): obj is Fetcher {
	return Boolean((obj as Fetcher).fetch);
}

function assertsKVNamespace(obj: unknown): asserts obj is KVNamespace {
	if (!(obj as KVNamespace).get) {
		throw new Error(`create cache store KV.`);
	}
}

async function restore(
	request: Request,
	env: Record<string, unknown>,
	context: ExecutionContext,
	cacheConfig?: CacheConfig
): Promise<[ReadableStream | null, boolean]> {
	if (!cacheConfig) return [null, true];
	const cacheStore = env["CACHE_STORE"];
	assertsKVNamespace(cacheStore);
	const cache = await cacheStore.getWithMetadata<{ expire: number }>(
		request.url,
		{
			type: "stream",
		}
	);
	if (!cache.value) return [null, true];

	const stale = Number(new Date()) > (cache.metadata?.expire ?? 0);
	return [cache.value, stale];
}

async function store(
	request: Request,
	responseBody: ReadableStream,
	env: Record<string, unknown>,
	cacheConfig?: CacheConfig
) {
	if (!cacheConfig) return;
	const cacheStore = env["CACHE_STORE"];
	assertsKVNamespace(cacheStore);

	return cacheStore.put(request.url, responseBody, {
		metadata: {
			expire: Number(new Date()) + cacheConfig.revalidate * 1000,
		},
		expirationTtl: cacheConfig.maxAge,
	});
}
