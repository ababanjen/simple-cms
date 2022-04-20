import { ReactNode } from "react";
import Head from "next/head";

const Layout = ({ children }: propTypes) => (
  <div>
    <div>{children}</div>
  </div>
);

export default Layout;
type propTypes = {
  children: ReactNode;
};
