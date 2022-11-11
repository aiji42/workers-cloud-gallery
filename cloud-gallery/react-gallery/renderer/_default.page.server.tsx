import React from "react";
import { renderToReadableStream } from "react-dom/server";
import { escapeInject } from "vite-plugin-ssr";
import { PageContextProvider } from "../pages/componnts/PageContext";

export const passToClient = [
  "pageProps",
  "routeParams",
  "searchParams",
  "_runtimeBaseAssets",
];

export const render = async (pageContext: any) => {
  const {
    Page,
    pageProps,
    routeParams,
    searchParams,
    _runtimeBaseAssets: basePath,
  } = pageContext;

  const stream = await renderToReadableStream(
    <PageContextProvider
      value={{ basePath, params: { ...routeParams, ...searchParams } }}
    >
      <Page {...pageProps} />
    </PageContextProvider>
  );

  return escapeInject`<div id="page-view">${stream}</div>`;
};
