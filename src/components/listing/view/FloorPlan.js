import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import { baseUrl } from "../../constants/baseUrls";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "0px 5%",
    padding: "20px 0px",
    borderBottom: "1px solid #CCCCCC",
  },
  plan: {
    width: "95%",
  },
  title: {
    fontSize: 24,
    color: "#134696",
    margin: "20px 0px",
    fontFamily: "heavy",
  },
}));
const FloorPlan = ({ property }) => {
  const classes = useStyles();
  const darkMode = false;

  const floorPlans = useMemo(() => {
    if (property?.floor_image)
      return property?.floor_image?.map((elem) => {
        return `${baseUrl}/${elem?.floor_image}`;
      });
    else return [];
  }, [property]);
  return (
    <div className={classes.container}>
      <span
        className={classes.title}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        Floor Plan:
      </span>
      <Grid container rowSpacing={2}>
        {floorPlans?.length > 0 ? (
          floorPlans?.map((elem, index) => (
            <Grid
              item
              xs={12}
              md={6}
              key={index}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <img src={elem} alt="" className={classes.plan} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12} md={6}>
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

export default FloorPlan;
