import React, { useEffect } from "react";
import { Admin, Resource, mergeTranslations } from "react-admin";
import polyglotI18nProvider from "ra-i18n-polyglot";

import { PreferencesBasedThemeProvider } from "@react-admin/ra-preferences";
import {
  reducer as tree,
  raTreeLanguageFrench,
  raTreeLanguageEnglish,
} from "@react-admin/ra-tree";

import "./App.css";

import { darkTheme, lightTheme } from "./layout/themes";
import authProvider from "./authProvider";
import { Login, Layout } from "./layout";
import { Dashboard } from "./dashboard";
import customRoutes from "./routes";
import englishMessages from "./i18n/en";

import visitors from "./visitors";
import orders from "./orders";
import products from "./products";
import invoices from "./invoices";
import categories from "./categories";
import reviews from "./reviews";
import tours from "./tours";

import dataProvider from "./dataProvider";
import fakeServer from "./fakeServer";

const i18nProvider = polyglotI18nProvider((locale) => {
  if (locale === "fr") {
    return import("./i18n/fr").then((messages) =>
      mergeTranslations(messages.default, raTreeLanguageFrench)
    );
  }
  return mergeTranslations(englishMessages, raTreeLanguageEnglish);
}, "en");

const App = () => {
  useEffect(() => {
    const restoreFetch = fakeServer();
    return () => {
      restoreFetch();
    };
  }, []);

  return (
    <PreferencesBasedThemeProvider
      themeFromType={(type) => (type === "dark" ? darkTheme : lightTheme)}
    >
      <Admin
        title=""
        dataProvider={dataProvider}
        customRoutes={customRoutes}
        customReducers={{ tree }}
        authProvider={authProvider}
        dashboard={Dashboard}
        loginPage={Login}
        layout={Layout}
        i18nProvider={i18nProvider}
      >
        <Resource name="customers" {...visitors} />
        <Resource name="commands" {...orders} options={{ label: "Orders" }} />
        <Resource name="invoices" {...invoices} />
        <Resource name="products" {...products} />
        <Resource name="categories" {...categories} />
        <Resource name="reviews" {...reviews} />
        <Resource name="tours" {...tours} />
      </Admin>
    </PreferencesBasedThemeProvider>
  );
};

export default App;
