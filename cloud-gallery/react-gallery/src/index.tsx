import React from "react";
import { renderToReadableStream } from "react-dom/server";
import { Gallery } from "~/componnts/Gallery";
import { parse } from "cookie";

const cookiesPrefix = "multi_worker_demo__";

export default {
  async fetch(request: Request): Promise<Response> {
    const filter = new URL(request.url).searchParams.get("tag");
    const cookieString = request.headers.get("cookie") ?? "";
    const cookie = parse(cookieString);
    const delay = cookie[`${cookiesPrefix}delay`] ?? null;

    const stream = await renderToReadableStream(
      <div>
        <Gallery delay={delay ? Number(delay) : 0} filter={filter} />
      </div>
    );
    return new Response(stream);
  },
};
