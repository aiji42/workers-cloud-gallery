import { handleSsr } from "./ssr";
import { handleStaticAssets } from "./static-assets";

async function handleFetch(
  request: Request,
  env: Record<string, unknown>,
  context: ExecutionContext
) {
  if (!isAssetUrl(request)) {
    const response = await handleSsr(request, env, context);
    if (response !== null) return response;
  }
  return handleStaticAssets(request, env, context);
}

function isAssetUrl(request: Request) {
  const { pathname } = new URL(request.url);
  return pathname.includes("/assets/");
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
