import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useHistory, useParams } from "react-router";
import Layout from "../../customComponents/layout/Layout";
import Loader from "../../customComponents/Loader";
import { useDispatch, useSelector } from "react-redux";
import TopLightbox from "../../components/listing/view/TopLightBox";
import TopInfo from "../../components/listing/view/TopInfo";
import FeaturesContainer from "../../components/listing/view/FeaturesContainer";
import ItemsList from "../../components/listing/view/ItemsList";
import FloorPlan from "../../components/listing/view/FloorPlan";
import ConstructionDetailsList from "../../components/listing/view/ConstructionDetailsList";
import PropertyDetailsMap from "../../components/listing/view/PropertyDetailsMap";
import { getListingDetails, resetDeletePropertyApiInfo } from "../../features/listingsSlice";
import { resetUpdateVerificationApi } from "../../features/verificationSlice";
import { toast } from "react-toastify";
import VerificationDocuments from "../../components/users/details/VerificationDocuments";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "25px 50px",
    border: "1px solid #c9c9c9",
    borderRadius: "10px",
  },
  documentContainer: {
    margin: "0px 5%",
    padding: "20px 0px",
    borderTop: "1px solid #CCCCCC",
    borderBottom: "1px solid #CCCCCC",
  },
  heading: {
    color: "#134696",
    fontSize: 32,
    fontFamily: "heavy",
  },
  slider: {
    margin: "20px 5%",
  },
  divider: {
    width: "100%",
    height: 3,
    backgroundColor: "#000000",
    margin: "20px 0px",
  },
}));

const ListingDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  let params = useParams();

  const { highlightedListing, highlightedListingInfo, verificationDetail, deletePropertyApiInfo } =
    useSelector((state) => state.listings);
  const { updateRequestApiInfo } = useSelector((state) => state.verifications);

  useEffect(() => {
    dispatch(getListingDetails({ id: params?.id, edit: false }));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (updateRequestApiInfo?.response?.status) {
      toast.success(`Listing request for verification updated successfully.`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#134696" },
      });
      dispatch(resetUpdateVerificationApi());
    }
    // eslint-disable-next-line
  }, [updateRequestApiInfo?.response]);

  useEffect(() => {
    if (deletePropertyApiInfo?.response?.status) {
      toast.success(deletePropertyApiInfo?.response?.result, {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetDeletePropertyApiInfo());
      history.push("/listings");
    } else {
      toast.error(deletePropertyApiInfo?.response?.result, {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetDeletePropertyApiInfo());
    }
    // eslint-disable-next-line
  }, [deletePropertyApiInfo?.response?.status]);

  return (
    <Layout>
      {highlightedListingInfo?.loading || updateRequestApiInfo?.loading || deletePropertyApiInfo?.loading ? (
        <Loader />
      ) : (
        <>
          {/* <div className={classes.container}> */}
          <TopLightbox property={highlightedListing} />
          <TopInfo property={highlightedListing} />
          <FeaturesContainer property={highlightedListing} />
          <ItemsList heading="Services" data={highlightedListing?.services} />
          <FloorPlan property={highlightedListing} />
          <ConstructionDetailsList
            data={highlightedListing?.construction_details}
          />
          {highlightedListing && (
            <PropertyDetailsMap property={highlightedListing} />
          )}
          {!verificationDetail?.isDirect && (
            <div className={classes.documentContainer}
            >
              <VerificationDocuments type="property" />
            </div>
          )}
          {/* </div> */}
        </>
      )}
    </Layout>
  );
};

export default ListingDetail;
