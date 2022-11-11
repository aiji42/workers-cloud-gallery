import { renderPage } from "vite-plugin-ssr";

export const handleSsr = async (
  request: Request,
  env: Record<string, unknown>,
  context: ExecutionContext
) => {
  const url = new URL(request.url);
  const { base, ...searchParams } = Object.fromEntries(
    url.searchParams.entries()
  );

  const pageContextInit = {
    urlOriginal: request.url,
    request,
    env,
    context,
    searchParams,
    _runtimeBaseAssets: base ?? null,
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
