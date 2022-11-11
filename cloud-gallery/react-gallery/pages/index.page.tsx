import { Gallery } from "./componnts/Gallery";
import React from "react";

export const Page = (props: { delay: number }) => {
  return <Gallery delay={props.delay} />;
};
