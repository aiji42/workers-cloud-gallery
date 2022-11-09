import React from "react";
import { hydrateRoot } from "react-dom/client";

export const render = async (pageContext: any) => {
  const { Page, pageProps } = pageContext;
  hydrateRoot(document.getElementById("page-view")!, <Page {...pageProps} />);
};
