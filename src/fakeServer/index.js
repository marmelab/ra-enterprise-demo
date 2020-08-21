import FakeRest from "fakerest";
import fetchMock from "fetch-mock";
import generateData from "data-generator-retail";
import { random } from 'faker/locale/en';

import demoData from "./demo-data";

const getAllChildrenCategories = (categories, parentId) => {
  const parentCategory = categories.find(({ id }) => id === parentId);
  const children = parentCategory.children.flatMap((childId) =>
    getAllChildrenCategories(categories, childId)
  );

  return [parentId, ...children];
};

const rebindProductToCategories = (originalCategories, newCategories) => product => {
  const originalCategory = originalCategories.find(c => c.id === product.category_id);

  const matchingNewCategory = newCategories.find(c => c.name === originalCategory.name);

  // If the new category does not have sub categories, just ensure we have the correct id
  if (matchingNewCategory.children.length === 0) {
    return {
      ...product,
      category_id: matchingNewCategory.id,
    };
  }

  const newCategoryId = random.arrayElement(matchingNewCategory.children || []);

  return {
    ...product,
    category_id: newCategoryId,
  }
}

// Batch is used to simulate realtime for the tour
const addBatchToCommands = commands =>
  commands.sort((a, z) =>
      new Date(z.date) - new Date(a.date)
    )
    .map(addBatchToCommand);

const addBatchToCommand = (command, index) => {
  if (command.returned) {
    return command;
  }

  return {
    ...command,
    batch: 
      // The 5 most recent command should have the higher batch
      index < 5 ? 2 :
      // The next 5 most recent command should have a lower batch
      index < 10 ? 1 :
      // All other should have a 0 batch
      0
  }
}

export default () => {
  const data = generateData({ serializeDate: true });
  const products = data.products.map(
    rebindProductToCategories(data.categories, demoData.categories)
  );
  const commands = addBatchToCommands(data.commands);
    
  
  const mergedData = { ...data, ...demoData, products, commands };

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
      request.params.filter.category_id !== undefined
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
