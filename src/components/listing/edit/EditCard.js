import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setListingToEdit,
  setListingUpdateInfo,
} from "../../../features/listingsSlice";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    margin: "10px 3px",
  },
  title: {
    fontSize: 24,
    fontFamily: "heavy",
    textTransform: "uppercase",
  },

  "@media (max-width: 500px)": {
    title: {
      fontSize: 28,
    },
  },
}));
const EditCard = ({ label, options, prop, multiSelect }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const containerRef = useRef();

  const [containerWidth, setContainerWidth] = useState();

  const darkMode = false;
  //   const { darkMode } = useSelector((state) => state.global);
  const { listingToEdit, listingUpdateInfo } = useSelector(
    (state) => state.listings
  );

  useEffect(() => {
    if (containerRef)
      setContainerWidth(containerRef?.current?.parentElement?.offsetWidth);
  }, [containerRef]);

  const getPropArray = () => {
    let _temp = [];
    for (const property in listingToEdit?.[prop]) {
      if (listingToEdit?.[prop][property] === true) _temp?.push(property);
    }
    return _temp;
  };

  const getButtonColor = (elem) => {
    if (multiSelect) {
      const propArray = getPropArray();
      if (propArray?.includes(elem?.toLowerCase()?.replace(" ", "_"))) {
        return {
          backgroundColor: darkMode ? "#0ed864" : "#134696",
          color: "#fff",
        };
      } else
        return {
          backgroundColor: "#fff",
          color: "#134696",
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        };
    } else {
      if (elem === listingToEdit?.[prop])
        return {
          backgroundColor: darkMode ? "#0ed864" : "#134696",
          color: "#fff",
        };
      else
        return {
          backgroundColor: "#fff",
          color: "#134696",
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        };
    }
  };

  const handleUpdate = (value) => {
    dispatch(setListingToEdit({ ...listingToEdit, [prop]: value }));
    dispatch(setListingUpdateInfo({ ...listingUpdateInfo, [prop]: value }));
  };
  const handleMultiSelectUpdate = (value) => {
    dispatch(
      setListingToEdit({
        ...listingToEdit,
        [prop]: {
          ...listingToEdit?.[prop],
          [value?.toLowerCase()?.replace(" ", "_")]:
            !listingToEdit?.[prop]?.[value?.toLowerCase()?.replace(" ", "_")],
        },
      })
    );
    dispatch(
      setListingUpdateInfo({
        ...listingUpdateInfo,
        [prop]: {
          ...listingToEdit?.[prop],
          [value?.toLowerCase()?.replace(" ", "_")]:
            !listingToEdit?.[prop]?.[value?.toLowerCase()?.replace(" ", "_")],
        },
      })
    );
  };

  return (
    <div
      className={classes.container}
      ref={containerRef}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      <span
        className={classes.title}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
          marginBottom: 5,
        }}
      >
        {label}
      </span>

      <Grid
        container
        sx={{
          display: "flex",
          flex: 1,
          justifyContent: "flex-end",
          ml: 2,
        }}
        spacing={2}
      >
        {options?.map((elem, index) => (
          <Grid item xs={6} lg={2} md={3} sm={4} key={index}>
            <Button
              fullWidth
              sx={{
                ...getButtonColor(elem),
                fontFamily: "heavy",
                borderRadius: 25,
                fontSize: 12,
                mr: 1,
                "&:hover": {
                  ...getButtonColor(elem),
                },
              }}
              onClick={() =>
                multiSelect ? handleMultiSelectUpdate(elem) : handleUpdate(elem)
              }
            >
              {elem}
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default EditCard;
