import React, { ReactNode } from "react";
import "./PageLayout.css";
import { PageContextProvider } from "./usePageContext";
import { PageContext } from "./PageContext";

export { PageLayout };

const PageLayout = ({
  pageContext,
  children,
}: {
  pageContext: PageContext;
  children: ReactNode;
}) => {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <Layout>
          <Sidebar>
            <a className="navitem" href="/">
              Home
            </a>
            <a className="navitem" href="/about">
              About
            </a>
            <a className="navitem" href="/star-wars">
              Star Wars
            </a>
          </Sidebar>
          <Content>{children}</Content>
        </Layout>
      </PageContextProvider>
    </React.StrictMode>
  );
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        display: "flex",
        maxWidth: 900,
        margin: "auto",
      }}
    >
      {children}
    </div>
  );
};

const Sidebar = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        padding: 20,
        paddingTop: 42,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        lineHeight: "1.8em",
      }}
    >
      {children}
    </div>
  );
};

const Content = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        padding: 20,
        paddingBottom: 50,
        borderLeft: "2px solid #eee",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
};
