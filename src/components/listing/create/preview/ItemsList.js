import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";

const useStyles = makeStyles(() => ({
  container: {
    // margin: '0px 5%',
    padding: "20px 0px",
    borderTop: "1px solid #CCCCCC",
  },
  featureTitle: {
    fontSize: 14,
    fontFamily: "heavy",
    color: "#134696",
  },
  feature: {
    fontSize: 16,
    color: "#6B7B88",
  },
}));
const ItemsList = ({ data, heading }) => {
  const classes = useStyles();
  const darkMode = false;

  return (
    <div className={classes.container}>
      <p
        className={classes.featureTitle}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
          fontFamily: "heavy",
        }}
      >
        {heading}:
      </p>
      <Grid
        container
        rowSpacing={2}
        sx={{ borderBottom: "1px solid #707070", pb: 2 }}
      >
        {data?.length > 0 ? (
          data?.map((elem, index) => (
            <Grid item xs={4} key={index}>
              <span
                className={classes.feature}
                style={{
                  color: darkMode ? "#fff" : "#6B7B88",
                }}
              >
                {elem}
              </span>
            </Grid>
          ))
        ) : (
          <Grid item xs={4}>
            <span
              className={classes.feature}
              style={{
                color: darkMode ? "#fff" : "#6B7B88",
              }}
            >
              No service available
            </span>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default ItemsList;
