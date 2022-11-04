import React, { Suspense } from "react";
import { renderToReadableStream } from "react-dom/server";

const DELAY = 2000;
let done = false;

const Component: React.FC = () => {
	if (done) {
		done = false;
		return (
			<p>
				<b>Hello World!!</b>
			</p>
		);
	}
	throw new Promise((resolve) =>
		setTimeout(() => {
			done = true;
			resolve(true);
		}, DELAY)
	);
};

export default {
	async fetch(
		request: Request,
		env: Record<string, unknown>,
		context: ExecutionContext
	): Promise<Response> {
		const stream = await renderToReadableStream(
			<div>
				<Suspense fallback={<p>Loading...</p>}>
					<Component />
				</Suspense>
			</div>
		);
		return new Response(stream);
	},
};
