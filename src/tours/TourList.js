import React, { cloneElement } from "react";
import MuiGridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { makeStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import { Link } from "react-router-dom";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import {
  TopToolbar,
  CreateButton,
  ExportButton,
  Button,
  sanitizeListRestProps,
  NumberField,
  List,
  Pagination,
  useMutation,
  useRefresh,
} from "react-admin";

import { useDispatch } from "react-redux";
import { linkToRecord } from "ra-core";

import Tour from "./Tour";

const useStyles = makeStyles((theme) => ({
  content: {
    background: "none",
    boxShadow: "none",
  },
}));

const useListStyles = makeStyles((theme) => ({
  gridContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

const ListActions = ({
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
  ids,
  ...rest
}) => {
  const refresh = useRefresh();

  const [reset, { loading: resetLoading }] = useMutation(
    {
      type: "updateMany",
      resource: "tours",
      payload: { ids: ids, data: { playedOn: null } },
    },
    {
      onSuccess: () => {
        refresh();
      },
    }
  );

  const [markAsPlayed, { loading: markAsPlayedLoading }] = useMutation(
    {
      type: "updateMany",
      resource: "tours",
      payload: { ids: ids, data: { playedOn: new Date() } },
    },
    {
      onSuccess: () => {
        refresh();
      },
    }
  );

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
      {/* Add your custom actions */}
      <Button
        onClick={markAsPlayed}
        label="Mark all as played"
        disabled={markAsPlayedLoading}
      >
        <PlaylistAddCheckIcon />
      </Button>
      <Button onClick={reset} label="Reset" disabled={resetLoading}>
        <RotateLeftIcon />
      </Button>
    </TopToolbar>
  );
};

const GridList = ({ ids, data, ...rest }) => {
  const classes = useListStyles();
  return (
    <div className={classes.gridContainer}>
      {ids.map((id) => (
        <Tour key={id} record={data[id]} />
      ))}
    </div>
  );
};

const TourList = (props) => {
  const classes = useStyles();

  return (
    <List
      {...props}
      perPage={20}
      pagination={<Pagination rowsPerPageOptions={[10, 20, 40]} />}
      sort={{ field: "id", order: "ASC" }}
      classes={classes}
      actions={<ListActions />}
    >
      <GridList />
    </List>
  );
};

export default TourList;
