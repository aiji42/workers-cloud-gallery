import React, { ReactNode, Suspense } from "react";
import { images } from "../../../constants";
import { usePageContext } from "./PageContext";

export const Gallery = ({ delay }: { delay: number }) => {
  const { params, basePath } = usePageContext<{ filter?: string }>();
  const filtered = images.filter(
    (i) => !params.filter || i.tags.includes(params.filter)
  );
  const Lag = makeLag();

  return (
    <div className="mt-11 w-[65vw]">
      <div className="flex justify-center">
        <span
          id="spinner"
          className="w-8 h-8 border-4 border-gray-700 rounded-full border-b-transparent inline-block box-border animate-spin"
        />
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(min(18rem,_100%),_18rem))] justify-items-center justify-center gap-4">
        {filtered.length === 0 && (
          <div>No matching photos. Try another filter</div>
        )}
        <Suspense>
          <Lag delay={delay}>
            <style>{`#spinner { display: none; }`}</style>
          </Lag>
        </Suspense>
        {filtered.length > 0 &&
          filtered.map((img, i) => {
            const Lag = makeLag();
            return (
              <Suspense key={i}>
                <Lag delay={delay * (i + 1)}>
                  <a href={`/${i}`}>
                    <GalleryItem
                      src={img.name}
                      tags={img.tags}
                      basePath={basePath ?? ""}
                    />
                  </a>
                </Lag>
              </Suspense>
            );
          })}
      </div>
    </div>
  );
};

const makeLag = () => {
  let loading = true;
  return (props: { delay: number; children: ReactNode }) => {
    if (loading)
      throw new Promise((r) => {
        setTimeout(() => {
          loading = false;
          r(true);
        }, props.delay * 1000);
      });

    return <>{props.children}</>;
  };
};

const GalleryItem = (props: {
  src: string;
  tags: string[];
  basePath: string;
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl w-72">
      <img
        className="w-full h-auto"
        alt="cloud picture"
        src={`${props.basePath}${props.src}`}
        width={300}
        height={450}
      />
      <div className="absolute bottom-4 left-4 font-bold text-base bg-gray-700 text-white p-1 rounded">
        {props.tags.join(", ")}
      </div>
    </div>
  );
};
