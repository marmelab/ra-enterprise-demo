import React, { FC, cloneElement } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";

import { useTranslate } from "react-admin";

import AvatarField from "./AvatarField";
import { Identifier, linkToRecord } from "ra-core";
import { Customer } from "../types";

import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1em",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  card: {
    width: 265,
    display: "flex",
    flexDirection: "column",
    margin: "0.5rem 0",
  },
  cardTitleContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  editButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  cardContent: {
    ...theme.typography.body1,
    display: "flex",
    flexDirection: "column",
  },
}));

interface Props {
  ids?: Identifier[];
  data?: { [key: string]: Customer };
  basePath?: string;
  fields: any;
}

const DesktopGrid: FC<Props> = ({ ids, data, basePath, fields }) => {
  const translate = useTranslate();
  const classes = useStyles();

  if (!ids || !data) {
    return null;
  }

  return (
    <div className={classes.root}>
      {ids.map((id) => (
        <Card key={id} className={classes.card}>
          <CardContent className={classes.cardContent}>
            <div className={classes.cardTitleContent}>
              <AvatarField record={data[id]} size="120" />
              <h2>{`${data[id].first_name} ${data[id].last_name}`}</h2>

              <IconButton
                color="secondary"
                aria-label="Edit"
                component={RouterLink}
                className={classes.editButton}
                to={linkToRecord(basePath, id)}
              >
                <EditIcon />
              </IconButton>
            </div>
            {fields
              .filter((field) => field.props.source !== "customer_id") // we already display customer up there
              .filter((field) => !!data[id][field.props.source])
              .map((field) => {
                const fieldName = field.props.source;

                return (
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <div
                      style={{
                        marginRight: "1em",
                        marginBottom: "0.5em",
                        marginTop: "1em",
                      }}
                    >
                      {translate(`resources.customers.fields.${fieldName}`)}
                    </div>
                    <div
                      style={{
                        whiteSpace: "nowrap",
                        marginBottom: "0.5em",
                        marginTop: "1em",
                      }}
                    >
                      {cloneElement(field, {
                        record: data[id],
                      })}
                    </div>
                  </div>
                );
              })}
            {/* <div>
              {translate("resources.commands.name", data[id].nb_commands || 1)}
              &nbsp;:&nbsp;
              <NumberField
                record={data[id]}
                source="nb_commands"
                label="resources.customers.fields.commands"
              />
            </div>
            <div>
              {translate("resources.customers.fields.total_spent")}
              &nbsp; :{" "}
              <ColoredNumberField
                record={data[id]}
                source="total_spent"
                options={{ style: "currency", currency: "USD" }}
              />
            </div> */}
          </CardContent>
          {/* {data[id].groups && data[id].groups.length > 0 && (
            <CardContent className={classes.cardContent}>
              <SegmentsField record={data[id]} />
            </CardContent>
          )} */}
        </Card>
      ))}
    </div>
  );
};

DesktopGrid.defaultProps = {
  data: {},
  ids: [],
};

export default DesktopGrid;
