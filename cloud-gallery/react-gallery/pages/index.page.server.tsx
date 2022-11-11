import { getCookieForReact } from "helpers";
export { Page } from "./index.page";

export function onBeforeRender(pageContext: { request: Request }) {
  const delay = Number(getCookieForReact("delay", pageContext.request) ?? 0);

  return {
    pageContext: {
      pageProps: {
        delay,
      },
    },
  };
}
