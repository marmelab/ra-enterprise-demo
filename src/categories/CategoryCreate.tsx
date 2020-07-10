import React, { FC, useEffect } from "react";
import { Create, useTranslate, useRefresh, useRedirect } from "react-admin";

import { FieldProps, Category } from "../types";

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
  }, [record, save]);
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
