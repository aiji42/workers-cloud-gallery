import React, { ReactNode, Suspense } from "react";
import "./Gallery.css";
import { images } from "../../../constants";
import { usePageContext } from "./PageContext";

export const Gallery = ({ delay }: { delay: number }) => {
  const { params, basePath } = usePageContext<{ filter?: string }>();
  const filtered = images.filter(
    (i) => !params.filter || i.tags.includes(params.filter)
  );
  const Lag = makeLag();

  return (
    <div className="gallery-container">
      <div className="spinner-container">
        <span id="spinner" className="spinner"></span>
      </div>
      <div className="cloud-grid">
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
    <div className="gallery-item">
      <img
        className="gallery-image"
        alt="cloud picture"
        src={`${props.basePath}${props.src}`}
        width={300}
        height={450}
      />
      <div className="tags">{props.tags.join(", ")}</div>
    </div>
  );
};
