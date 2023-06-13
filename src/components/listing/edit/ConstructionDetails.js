import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import {
  setListingToEdit,
  setListingUpdateInfo,
} from "../../../features/listingsSlice";
import { CONSTRUCTION_DETAILS } from "../../constants/global";
import { Grid } from "@mui/material";
import EditSelect from "./EditSelect";
import {
  getPastYears,
  getConstructionHeading,
} from "../../constants/helperFunctions";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    margin: "10px 3px",
  },
  title: {
    fontSize: 24,
    fontFamily: "heavy",
    textTransform: "uppercase",
  },
  heading: {
    fontSize: 14,
    color: "#134696",
    fontFamily: "heavy",
  },
  "@media (max-width: 500px)": {
    title: {
      fontSize: 28,
    },
  },
}));

const ConstructionDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { listingToEdit, listingUpdateInfo } = useSelector(
    (state) => state.listings
  );
  const darkMode = false;
  // const { darkMode } = useSelector((state) => state.global);

  const handleChange = (prop) => (event) => {
    // console.log({ listingToEdit, prop });
    dispatch(
      setListingToEdit({
        ...listingToEdit,
        construction_details: {
          ...listingToEdit?.construction_details,
          [prop]: event.target.value,
        },
      })
    );
    dispatch(
      setListingUpdateInfo({
        ...listingUpdateInfo,
        construction_details: {
          ...listingUpdateInfo?.construction_details,
          [prop]: event.target.value,
        },
      })
    );
  };
  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      <span
        className={classes.title}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        Construction Details
      </span>

      <Grid container sx={{ mt: 2 }} columnSpacing={2}>
        {CONSTRUCTION_DETAILS?.map((elem, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            lg={3}
            key={index}
            sx={{
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              borderRadius: "10px",
              m: 1,
              width: 211,
              padding: "8px 0px",
            }}
          >
            <span
              className={classes.heading}
              style={{
                color: darkMode ? "#0ed864" : "#134696",
              }}
            >
              {getConstructionHeading(index)}
            </span>
            <div style={{ marginBottom: 10 }}>
              {elem?.map((item, index) => (
                <EditSelect
                  key={index}
                  label={item?.label}
                  onChange={handleChange(item?.key)}
                  value={
                    listingToEdit?.construction_details?.[item?.key] || "None"
                  }
                  options={
                    item?.key !== "year_built"
                      ? item?.options
                      : getPastYears(100)
                  }
                />
              ))}
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ConstructionDetails;
