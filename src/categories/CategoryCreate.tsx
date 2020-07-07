import React, { FC, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Datagrid,
  Create,
  EditButton,
  NumberField,
  ReferenceManyField,
  SimpleForm,
  TextInput,
  useTranslate,
  useRefresh,
  useRedirect,
} from "react-admin";

import ThumbnailField from "../products/ThumbnailField";
import ProductRefField from "../products/ProductRefField";
import { FieldProps, Category } from "../types";

const CategoryTitle: FC<FieldProps<Category>> = ({ record }) => {
  const translate = useTranslate();
  return record ? (
    <span>
      {translate("resources.categories.name", { smart_count: 1 })} &quot;
      {record.name}&quot;
    </span>
  ) : null;
};

interface PromptProps {
  label: string;
  record?: any;
  save?: (data) => {};
}

const Prompt: FC<PromptProps> = ({
  label,
  save = () => {},
  record = {},
  ...rest
}) => {
  useEffect(() => {
    const result = window.prompt("Category", record.name);
    save({ ...record, name: result, children: [], isRoot: true });
  }, []);
  return null;
};

const CategoryCreate = (props) => {
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccess = ({ data }) => {
    redirect(props.basePath);
    refresh();
  };

  return (
    <Create {...props} onSuccess={onSuccess}>
      <Prompt label="Category name" />
    </Create>
  );
};

export default CategoryCreate;
