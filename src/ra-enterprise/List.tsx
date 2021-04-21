import React, {
    cloneElement,
    useMemo,
    forwardRef,
    ReactElement,
    FC,
    ReactNode,
    JSXElementConstructor,
    useRef,
} from 'react';

import {
    Button,
    TopToolbar,
    CreateButton,
    sanitizeListRestProps,
    ExportButton,
    useListContext,
    ListProps,
} from 'react-admin';

import { List } from '@react-admin/ra-enterprise';
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
import { ColumnList } from '@react-admin/ra-preferences/esm/src/list/useSelectedColumns';
import CustomBreadcrumb from '../layout/Breadcrumb';

const useStyles = makeStyles({
    root: {
        paddingBottom: 0,
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
});

const ToolContainer = forwardRef<HTMLDivElement, any>(({ children }, ref) => {
    const classes = useStyles();

    return (
        <div ref={ref} className={classes.toolContainer}>
            {children}
        </div>
    );
});
ToolContainer.displayName = 'ToolContainer';

const ColumnsTool: FC<{
    preferenceKey: string;
    defaultColumns: { [key: string]: ReactElement };
}> = ({ preferenceKey, defaultColumns }) => {
    const classes = useStyles();
    const ref = useRef<HTMLDivElement | null>(null);

    return (
        <>
            <Typography
                variant="overline"
                gutterBottom
                key="columns-selector-tool-title"
                component="div"
                ref={ref}
            >
                Columns to display
            </Typography>
            <SelectColumnsMenu
                key="columns-selector-tool-menu"
                preference={preferenceKey}
                columns={defaultColumns}
                className={classes.columnsList}
            />
        </>
    );
};

type View = 'table' | 'grid' | 'small';
type SetView = (view: View) => void;

const GridOrListTool: FC<{
    view: View;
    setView: SetView;
}> = ({ view, setView }) => (
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
                onClick={(): void => setView('table')}
                label="table"
            >
                <TableChartIcon />
            </Button>
            <Button
                color={view === 'grid' ? 'primary' : 'default'}
                onClick={(): void => setView('grid')}
                label="grid"
            >
                <AppsIcon />
            </Button>
        </ButtonGroup>
    </>
);

const Actions: FC<{
    className?: string;
    defaultColumns: { [key: string]: ReactElement };
    filters?: ReactElement | false;
    hasColumnsSelector?: boolean;
    hasList?: boolean;
    hasShow?: boolean;
    hasViewSelector?: boolean;
    maxResults?: number;
    permanentFilter?: any;
    preferenceKey: string;
    setView: SetView;
    view: View;
}> = ({
    className,
    defaultColumns,
    filters,
    hasColumnsSelector,
    hasList,
    hasShow,
    hasViewSelector,
    maxResults,
    permanentFilter,
    preferenceKey,
    setView,
    view,
    ...rest
}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();
    const open = Boolean(anchorEl);
    const {
        basePath,
        currentSort,
        displayedFilters,
        exporter,
        filterValues,
        resource,
        showFilter,
        total,
    } = useListContext();

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
            <CustomBreadcrumb variant="actions" />
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
                    filterValues={{ ...filterValues, ...permanentFilter }}
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
        if (!React.isValidElement<{ children?: ReactNode }>(child)) return;

        if (
            (child.type as JSXElementConstructor<any>).name === type &&
            Object.keys(props).every(propName =>
                elementHasProp(child, propName, props[propName])
            )
        ) {
            hasChildrenOfType = true;
            return;
        }

        hasChildrenOfType = hasChildren(child.props.children, type, props);
    });

    return hasChildrenOfType;
};

const EnterpriseList: FC<
    {
        children: (props?: any) => ReactElement;
        classes?: any;
        className?: string;
        defaultColumns: ColumnList;
        defaultOmittedColumns?: string[];
        defaultView?: View;
        hasColumnsSelector?: boolean;
        hasViewSelector?: boolean;
        preferenceKey: string;
    } & Omit<ListProps, 'children'>
> = props => {
    const {
        className,
        preferenceKey,

        hasColumnsSelector = true,
        defaultColumns = {},
        defaultOmittedColumns = [],

        hasViewSelector = true,
        defaultView = 'small',
        syncWithLocation,
        children,
        ...rest
    } = props;
    const visibleColumns = useSelectedColumns({
        preferences: `${preferenceKey}.columns`,
        columns: defaultColumns,
        omit: defaultOmittedColumns,
    });

    const [view, setView] = usePreferences<View>(
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
