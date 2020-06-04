import React, { cloneElement, useMemo } from "react";

import {
  List,
  Button,
  TopToolbar,
  CreateButton,
  sanitizeListRestProps,
  ExportButton,
} from "react-admin";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import {
  SelectColumnsMenu,
  useSelectedColumns,
  usePreferences,
} from "@react-admin/ra-preferences";

import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import ZoomInIcon from "@material-ui/icons/ZoomIn";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles({
  menuPaper: {
    padding: "1rem 0",
  },
  menuList: {
    "&> * > *": {
      padding: "0 2rem",
    },
  },
  toolContainer: {
    margin: "20px 0",
    "&:first-child": {
      marginTop: 0,
    },
    "&:last-child": {
      marginBottom: 0,
    },
  },
  columnsList: {
    maxHeight: "250px",
    overflowY: "auto",
    margin: 0,
    background: "#eee",
  },
});

const ToolContainer = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.toolContainer}>{children}</div>;
};

const ColumnsTool = ({ preferenceKey, defaultColumns }) => {
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
        anchorEl
        preference={preferenceKey}
        columns={defaultColumns}
        label=""
        className={classes.columnsList}
      />
    </>
  );
};

const DensityTool = ({ preferenceKey, density, setDensity }) => (
  <>
    <Typography
      variant="overline"
      gutterBottom
      key="density-selector-tool-title"
      component="div"
    >
      Density
    </Typography>

    <ButtonGroup key="density-selector-tool-menu">
      <Button
        color={density === "small" ? "primary" : "default"}
        onClick={() => setDensity("small")}
        label="small"
      >
        <ZoomOutIcon />
      </Button>
      <Button
        color={density === "medium" ? "primary" : "default"}
        onClick={() => setDensity("medium")}
        label="medium"
      >
        <ZoomInIcon />
      </Button>
    </ButtonGroup>
  </>
);

const Actions = ({
  preferenceKey,
  currentSort,
  className,
  resource,
  filters,
  displayedFilters,
  exporter, // you can hide ExportButton if exporter = (null || false)
  filterValues,
  permanentFilter,
  hasCreate, // you can hide CreateButton if hasCreate = false
  basePath,
  selectedIds,
  onUnselectItems,
  showFilter,
  maxResults,
  total,
  hasColumnsSelector,
  defaultColumns,
  hasDensitySelector,
  density,
  setDensity,
  ...rest
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const tools = [];

  if (hasColumnsSelector) {
    tools.push(
      <ColumnsTool
        preferenceKey={preferenceKey}
        defaultColumns={defaultColumns}
      />
    );
  }

  if (hasDensitySelector) {
    tools.push(
      <DensityTool
        preferenceKey={preferenceKey}
        density={density}
        setDensity={setDensity}
      />
    );
  }

  return (
    <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
      {filters &&
        cloneElement(filters, {
          resource,
          showFilter,
          displayedFilters,
          filterValues,
          context: "button",
        })}
      <CreateButton basePath={basePath} />
      {exporter && (
        <ExportButton
          disabled={total === 0}
          resource={resource}
          sort={currentSort}
          filter={{ ...filterValues, ...permanentFilter }}
          exporter={exporter}
          maxResults={maxResults}
        />
      )}

      {tools.length && (
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
            classes={{ paper: classes.menuPaper, list: classes.menuList }}
          >
            {tools.map((tool) => (
              <ToolContainer>{tool}</ToolContainer>
            ))}
          </Menu>
        </>
      )}
    </TopToolbar>
  );
};
const elementHasProp = (element, name, value) =>
  element.props[name] && element.props[name] === value;

const hasChildren = (element, type, props) => {
  if (!React.isValidElement(element)) return false;

  let hasChildrenOfType = false;

  React.Children.map(element, (child) => {
    if (hasChildrenOfType) return;
    if (!React.isValidElement(child)) return;

    if (
      child.type.name === type &&
      Object.keys(props).every((propName) =>
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

export default (props) => {
  const {
    preferenceKey,

    hasColumnsSelector = true,
    defaultColumns = [],
    defaultOmittedColumns = [],

    hasDensitySelector = true,
    defaultDensity = "small",

    children,
    ...rest
  } = props;
  const visibleColumns = useSelectedColumns({
    preferences: `${preferenceKey}.columns`,
    columns: defaultColumns,
    omit: defaultOmittedColumns,
  });

  const [density, setDensity] = usePreferences(
    `${preferenceKey}.density`,
    defaultDensity
  );

  const childrenElements = useMemo(
    () => children({ ...rest, columns: visibleColumns, density }),
    [visibleColumns, density, children, rest]
  );

  if (process.env.NODE_ENV === "development") {
    if (
      hasColumnsSelector &&
      hasChildren(childrenElements, "Datagrid", { optimized: true })
    ) {
      throw new Error(
        "Columns selector is not compatible with optimized Datagrids, please remove the optimized prop"
      );
    }
  }

  return (
    <List
      {...rest}
      actions={
        <Actions
          preferenceKey={`${preferenceKey}.columns`}
          hasColumnsSelector={hasColumnsSelector}
          defaultColumns={defaultColumns}
          hasDensitySelector={hasDensitySelector}
          density={density}
          setDensity={setDensity}
        />
      }
    >
      {childrenElements}
    </List>
  );
};
