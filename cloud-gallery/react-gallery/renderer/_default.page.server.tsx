import React from "react";
import { renderToReadableStream } from "react-dom/server";
import { escapeInject } from "vite-plugin-ssr";

export const render = async (pageContext: any) => {
  const { Page, ...pageProps } = pageContext;

  const stream = await renderToReadableStream(<Page {...pageProps} />);

  return escapeInject`<div>${stream}</div>`;
};
