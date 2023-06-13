import React, { useEffect, useState, useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import EditCard from "../../components/listing/edit/EditCard";
import {
  PROPERTY_CATEGORIES,
  PROPERTY_FEATURES,
  PROPERTY_PURPOSE,
  PROPERTY_SERVICES,
  PROPERTY_TYPES,
} from "../../components/constants/propertyConstants";
import TopCard from "../../components/listing/edit/TopCard";
import Details from "../../components/listing/edit/Details";
import ConstructionDetails from "../../components/listing/edit/ConstructionDetails";
import Location from "../../components/listing/edit/Location";
import ImageEdit from "../../components/listing/edit/ImageEdit";
import Layout from "../../customComponents/layout/Layout";
import Loader from "../../customComponents/Loader";
import { getListingDetails } from "../../features/listingsSlice";
import CustomTopInfo from "../../customComponents/layout/CustomTopInfo";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.1em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "5px",
    },
    scrollBehavior: "smooth !important",
    height: "95vh",
    margin: 10,
  },
}));

const EditListing = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();

  const [validation, setValidation] = useState({});

  const { highlightedListingInfo, listingToEdit, updateApiInfo } = useSelector(
    (state) => state.listings
  );


  const categoriesToShow = useMemo(() => {
    switch (listingToEdit?.type) {
      case PROPERTY_TYPES[0]:
        return PROPERTY_CATEGORIES?.slice(0, 6);
      case PROPERTY_TYPES[2]:
        return PROPERTY_CATEGORIES?.slice(6, 14);
      case PROPERTY_TYPES[1]:
        return PROPERTY_CATEGORIES?.slice(14, 20);
      default:
        return PROPERTY_CATEGORIES?.slice(0, 6);
    }
  }, [listingToEdit]);

  useEffect(() => {
      dispatch(getListingDetails({ id: params?.id, edit: true }));
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <CustomTopInfo heading="Edit Listing" />
      <div className={classes.container}>
        {highlightedListingInfo?.loading || updateApiInfo?.loading ? (
          <Loader />
        ) : (
          <>
            <TopCard validation={validation} />
            <EditCard
              label={"Purpose"}
              prop={"purpose"}
              options={PROPERTY_PURPOSE}
            />
            <EditCard label={"type"} prop={"type"} options={PROPERTY_TYPES} />
            <EditCard
              label={"category"}
              prop={"categories"}
              options={categoriesToShow}
            />
            <Details validation={validation} setValidation={setValidation} />
            <ConstructionDetails />
            <Location />
            <ImageEdit attribute={"image"} label={"edit images"} />
            <ImageEdit attribute={"floor_image"} label={"edit floor plan"} />
            <EditCard
              label={"features"}
              prop={"features"}
              options={PROPERTY_FEATURES}
              multiSelect
            />
            <EditCard
              label={"services"}
              prop={"services"}
              options={PROPERTY_SERVICES}
              multiSelect
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default EditListing;
