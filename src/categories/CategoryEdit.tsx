import React, { FC } from "react";
import {
  Datagrid,
  Edit,
  EditButton,
  NumberField,
  ReferenceManyField,
  SimpleForm,
  TextInput,
  useTranslate,
} from "react-admin";

import ThumbnailField from "../products/ThumbnailField";
import ProductRefField from "../products/ProductRefField";
import { FieldProps, Category } from "../types";

import ProductList from "../products/ProductList";

const CategoryTitle: FC<FieldProps<Category>> = ({ record }) => {
  const translate = useTranslate();
  return record ? (
    <span>
      {translate("resources.categories.name", { smart_count: 1 })} &quot;
      {record.name}&quot;
    </span>
  ) : null;
};

const CategoryEdit = ({ id, ...rest }: any) => {
  return (
    <ProductList
      {...rest}
      basePath="/products"
      resource="products"
      hasCreate
      hasEdit
      hasList={false}
      hasShow={false}
      filter={{ category_id: id }}
      exporter={null}
    />
  );
};

export default CategoryEdit;
