import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import { CONSTRUCTION_DETAILS } from "../../../constants/global";
import { getConstructionHeading } from "../../../constants/helperFunctions";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px 0px",
    borderTop: "1px solid #CCCCCC",
    borderBottom: "1px solid #CCCCCC",
  },
  featureTitle: {
    fontSize: 14,
    fontFamily: 'heavy',
    color: "#134696",
  },
  feature: {
    fontSize: 10,
    color: "#707070",
    textTransform: "capitalize",
  },
  heading: {
    fontSize: 12,
    fontFamily: 'heavy',
    color: "#134696",
  },
}));
const ConstructionPreview = () => {
  const classes = useStyles();
  const propertyData = useSelector(
    (state) => state.createProperty.propertyData
  );
  const darkMode = false;

  return (
    <div  className={classes.container}>
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
          <Grid item xs={4} key={index}>
            <span
              className={classes.heading}
              style={{
                color: darkMode ? "#0ed864" : "#134696",
              }}
            >
              {getConstructionHeading(index)}
            </span>
            {elem?.map((item, index) => (
              <div key={index}>
                <span
                  className={classes.feature}
                  style={{
                    color: darkMode ? "#fff" : "#707070",
                  }}
                >
                  {item?.label}:
                </span>
                <span
                  className={classes.feature}
                  style={{
                    marginLeft: 20,
                    color: darkMode ? "#fff" : "#707070",
                  }}
                >
                  {propertyData?.[item?.key]}
                </span>
              </div>
            ))}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ConstructionPreview;
