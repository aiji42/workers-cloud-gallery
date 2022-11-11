import React from "react";

export function Page(pageProps: any) {
  if (pageProps.is404) {
    return <div>Page Not Found</div>;
  } else {
    return <div>Error</div>;
  }
}
