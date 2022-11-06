import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { FragmentPlaceholder } from "helpers";
import styles from "./Body.css?inline";
import { getCookie } from "helpers";

export default component$(() => {
  useStylesScoped$(styles);
  const cache = getCookie("fragment-cache");

  return (
    <div class="content">
      <div class="filter-fragment">
        <a
          href="https://cloud-gallery-filter.web-experiments.workers.dev/"
          class="seam-link"
        >
          filter
        </a>
        <FragmentPlaceholder name="filter" />
      </div>
      <div class="gallery-fragment">
        <a
          href="https://cloud-gallery-gallery.web-experiments.workers.dev/"
          class="seam-link"
        >
          gallery
        </a>
        <FragmentPlaceholder
          name="react-gallery"
          // cacheConfig={
          //   cache === "true" ? { maxAge: 60, revalidate: 10 } : undefined
          // }
        />
        {/*<FragmentPlaceholder*/}
        {/*	name="gallery"*/}
        {/*	cacheConfig={*/}
        {/*		cache === "true" ? { maxAge: 60, revalidate: 10 } : undefined*/}
        {/*	}*/}
        {/*/>*/}
      </div>
    </div>
  );
});
