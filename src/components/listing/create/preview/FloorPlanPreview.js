import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";

const useStyles = makeStyles(() => ({
  featureTitle: {
    fontSize: 14,
    fontFamily: "heavy",
    color: "#134696",
    // fontWeight: "bold",
  },
  feature: {
    fontSize: 16,
    color: "#6B7B88",
  },
  image: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px",
    boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
    borderRadius: "10px",
    height: "80%",
    width: "80%",
  },
}));
const FloorPlanPreview = ({ data }) => {
  const classes = useStyles();
  const darkMode = false;

  return (
    <div>
      <p
        className={classes.featureTitle}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        Floor Plan
      </p>
      <Grid container rowSpacing={2} sx={{ borderBottom: "1px solid #707070" }}>
        {data?.length > 0 ? (
          data?.map((elem, index) => (
            <Grid item xs={6} key={index}>
              <img
                src={URL.createObjectURL(elem)}
                alt=""
                className={classes.image}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={6}>
            <span
              className={classes.feature}
              style={{
                color: darkMode ? "#fff" : "#6B7B88",
              }}
            >
              No floor plan available
            </span>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default FloorPlanPreview;
