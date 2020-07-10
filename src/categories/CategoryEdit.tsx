import React, { FC } from "react";
import {
  useTranslate,
} from "react-admin";

import { FieldProps, Category } from "../types";

import ProductList from "../products/ProductList";

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
