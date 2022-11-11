import { images } from "../../constants";
import { RenderErrorPage } from "vite-plugin-ssr";
export { Page } from "./@id.page";

export function onBeforeRender({
  routeParams,
}: {
  routeParams: { id: string };
}) {
  const image = images[Number(routeParams.id)];
  if (!image) throw RenderErrorPage({ pageContext: { is404: true } });

  return {
    pageContext: {
      pageProps: {
        image,
      },
    },
  };
}
