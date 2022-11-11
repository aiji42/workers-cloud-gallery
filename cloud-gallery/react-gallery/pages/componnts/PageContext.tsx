import React, { useContext } from "react";
import { createContext, ReactNode } from "react";

type PageParams<
  T extends Record<string, string | undefined> = Record<
    string,
    string | undefined
  >
> = {
  basePath: string | null;
  params: T;
};

const Context = createContext<PageParams>({ basePath: null, params: {} });

export const PageContextProvider = <
  T extends Record<string, string | undefined> = Record<
    string,
    string | undefined
  >
>(props: {
  value: PageParams<T>;
  children: ReactNode;
}) => {
  return <Context.Provider {...props} />;
};

export const usePageContext = <
  T extends Record<string, string | undefined> = Record<
    string,
    string | undefined
  >
>(): PageParams<T> => useContext(Context) as PageParams<T>;
