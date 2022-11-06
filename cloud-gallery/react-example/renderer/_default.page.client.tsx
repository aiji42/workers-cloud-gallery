import React from "react";
import { hydrateRoot } from "react-dom/client";
import { PageLayout } from "./PageLayout";
import { PageContext } from "./PageContext";

export const render = async (pageContext: PageContext & { pageProps: any }) => {
  const { Page, pageProps } = pageContext;

  const root = document.getElementById("page-view");
  if (!root) throw new Error();
  hydrateRoot(
    root,
    <PageLayout pageContext={pageContext}>
      <Page {...pageProps} />
    </PageLayout>
  );
};
