import React, { FC, cloneElement, useMemo, forwardRef } from 'react';
import {
    List,
    Button,
    TopToolbar,
    CreateButton,
    sanitizeListRestProps,
    ExportButton,
} from 'react-admin';
import classnames from 'classnames';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import {
    SelectColumnsMenu,
    useSelectedColumns,
    usePreferences,
} from '@react-admin/ra-preferences';

import TableChartIcon from '@material-ui/icons/TableChart';
import AppsIcon from '@material-ui/icons/Apps';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
    root: {
        paddingBottom: 0,
        paddingTop: theme.spacing(4),
    },
    menuPaper: {
        padding: '1rem 0',
    },
    menuList: {
        '&> * > *': {
            padding: '0 2rem',
        },
    },
    toolContainer: {
        margin: '20px 0',
        '&:first-child': {
            marginTop: 0,
        },
        '&:last-child': {
            marginBottom: 0,
        },
    },
    columnsList: {
        maxHeight: '250px',
        overflowY: 'auto',
        margin: 0,
        background: '#eee',
    },
}));

const ToolContainer = forwardRef<any, any>(({ children }, ref) => {
    const classes = useStyles();

    return (
        <div ref={ref} className={classes.toolContainer}>
            {children}
        </div>
    );
});
ToolContainer.displayName = 'ToolContainer';

const ColumnsTool: FC<{ preferenceKey: string; defaultColumns: any }> = ({
    preferenceKey,
    defaultColumns,
}) => {
    const classes = useStyles();

    return (
        <>
            <Typography
                variant="overline"
                gutterBottom
                key="columns-selector-tool-title"
                component="div"
            >
                Columns to display
            </Typography>
            <SelectColumnsMenu
                key="columns-selector-tool-menu"
                preference={preferenceKey}
                columns={defaultColumns}
                // @ts-ignore
                label=""
                className={classes.columnsList}
            />
        </>
    );
};

const GridOrListTool: FC<{ view: any; setView: any }> = ({ view, setView }) => (
    <>
        <Typography
            variant="overline"
            gutterBottom
            key="view-selector-tool-title"
            component="div"
        >
            Layout
        </Typography>

        <ButtonGroup key="view-selector-tool-menu">
            <Button
                color={view === 'table' ? 'primary' : 'default'}
                onClick={(): void => {
                    setView('table');
                }}
                label="table"
            >
                <TableChartIcon />
            </Button>
            <Button
                color={view === 'grid' ? 'primary' : 'default'}
                onClick={(): void => {
                    setView('grid');
                }}
                label="grid"
            >
                <AppsIcon />
            </Button>
        </ButtonGroup>
    </>
);

const Actions: FC<any> = ({
    preferenceKey,
    currentSort,
    className,
    resource,
    filters,
    displayedFilters,
    exporter, // you can hide ExportButton if exporter = (null || false)
    filterValues,
    permanentFilter,
    hasList,
    hasShow,
    hasCreate, // you can hide CreateButton if hasCreate = false
    basePath,
    selectedIds,
    onUnselectItems,
    showFilter,
    maxResults,
    total,
    hasColumnsSelector,
    defaultColumns,
    hasViewSelector,
    view,
    setView,
    ...rest
}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();
    const open = Boolean(anchorEl);

    const handleClick = (event): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (): void => {
        setAnchorEl(null);
    };

    const hasTools = hasColumnsSelector || hasViewSelector;

    return (
        <TopToolbar
            className={classnames(className, classes.root)}
            {...sanitizeListRestProps(rest)}
        >
            {filters &&
                cloneElement(filters, {
                    resource,
                    showFilter,
                    displayedFilters,
                    filterValues,
                    context: 'button',
                })}
            <CreateButton basePath={basePath} />
            {exporter && (
                <ExportButton
                    disabled={total === 0}
                    resource={resource}
                    sort={currentSort}
                    // @ts-ignore
                    filter={{ ...filterValues, ...permanentFilter }}
                    exporter={exporter}
                    maxResults={maxResults}
                />
            )}

            {hasTools && (
                <>
                    <IconButton
                        aria-label="more"
                        aria-controls="user-preference-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        size="small"
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="user-preference-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        classes={{
                            paper: classes.menuPaper,
                            list: classes.menuList,
                        }}
                    >
                        {hasViewSelector && (
                            <ToolContainer>
                                <GridOrListTool view={view} setView={setView} />
                            </ToolContainer>
                        )}
                        {hasColumnsSelector && (
                            <ToolContainer>
                                <ColumnsTool
                                    preferenceKey={preferenceKey}
                                    defaultColumns={defaultColumns}
                                />
                            </ToolContainer>
                        )}
                    </Menu>
                </>
            )}
        </TopToolbar>
    );
};

const elementHasProp = (element, name, value): boolean =>
    element.props[name] && element.props[name] === value;

const hasChildren = (element, type, props): boolean => {
    if (!React.isValidElement(element)) return false;

    let hasChildrenOfType = false;

    React.Children.map(element, child => {
        if (hasChildrenOfType) return;
        if (!React.isValidElement(child)) return;

        if (
            // @ts-ignore
            child.type.name === type &&
            Object.keys(props).every(propName =>
                elementHasProp(child, propName, props[propName])
            )
        ) {
            hasChildrenOfType = true;
            return;
        }
        // @ts-ignore
        hasChildrenOfType = hasChildren(child.props.children, type, props);
    });

    return hasChildrenOfType;
};

const EnterpriseList: FC<any> = props => {
    const {
        className,
        preferenceKey,
        hasColumnsSelector = true,
        defaultColumns = [],
        defaultOmittedColumns = [],

        hasViewSelector = true,
        defaultView = 'small',

        children,
        ...rest
    } = props;
    const visibleColumns = useSelectedColumns({
        preferences: `${preferenceKey}.columns`,
        columns: defaultColumns,
        omit: defaultOmittedColumns,
    });

    const [view, setView] = usePreferences(
        `${preferenceKey}.view`,
        defaultView
    );

    const childrenElements = useMemo(
        () => children({ ...rest, columns: visibleColumns, view }),
        [visibleColumns, view, children, rest]
    );

    if (process.env.NODE_ENV === 'development') {
        if (
            hasColumnsSelector &&
            hasChildren(childrenElements, 'Datagrid', { optimized: true })
        ) {
            throw new Error(
                'Columns selector is not compatible with optimized Datagrids, please remove the optimized prop'
            );
        }
    }

    return (
        <List
            {...rest}
            className={className}
            actions={
                <Actions
                    preferenceKey={`${preferenceKey}.columns`}
                    hasColumnsSelector={hasColumnsSelector}
                    defaultColumns={defaultColumns}
                    hasViewSelector={hasViewSelector}
                    view={view}
                    setView={setView}
                />
            }
        >
            {childrenElements}
        </List>
    );
};

export default EnterpriseList;
