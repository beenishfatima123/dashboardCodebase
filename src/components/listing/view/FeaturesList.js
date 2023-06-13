import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";

const useStyles = makeStyles(() => ({
  container: {
    display: "column",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: "heavy",
  },
  text: {
    fontSize: 16,
    color: "#6B7B88",
    textTransform: "capitalize",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));
const FeaturesList = ({ property }) => {
  const classes = useStyles();
  const darkMode = false;

  const allFeatures = useMemo(() => {
    if (property?.features)
      return (
        Object.keys(property?.features)
          // eslint-disable-next-line
          .map((key) => {
            if (property?.features[key] === true) return key;
          })
          .filter((elem) => elem)
      );
  }, [property]);

  return (
    <div className={classes.container}>
      <span
        className={classes.title}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        Features:
      </span>
      <Grid container rowSpacing={2} sx={{ mt: 2 }}>
        {allFeatures?.length > 0 ? (
          allFeatures?.map((elem, index) => (
            <React.Fragment key={index}>
              <Grid item xs={6} md={4}>
                <span
                  className={classes.text}
                  style={{
                    color: darkMode ? "#fff" : "#6B7B88",
                  }}
                >
                  {elem?.replace("_", " ")}
                </span>
              </Grid>
            </React.Fragment>
          ))
        ) : (
          <Grid item xs={6} md={4}>
            <span
              className={classes.nofeature}
              style={{
                color: darkMode ? "#fff" : "#6B7B88",
              }}
            >
              No feature available
            </span>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default FeaturesList;
