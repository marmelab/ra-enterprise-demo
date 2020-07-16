import React, { useEffect } from "react";
import { TreeWithDetails, useTreeController } from "@react-admin/ra-tree";

import CategoryEdit from "./CategoryEdit";
import CategoryCreate from "./CategoryCreate";

const CategoryList = (props: any) => {
  const { handleExpand } = useTreeController({
    resource: props.resource,
    titleField: "name",
  });

  useEffect(() => {
    handleExpand(["5"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
