import { renderPage } from "vite-plugin-ssr";

export const handleSsr = async (
  request: Request,
  env: Record<string, unknown>,
  context: ExecutionContext
) => {
  const pageContextInit = {
    urlOriginal: request.url,
    fetch: (...args: Parameters<typeof fetch>) => fetch(...args),
    request,
    env,
    context,
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
