import React, { useEffect } from "react";
import { Datagrid, EditButton, List, TextField } from "react-admin";
import {
  CreateNode,
  EditNode,
  TreeWithDetails,
  useTreeController,
} from "@react-admin/ra-tree";

import LinkToRelatedProducts from "./LinkToRelatedProducts";
import CategoryEdit from "./CategoryEdit";
import CategoryCreate from "./CategoryCreate";

const CategoryList = (props: any) => {
  const { handleExpand } = useTreeController({
    resource: props.resource,
    titleField: "name",
  });
  useEffect(() => {
    handleExpand(["5"]);
  }, []);
  return (
    <TreeWithDetails
      create={CategoryCreate}
      edit={CategoryEdit}
      titleField="name"
      draggable
      allowMultipleRoots
      {...props}
    />
  );
};

export default CategoryList;
