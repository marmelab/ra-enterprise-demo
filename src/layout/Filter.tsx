import React, { Children, cloneElement, ReactElement } from 'react';
import { Filter } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const useFilterStyles = makeStyles({
    formPointer: { pointerEvents: 'none' },
    childPointer: { pointerEvents: 'auto' },
});

//The default Filter style is covering the Breadcrumb by an invisible layout
//This styling is for force allowing click on the Breacrumb links
const StyledFilter = ({ children, ...props }) => {
    const classes = useFilterStyles(props);
    return (
        <Filter className={classes.formPointer} {...props}>
            {Children.map(children, child =>
                cloneElement(child as ReactElement<any>, {
                    className: classes.childPointer,
                })
            )}
        </Filter>
    );
};

export default StyledFilter;
