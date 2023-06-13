import React from "react";
import { makeStyles } from "@mui/styles";
import FeaturesList from "./FeaturesList";
import AgentInfo from "./AgentInfo";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // margin: "0px 5%",
    padding: "20px 0px",
    borderTop: "1px solid #CCCCCC",
    borderBottom: "1px solid #CCCCCC",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));
const FeaturesContainer = ({ property }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <FeaturesList property={property} />
      <AgentInfo property={property} />
    </div>
  );
};

export default FeaturesContainer;
