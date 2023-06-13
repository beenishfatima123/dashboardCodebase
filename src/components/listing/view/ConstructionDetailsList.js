import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import { getConstructionHeading } from "../../../components/constants/helperFunctions";
import { CONSTRUCTION_DETAILS } from "../../../components/constants/global";

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
    fontFamily: "heavy",
  },
  feature: {
    fontSize: 14,
    color: "#707070",
    textTransform: "capitalize",
  },
  heading: {
    fontSize: 16,
    color: "#134696",
    fontFamily: "heavy",
  },
  itemContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: 200,
  },
}));
const ConstructionDetailsList = ({ data }) => {
  const classes = useStyles();
  const darkMode = false;

  return (
    <div className={classes.container}>
      <p
        className={classes.featureTitle}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        Construction Details:
      </p>
      <Grid container rowSpacing={2}>
        {CONSTRUCTION_DETAILS?.map((elem, index) => (
          <Grid item xs={6} md={4} key={index}>
            <span
              className={classes.heading}
              style={{
                color: darkMode ? "#0ed864" : "#134696",
                marginBottom: 10,
              }}
            >
              {getConstructionHeading(index)}
            </span>
            {elem?.map((item, index) => (
              <div key={index} className={classes.itemContainer}>
                <span
                  className={classes.feature}
                  style={{
                    color: darkMode ? "#fff" : "#6B7B88",
                  }}
                >
                  {item?.label}:
                </span>
                <span
                  className={classes.feature}
                  style={{
                    color: darkMode ? "#fff" : "#6B7B88",
                    textAlign: "left",
                    minWidth: 50,
                  }}
                >
                  {data?.[item?.key]}
                </span>
              </div>
            ))}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ConstructionDetailsList;
