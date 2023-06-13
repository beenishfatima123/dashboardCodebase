import React from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import TopLightbox from "./TopLightBox";
import TopInfo from "./TopInfo";
import FeaturesContainer from "./FeaturesContainer";
import ItemsList from "./ItemsList";
import FloorPlanPreview from "./FloorPlanPreview";
import ConstructionPreview from "./ConstructionPreview";
import PropertyDetailsMap from "./PropertyDetailsMap";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 5%",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "5px",
    },
    scrollBehavior: "smooth !important",
    height: "68vh",
    height:'calc(100vh - 33vh)',
    overflow:'scroll'
  },
  titleContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 20,
    borderBottom: "1px solid #134696",
  },
  title: {
    fontSize: 22,
    color: "#134696",
    fontFamily: "heavy",
    display: "flex",
    flex: 1,
  },
  thumbnail: {
    height: 250,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#DBDBDB",
    marginTop: 20,
    alignSelf: "center",
    objectFit: "fill",
  },
  address: {
    fontSize: 18,
    color: "#1A2954",
    marginTop: 10,
  },
  tagline: {
    fontSize: 24,
    fontFamily: "heavy",
    color: "#1A2954",
    marginTop: 10,
  },
  price: {
    fontSize: 36,
    fontFamily: "heavy",
    marginTop: 10,
    color: "#134696",
  },
  description: {
    padding: "20px 0px",
    borderTop: "0.5px solid #707070",
    borderBottom: "1px solid #707070",
    marginTop: 10,
  },
  featureTitle: {
    fontSize: 18,
    color: "#134696",
  },
  feature: {
    fontSize: 16,
    color: "#6B7B88",
  },
  listedBy: {
    color: "#7D7D7D",
    fontSize: 14,
    fontWeight: "lighter",
    padding: "20px 0px",
    borderTop: "0.5px solid #707070",
  },
  userDetails: {
    color: "#1A2954",
    fontSize: 18,
    fontWeight: "normal",
    margin: 0,
  },
}));

const Preview = () => {
  const classes = useStyles();
  const propertyData = useSelector(
    (state) => state.createProperty.propertyData
  );

  return (
    <>
      <div className={classes.container}>
        <TopLightbox property={propertyData} />
        <TopInfo property={propertyData} />
        <FeaturesContainer property={propertyData} />
        <ItemsList heading="Services" data={propertyData?.services} />
        <FloorPlanPreview data={propertyData?.floorPlan} />
        <ConstructionPreview />
        {propertyData?.location && <PropertyDetailsMap property={propertyData} />}
      </div>
    </>
  );
};

export default Preview;
