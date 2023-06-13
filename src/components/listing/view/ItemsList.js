import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import { useMemo } from "react";

const useStyles = makeStyles(() => ({
  container: {
    margin: "0px 5%",
    padding: "20px 0px",
    borderTop: "1px solid #CCCCCC",
    borderBottom: "1px solid #CCCCCC",
  },
  featureTitle: {
    fontSize: 24,
    color: "#134696",
    fontWeight: "bold",
  },
  feature: {
    fontSize: 16,
    color: "#6B7B88",
  },
}));
const ItemsList = ({ data, heading }) => {
  const classes = useStyles();
  const darkMode = false;

  const dataToShow = useMemo(() => {
    if (data)
      return (
        Object.keys(data)
          // eslint-disable-next-line
          ?.map((key) => {
            if (data[key] === true) return key;
          })
          .filter((elem) => elem)
      );
    // eslint-disable-next-line
  }, [data]);

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
        {dataToShow?.length > 0 ? (
          dataToShow?.map((elem, index) => (
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
