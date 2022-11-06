import { manifest } from "@qwik-client-manifest";
import { Gallery } from "./root";
import { renderResponse } from "helpers";

export default {
  fetch(
    request: Request,
    env: Record<string, unknown>,
    context: ExecutionContext
  ): Promise<Response> {
    return renderResponse(request, env, context, <Gallery />, manifest, "div");
  },
};
