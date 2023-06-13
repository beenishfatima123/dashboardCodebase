import React, { Suspense, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllTabs,
  setInvalidCategory,
  setSelectedTab,
} from "../../../features/createPropertySlice";
import Loader from "../../../customComponents/Loader";
import {
  POST_TABS,
  PROPERTY_ATTRIBUTES,
  PROPERTY_CATEGORIES,
  PROPERTY_FEATURES,
  PROPERTY_SERVICES,
  PROPERTY_TYPES,
} from "../../constants/propertyConstants";
import { Stepper, Step, StepLabel, Grid } from "@mui/material";
import Purpose from "./Purpose";
import TopCard from "./TopCard";
import TacCards from "./TacCards";
import Details from "./Details";
import ConstructionDetails from "./ConstructionDetails";
import Location from "./Location";
import ContentUploads from "./ContentUploads";
import Preview from "./preview/Preview";
import ErrorIcon from "@mui/icons-material/Error";
import CheckIcon from "@mui/icons-material/CheckCircle";
import CustomTopInfo from "../../../customComponents/layout/CustomTopInfo";
import { resetAdminIdforAgencyAddListing } from "../../../features/usersSlice";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    width: "100%",
  },
}));

const ContentContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();

  const darkMode = false;
  const { selectedTab, allTabs, listingType, propertyData } = useSelector(
    (state) => state.createProperty
  );
  const inValidCategory = useSelector(
    (state) => state.createProperty.inValidCategory
  );

  useEffect(() => {
    let inValidData = {};
    if (allTabs?.indexOf(selectedTab) >= 1)
      inValidData = {
        ...inValidData,
        type: { isValid: propertyData?.type ? true : false },
      };
    if (allTabs?.indexOf(selectedTab) >= 2)
      inValidData = {
        ...inValidData,
        categories: { isValid: propertyData?.category ? true : false },
      };
    if (allTabs?.indexOf(selectedTab) >= 3)
      inValidData = {
        ...inValidData,
        details: { ...inValidCategory?.details, isValid: checkDetails() },
      };
    if (allTabs?.indexOf(selectedTab) >= 6)
      inValidData = {
        ...inValidData,
        location: { isValid: propertyData?.location ? true : false },
      };
    if (allTabs?.indexOf(selectedTab) >= 7)
      inValidData = {
        ...inValidData,
        images: {
          isValid: propertyData?.images?.length ? true : false,
        },
      };
    dispatch(
      setInvalidCategory({
        ...inValidCategory,
        ...inValidData,
      })
    );
    // eslint-disable-next-line
  }, [propertyData, selectedTab]);

  const checkDetails = () => {
    let isValid = true;
    if (!propertyData?.title || !propertyData?.price || !propertyData?.size)
      isValid = false;
    for (const property in inValidCategory?.details) {
      if (property !== "isValid" && inValidCategory?.details?.[property]) {
        isValid = false;
      }
    }
    return isValid;
  };

  const tacCategory = useMemo(() => {
    switch (propertyData?.type) {
      case PROPERTY_TYPES[0]:
        return PROPERTY_CATEGORIES?.slice(0, 6);
      case PROPERTY_TYPES[2]:
        return PROPERTY_CATEGORIES?.slice(6, 12);
      case PROPERTY_TYPES[1]:
        return PROPERTY_CATEGORIES?.slice(12, 18);
      default:
        return PROPERTY_CATEGORIES?.slice(0, 6);
    }
    // eslint-disable-next-line
  }, [propertyData]);

  const renderContent = useMemo(() => {
    switch (selectedTab) {
      case "Purpose":
        return <Purpose />;
      case "Type":
        return (
          <TacCards
            items={PROPERTY_TYPES}
            attribute={PROPERTY_ATTRIBUTES?.TYPE}
          />
        );
      case "Categories":
        return (
          <TacCards
            items={tacCategory}
            attribute={PROPERTY_ATTRIBUTES?.CATEGORY}
          />
        );
      case "Details":
        return <Details />;
      case "Construction":
        return <ConstructionDetails />;
      case "Location":
        return <Location />;
      case "Images":
        return <ContentUploads />;
      case "Features":
        return (
          <TacCards
            items={PROPERTY_FEATURES}
            attribute={PROPERTY_ATTRIBUTES?.FEATURES}
            multiselect
          />
        );
      case "Services":
        return (
          <TacCards
            items={PROPERTY_SERVICES}
            attribute={PROPERTY_ATTRIBUTES?.SERVICES}
            multiselect
          />
        );
      case "Preview":
        return <Preview />;
      default:
        return <Purpose />;
    }
  }, [selectedTab, tacCategory]);

  useEffect(() => {
    if (location?.state?.from !== "agency") {
      dispatch(resetAdminIdforAgencyAddListing());
    }
    // eslint-disable-next-line
  }, [location?.state]);

  useEffect(() => {
    dispatch(setAllTabs(POST_TABS));
    // eslint-disable-next-line
  }, [listingType]);

  return (
    <div className={classes.container}>
      <Suspense fallback={<Loader />}>
        <>
          <TopCard />
          <Grid
            container
            justifyContent={"center"}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Grid
              item
              xs={12}
              md={12}
              sx={{
                minHeight: "60vh",
                maxHeight: "calc(100vh - 40vh)",
                overflow: "hidden",
                overflowY: "scroll",
              }}
            >
              {renderContent}
            </Grid>
          </Grid>

          <Stepper
            activeStep={allTabs?.indexOf(selectedTab)}
            alternativeLabel
            sx={{ position: "absolute", bottom: 10, width: "80%" }}
            // style={{ position: "absolute", bottom: 10, width: "80%" }}
          >
            {POST_TABS.map((item, index) => (
              <Step key={index}>
                <StepLabel
                  style={{
                    cursor: "pointer",
                  }}
                  icon={
                    inValidCategory?.[item?.toLowerCase()]?.isValid ===
                    false ? (
                      <ErrorIcon sx={{ color: "red" }} />
                    ) : (
                      <CheckIcon sx={{ color: "#134696" }} />
                    )
                  }
                  StepIconProps={{
                    style: {
                      color:
                        inValidCategory?.[item?.toLowerCase()]?.isValid ===
                        false
                          ? "red"
                          : "#134696",
                    },
                  }}
                  onClick={() => dispatch(setSelectedTab(item))}
                >
                  {item}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </>
      </Suspense>
    </div>
  );
};

export default ContentContainer;
