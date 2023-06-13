import React from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import {
  PROPERTY_PURPOSE,
} from "../../constants/propertyConstants";
import { useDispatch, useSelector } from "react-redux";
import {
  setPropertyData,
  setSelectedTab,
} from "../../../features/createPropertySlice";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px 0px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    margin: "20px 20px",
    maxWidth: "95%",
  },
  title: {
    color: "#134696",
    fontSize: 15,
    marginLeft: 20,
    fontFamily: "heavy",
  },
}));
const Purpose = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const propertyData = useSelector(
    (state) => state.createProperty.propertyData
  );
  const { selectedTab, allTabs } = useSelector((state) => state.createProperty);
  const darkMode = false;

  const handleSelect = (purpose) => {
    dispatch(setPropertyData({ ...propertyData, purpose }));
    dispatch(setSelectedTab(allTabs[allTabs?.indexOf(selectedTab) + 1]));
  };

  return (
    <div className={classes.container}>
      <span
        className={classes.title}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
          borderBottom: darkMode ? "1px solid #0ed864" : "1px solid #134696",
        }}
      >
        Property Type
      </span>
      <div
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: darkMode ? "#303134" : "#fff",
        }}
      >
        {PROPERTY_PURPOSE?.map((elem, index) => (
          <Button
            onClick={() => handleSelect(elem)}
            key={index}
            sx={{
              border: darkMode ? "1px solid #0ed864" : "1px solid #134696",
              fontSize: 15,
              fontFamily: "medium",
              width: "90%",
              height: 50,
              borderRadius: 0,
              ml: 4,
              mr: 4,
              mt: 1,
              mb: 1,
              backgroundColor:
                propertyData?.purpose === elem
                  ? darkMode
                    ? "#0ed864"
                    : "#134696"
                  : "none",
              color:
                propertyData?.purpose === elem
                  ? "white"
                  : darkMode
                  ? "#fff"
                  : "#134696",
              "&:hover": {
                backgroundColor:
                  propertyData?.purpose === elem ? "#134696" : "none",
              },
            }}
          >
            {elem}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Purpose;
