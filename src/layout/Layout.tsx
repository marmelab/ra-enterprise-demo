import React from "react";
import { useSelector } from "react-redux";
import { Layout, Sidebar } from "react-admin";

import AppBar from "./AppBar";
import Menu from "./Menu";
import { darkTheme, lightTheme } from "./themes";
import { AppState } from "../types";

import { Guide } from "../guide";
import { GuideProvider } from "../guide";
import guides from "../guide/guides";

const CustomSidebar = (props: any) => <Sidebar {...props} size={200} />;

export default (props: any) => {
  const theme = useSelector((state: AppState) =>
    state.theme === "dark" ? darkTheme : lightTheme
  );
  return (
    <GuideProvider guides={guides}>
      <Guide />
      <Layout
        {...props}
        appBar={AppBar}
        sidebar={CustomSidebar}
        menu={Menu}
        theme={theme}
      />
    </GuideProvider>
  );
};
