import React, { ReactNode, Suspense, useId } from "react";
import "./Gallery.css";
import { images } from "../../../constants";

export const Gallery = ({
  delay,
  filter,
}: {
  delay: number;
  filter?: string | null;
}) => {
  const filtered = images.filter((i) => !filter || i.tags.includes(filter));
  const Lag = makeLag();

  return (
    <div className="container">
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
                  <GalleryItem src={img.name} tags={img.tags} />
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
          loading = true;
          r(true);
        }, props.delay * 1000);
      });

    return <>{props.children}</>;
  };
};

const GalleryItem = (props: { src: string; tags: string[] }) => {
  return (
    <div className="gallery-item">
      <img
        className="gallery-image"
        alt="cloud picture"
        src={
          "https://cloud-gallery.web-experiments.workers.dev/_fragment/gallery/" +
          props.src
        }
        width={300}
        height={450}
      />
      <div className="tags">{props.tags.join(", ")}</div>
    </div>
  );
};
