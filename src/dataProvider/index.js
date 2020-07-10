import simpleRestProvider from "ra-data-simple-rest";
// import { addTreeMethodsBasedOnChildren } from "@react-admin/ra-tree";
import addTreeMethodsBasedOnChildren from "./addTreeMethodsBasedOnChildren";

import localStorageProvider from "./localStorageProvider";
import defaultState from "../tours/data";

const restProvider = addTreeMethodsBasedOnChildren(
  simpleRestProvider("http://localhost:4000")
);

const delayedDataProvider = new Proxy(restProvider, {
  get: (target, name, self) =>
    name === "then" // as we await for the dataProvider, JS calls then on it. We must trap that call or else the dataProvider will be called with the then method
      ? self
      : (resource, params) => {
          let provider = restProvider;
          if (resource === "tours") {
            provider = localStorageProvider(defaultState);
          }
          return new Promise((resolve) =>
            setTimeout(() => resolve(provider[name](resource, params)), 500)
          );
        },
});

export default delayedDataProvider;
