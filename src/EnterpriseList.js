import React, { cloneElement } from "react";

import {
  List,
  Button,
  TopToolbar,
  CreateButton,
  sanitizeListRestProps,
  ExportButton,
} from "react-admin";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import {
  SelectColumnsButton,
  useSelectedColumns,
  usePreferences,
} from "@react-admin/ra-preferences";

import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import ZoomInIcon from "@material-ui/icons/ZoomIn";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";

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
  columns,
  hasDensitySelector,
  setDensity,
  ...rest
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

      {(hasColumnsSelector || hasDensitySelector) && (
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
          >
            {hasColumnsSelector && (
              <SelectColumnsButton
                preference={preferenceKey}
                columns={columns}
              />
            )}
            {hasDensitySelector && (
              <ButtonGroup>
                <Button onClick={() => setDensity("small")}>
                  <ZoomOutIcon />
                </Button>
                <Button onClick={() => setDensity("medium")}>
                  <ZoomInIcon />
                </Button>
              </ButtonGroup>
            )}
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

export default ({
  preferenceKey,

  hasColumnsSelector = true,
  defaultColumns = [],
  defaultOmittedColumns = [],

  hasDensitySelector = true,
  defaultDensity = "small",

  children,
  ...rest
}) => {
  const visibleColumns = useSelectedColumns({
    preferences: `${preferenceKey}.columns`,
    columns: defaultColumns,
    omit: defaultOmittedColumns,
  });

  const [density, setDensity] = usePreferences(
    `${preferenceKey}.density`,
    defaultDensity
  );
  console.log("density", density);

  const childrenElements = children({ columns: visibleColumns, density });

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
          columns={defaultColumns}
          hasDensitySelector={hasDensitySelector}
          setDensity={setDensity}
        />
      }
    >
      {childrenElements}
    </List>
  );
};
