import { renderPage } from "vite-plugin-ssr";

export const handleSsr = async (
  request: Request,
  env: Record<string, unknown>,
  context: ExecutionContext
) => {
  const url = new URL(request.url);

  const pageContextInit = {
    urlOriginal: request.url,
    request,
    env,
    context,
    _runtimeBaseAssets: url.searchParams.get("base"),
  };
  const pageContext = await renderPage(pageContextInit);
  const { httpResponse } = pageContext;
  if (!httpResponse) {
    return null;
  } else {
    const { statusCode, contentType } = httpResponse;
    const stream = httpResponse.getReadableWebStream();
    return new Response(stream, {
      headers: { "content-type": contentType },
      status: statusCode,
    });
  }
};
