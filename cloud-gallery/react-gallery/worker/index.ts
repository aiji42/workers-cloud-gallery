import { handleSsr } from "./ssr";

async function handleFetch(
  request: Request,
  env: Record<string, unknown>,
  context: ExecutionContext
) {
  const response = await handleSsr(request, env, context);
  if (!response) throw new Error("Response is null");

  return response;
}

export default {
  async fetch(
    request: Request,
    env: Record<string, unknown>,
    context: ExecutionContext
  ): Promise<Response> {
    try {
      return await handleFetch(request, env, context);
    } catch (e) {
      console.error(e);
      return new Response("Internal Error", { status: 500 });
    }
  },
};
