import FakeRest from "fakerest";
import fetchMock from "fetch-mock";
import generateData from "data-generator-retail";

import demoData from "./demo-data";

const getAllChildrenCategories = (categories, parentId) => {
  const parentCategory = categories.find(({ id }) => id === parentId);
  const children = parentCategory.children.map((childId) =>
    getAllChildrenCategories(categories, childId)
  );

  return [parentId, ...children];
};

export default () => {
  const data = generateData({ serializeDate: true });
  const mergedData = { ...data, ...demoData };

  const restServer = new FakeRest.FetchServer("http://localhost:4000");
  if (window) {
    window.restServer = restServer; // give way to update data in the console
  }
  restServer.addRequestInterceptor((request) => {
    // intercepts list of products with a category filter
    if (
      request.method === "GET" &&
      request.url.includes("/products") &&
      request.params.filter &&
      request.params.filter.category_id
    ) {
      // to include all sub categories of the selected category in the filter
      request.params.filter.category_id = getAllChildrenCategories(
        mergedData.categories,
        parseInt(request.params.filter.category_id)
      );
    }
    return request;
  });
  restServer.init(mergedData);
  restServer.toggleLogging(); // logging is off by default, enable it
  fetchMock.mock("begin:http://localhost:4000", restServer.getHandler());
  return () => fetchMock.restore();
};
