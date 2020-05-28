import React from "react";
import { Layout, Sidebar } from "react-admin";

import { SidebarOpenPreferenceSync } from "@react-admin/ra-preferences";

import AppBar from "./AppBar";
import Menu from "./Menu";

import { Guide } from "../guide";
import { GuideProvider } from "../guide";
import guides from "../guide/guides";

const CustomSidebar = (props: any) => <Sidebar {...props} size={200} />;

export default (props: any) => {
  return (
    <GuideProvider guides={guides}>
      <Guide />
      <SidebarOpenPreferenceSync />
      <Layout
        {...props}
        appBar={AppBar}
        sidebar={CustomSidebar}
        menu={Menu}
      />
    </GuideProvider>
  );
};
