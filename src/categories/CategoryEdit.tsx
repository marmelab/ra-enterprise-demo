import React, { FC } from "react";
import { useTranslate } from 'ra-core';
import { Edit, SimpleForm, TextInput } from 'react-admin';

import ProductList from "../products/ProductList";
import { Typography, makeStyles } from "@material-ui/core";
import { EditComponentProps } from '../types';

const CategoryEdit = props => {
  const translate = useTranslate();
  const classes = useStyles();

  return (
    <>
      <Edit {...props}>
        <SimpleForm>
          <TextInput source="name" />
        </SimpleForm>
      </Edit>
      <Typography className={classes.subtitle} variant="h5">
        {translate('resources.products.name', { smart_count: 2 })}
      </Typography>
      <CategoryEditAside {...props} />
    </>
  );
};

const CategoryEditAside: FC<EditComponentProps> = ({ id, ...rest }) => (
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
    aside={false}
  />
);

export default CategoryEdit;

const useStyles = makeStyles(theme => ({
  subtitle: {
    marginTop: theme.spacing(6),
  },
}));