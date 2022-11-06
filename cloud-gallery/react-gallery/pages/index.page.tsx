import React from "react";
import { Gallery } from "./componnts/Gallery";
import { getCookieForReact } from "helpers";

export const Page = (props: { request: Request }) => {
  const delay = Number(getCookieForReact("delay", props.request) ?? 0);
  const filter = new URL(props.request.url).searchParams.get("tag");

  return <Gallery delay={delay} filter={filter} />;
};
