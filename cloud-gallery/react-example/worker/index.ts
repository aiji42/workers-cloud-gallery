import { handleSsr } from "./ssr";
import { handleStaticAssets } from "./static-assets";

async function handleFetch(
  request: Request,
  env: Record<string, unknown>,
  context: ExecutionContext
) {
  const url = request.url;
  if (!isAssetUrl(url)) {
    const userAgent = request.headers.get("User-Agent") ?? "";
    console.log("ua", userAgent);
    const response = await handleSsr(url, userAgent);
    if (response !== null) return response;
  }
  return handleStaticAssets(request, env, context);
}

function isAssetUrl(url: string) {
  const { pathname } = new URL(url);
  return pathname.startsWith("/assets/");
}

export default {
  async fetch(
    request: Request,
    env: Record<string, unknown>,
    context: ExecutionContext
  ): Promise<Response> {
    try {
      return await handleFetch(request, env, context);
    } catch (e) {
      console.error(e);
      return new Response("Internal Error", { status: 500 });
    }
  },
};
