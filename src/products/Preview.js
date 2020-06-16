import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { markdownToReact } from "@react-admin/ra-markdown";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "0 20px",
    width: 350,

    "& > p": {
      fontSize: 12,
      color: "#777",
      textAlign: "right",
    },
  },
  description: {
    padding: "0 20px",
    "& h1": {
      fontSize: 18,
      color: "#333",
      fontWeight: "normal",
    },
    "& h2": {
      fontSize: 14,
      color: "#666",
      fontWeight: "normal",
    },
  },
  preview: {
    padding: "0 40px",
  },
  frame: {
    position: "relative",
    width: "100%",
    paddingBottom: "82.5%",
    background: "black",
    boxShadow: "0 10px 7px -5px rgba(0, 0, 0, 0.3)",
  },
  mat: {
    position: "absolute",
    background: "white",
    top: "3.0303%",
    bottom: "3.0303%",
    left: "2.5%",
    right: "2.5%",
    boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.5) inset",
  },
  art: {
    position: "absolute",
    top: "16.129%",
    bottom: "16.129%",
    left: "13.158%",
    right: "13.158%",

    "& img": {
      width: "100%",
    },
  },
};

const useStyles = makeStyles(styles);

const Preview = ({
  poster: { description, image, height, width, price, reference, stock },
}) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <p>Preview</p>
      <div className={classes.preview}>
        <div className={classes.frame}>
          <div className={classes.mat}>
            <div className={classes.art}>
              <img src={image} />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.description}>
        <h1>Poster #${reference}</h1>
        <h2>
          {width}x{height}
        </h2>
        <h2>{price} €</h2>
        <p>{markdownToReact(description)}</p>
      </div>
    </div>
  );
};

export default Preview;
