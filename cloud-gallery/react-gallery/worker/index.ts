import { handleSsr } from "./ssr";
import { handleStaticAssets } from "./static-assets";

async function handleFetch(
  request: Request,
  env: Record<string, unknown>,
  context: ExecutionContext
) {
  const url = new URL(request.url);
  url.pathname = url.pathname.replace(/^\//, "/_fragment/react-gallery/");
  const proxyReq = new Request(url, request);

  if (!isAssetUrl(proxyReq)) {
    const response = await handleSsr(proxyReq, env, context);
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
