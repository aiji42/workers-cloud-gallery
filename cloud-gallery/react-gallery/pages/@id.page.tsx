import React from "react";
import { usePageContext } from "./componnts/PageContext";

export const Page = ({
  image,
}: {
  image: { name: string; tags: string[] };
}) => {
  const { basePath } = usePageContext<{ id: string }>();
  return (
    <div className="mt-11 w-[65vw] flex justify-center">
      <div className="relative">
        <img src={(basePath ?? "") + image.name} className="rounded-3xl" />
        <div className="absolute bottom-4 left-4 font-bold text-base bg-zinc-700 text-white p-1 rounded">
          {image.tags.join(", ")}
        </div>
      </div>
    </div>
  );
};
