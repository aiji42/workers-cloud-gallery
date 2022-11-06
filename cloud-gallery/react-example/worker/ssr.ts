import { renderPage } from "vite-plugin-ssr";

export const handleSsr = async (url: string, userAgent: string) => {
  const pageContextInit = {
    urlOriginal: url,
    fetch: (...args: Parameters<typeof fetch>) => fetch(...args),
    userAgent, // need?
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
