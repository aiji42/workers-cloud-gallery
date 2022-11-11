import { Gallery } from "./componnts/Gallery";
import React from "react";

export const Page = (props: {
  delay: number;
  filter: string;
  baseAssets?: string;
}) => {
  return <Gallery {...props} />;
};
