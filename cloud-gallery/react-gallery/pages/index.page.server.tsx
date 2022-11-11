import { getCookieForReact } from "helpers";
export { Page } from "./index.page";

export function onBeforeRender(pageContext: { request: Request }) {
  const delay = Number(getCookieForReact("delay", pageContext.request) ?? 0);
  const filter = new URL(pageContext.request.url).searchParams.get("tag");
  const baseAssets = new URL(pageContext.request.url).searchParams.get("base");

  return {
    pageContext: {
      pageProps: {
        delay,
        filter,
        baseAssets,
      },
    },
  };
}
