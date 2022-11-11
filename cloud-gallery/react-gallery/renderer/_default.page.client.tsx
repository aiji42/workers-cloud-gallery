import React from "react";
import { hydrateRoot } from "react-dom/client";
import { PageContextProvider } from "../pages/componnts/PageContext";

export const render = async (pageContext: any) => {
  const {
    Page,
    pageProps,
    routeParams,
    searchParams,
    _runtimeBaseAssets: basePath,
  } = pageContext;

  hydrateRoot(
    document.getElementById("page-view")!,
    <PageContextProvider
      value={{ basePath, params: { ...routeParams, ...searchParams } }}
    >
      <Page {...pageProps} />
    </PageContextProvider>
  );
};
