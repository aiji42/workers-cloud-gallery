import React from "react";
import { usePageContext } from "./componnts/PageContext";

export const Page = ({
  image,
}: {
  image: { name: string; tags: string[] };
}) => {
  const { basePath } = usePageContext<{ id: string }>();
  return (
    <div>
      <img src={(basePath ?? "") + image.name} />
      <p>{image.tags.join(", ")}</p>
    </div>
  );
};
