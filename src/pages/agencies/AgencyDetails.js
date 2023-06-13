import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Layout from "../../customComponents/layout/Layout";
import Loader from "../../customComponents/Loader";
import { baseUrl } from "../../components/constants/baseUrls";
import AgencyDetail from "../../components/agency/view/AgencyDetails";
import AgencyProjects from "../../components/agency/view/AgencyProjects";
import AgencyListings from "../../components/agency/view/AgencyListings";
import AgencyAgents from "../../components/agency/view/AgencyAgents";
import CustomTopInfo from "../../customComponents/layout/CustomTopInfo";
import { getAgency, resetDeleteAgencyApi } from "../../features/agencySlice";
import { resetUpdateVerificationApi } from "../../features/verificationSlice";
import VerificationDocuments from "../../components/users/details/VerificationDocuments";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 5,
    margin: "20px",
  },
  thumbnail: {
    backgroundPosition: "center !important",
    backgroundRepeat: "no-repeat !important",
    backgroundSize: "cover !important",
    width: "79.9%",
    height: 500,
    position: "absolute",
    top: 0,
    zIndex: -1,
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));
const AgencyDetails = () => {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    agencyDetails,
    agencyDetailsApiInfo,
    verificationDetail,
    deleteAgencyApiInfo,
  } = useSelector((state) => state.agency);
  const { updateRequestApiInfo } = useSelector((state) => state.verifications);

  useEffect(() => {
    dispatch(getAgency({ id: params?.id }));
    // eslint-disable-next-line
  }, [params?.id]);

  useEffect(() => {
    if (updateRequestApiInfo?.response?.status) {
      toast.success(`Agency request for verification updated successfully.`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#134696" },
      });
      dispatch(resetUpdateVerificationApi());
      history.push("/agencies");
    }
    // eslint-disable-next-line
  }, [updateRequestApiInfo?.response]);

  useEffect(() => {
    if (deleteAgencyApiInfo?.response?.status) {
      toast.success("Agency deleted successfully.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
        hideProgressBar: true,
      });
      dispatch(resetDeleteAgencyApi());
    }
  }, [deleteAgencyApiInfo?.response]);

  return (
    <Layout>
      <CustomTopInfo
        backButton={true}
        style={{ borderBottom: "none", backgroundColor: "transparent" }}
      />
      {agencyDetailsApiInfo?.loading || updateRequestApiInfo?.loading ? (
        <Loader />
      ) : (
        <div className={classes.container}>
          <div
            className={classes.thumbnail}
            style={{
              background: `url(${baseUrl}/${agencyDetails?.company_logo})`,
            }}
          ></div>
          <div style={{ marginTop: 400 }}>
            <AgencyDetail />
            <AgencyProjects />
            <AgencyListings />
            <AgencyAgents />
            {!verificationDetail?.isDirect && (
              <VerificationDocuments type="agency" />
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AgencyDetails;
