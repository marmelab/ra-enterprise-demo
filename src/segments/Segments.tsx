import React, { FC } from 'react';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate, Title } from 'react-admin';

import LinkToRelatedCustomers from './LinkToRelatedCustomers';
import { useDefineAppLocation } from '@react-admin/ra-navigation';
import segments from './data';
import { Breadcrumb } from '../layout';

const useStyles = makeStyles({
    root: {
        marginTop: 16,
    },
});

const Segments: FC = () => {
    const translate = useTranslate();
    const classes = useStyles();
    useDefineAppLocation('customers.segments');
    return (
        <>
            <Breadcrumb />
            <Card className={classes.root}>
                <Title title={translate('resources.segments.name')} />
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                {translate('resources.segments.fields.name')}
                            </TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {segments.map(segment => (
                            <TableRow key={segment.id}>
                                <TableCell>{translate(segment.name)}</TableCell>
                                <TableCell>
                                    <LinkToRelatedCustomers
                                        segment={segment.id}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </>
    );
};

export default Segments;
