import React from "react";
import { Layout, Sidebar, useNotify, useRedirect } from "react-admin";

import { SidebarOpenPreferenceSync } from "@react-admin/ra-preferences";

import AppBar from "./AppBar";
import Menu from "./Menu";

import { GuideProvider } from "@react-admin/ra-tour-guide";
import { usePreferences } from "@react-admin/ra-preferences";

import guides from "../guides";

const CustomSidebar = (props: any) => <Sidebar {...props} size={200} />;

export default (props: any) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const [tourPreferences, setTourPreferences] = usePreferences("tour");
  return (
    <GuideProvider
      guides={guides}
      tools={{ notify, redirect, setTourPreferences }}
      initialState={tourPreferences}
    >
      <>
        <SidebarOpenPreferenceSync />
        <Layout
          {...props}
          appBar={AppBar}
          sidebar={CustomSidebar}
          menu={Menu}
        />
      </>
    </GuideProvider>
  );
};
