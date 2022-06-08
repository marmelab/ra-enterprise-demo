import * as React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { Link, useTranslate, useGetMany, useRecordContext } from 'react-admin';

import { Order, Product } from '../types';
import { TableCellRight } from './TableCellRight';

const Basket = () => {
    const record = useRecordContext<Order>();
    const translate = useTranslate();

    const productIds = record ? record.basket.map(item => item.product_id) : [];

    const { isLoading, data: products } = useGetMany<Product>(
        'products',
        { ids: productIds },
        { enabled: !!record }
    );
    const productsById = products
        ? products.reduce((acc, product) => {
              acc[product.id] = product;
              return acc;
          }, {} as any)
        : {};

    if (isLoading || !record || !products) return null;

    return (
        <Paper sx={{ minWidth: '35em', marginLeft: '1em' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            {translate(
                                'resources.commands.fields.basket.reference'
                            )}
                        </TableCell>
                        <TableCellRight>
                            {translate(
                                'resources.commands.fields.basket.unit_price'
                            )}
                        </TableCellRight>
                        <TableCellRight>
                            {translate(
                                'resources.commands.fields.basket.quantity'
                            )}
                        </TableCellRight>
                        <TableCellRight>
                            {translate(
                                'resources.commands.fields.basket.total'
                            )}
                        </TableCellRight>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {record.basket.map((item: any) => (
                        <TableRow key={item.product_id}>
                            <TableCell>
                                <Link to={`/products/${item.product_id}`}>
                                    {productsById[item.product_id].reference}
                                </Link>
                            </TableCell>
                            <TableCellRight>
                                {productsById[
                                    item.product_id
                                ].price.toLocaleString(undefined, {
                                    style: 'currency',
                                    currency: 'USD',
                                })}
                            </TableCellRight>
                            <TableCellRight>{item.quantity}</TableCellRight>
                            <TableCellRight>
                                {(
                                    productsById[item.product_id].price *
                                    item.quantity
                                ).toLocaleString(undefined, {
                                    style: 'currency',
                                    currency: 'USD',
                                })}
                            </TableCellRight>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell colSpan={2} />
                        <TableCell>
                            {translate('resources.commands.fields.basket.sum')}
                        </TableCell>
                        <TableCellRight>
                            {record?.total_ex_taxes.toLocaleString(undefined, {
                                style: 'currency',
                                currency: 'USD',
                            })}
                        </TableCellRight>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2} />
                        <TableCell>
                            {translate(
                                'resources.commands.fields.basket.delivery'
                            )}
                        </TableCell>
                        <TableCellRight>
                            {record?.delivery_fees.toLocaleString(undefined, {
                                style: 'currency',
                                currency: 'USD',
                            })}
                        </TableCellRight>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2} />
                        <TableCell>
                            {translate(
                                'resources.commands.fields.basket.tax_rate'
                            )}
                        </TableCell>
                        <TableCellRight>
                            {record.tax_rate.toLocaleString(undefined, {
                                style: 'percent',
                            })}
                        </TableCellRight>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2} />
                        <TableCell sx={{ fontWeight: 'bold' }}>
                            {translate(
                                'resources.commands.fields.basket.total'
                            )}
                        </TableCell>
                        <TableCellRight sx={{ fontWeight: 'bold' }}>
                            {record?.total.toLocaleString(undefined, {
                                style: 'currency',
                                currency: 'USD',
                            })}
                        </TableCellRight>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
};

export default Basket;
