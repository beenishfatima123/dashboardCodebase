import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetUpdateAgencyApiInfo,
  setAgencyToEdit,
  setAgencyUpdateInfo,
} from "../../features/agencySlice";
import { toast } from "react-toastify";
import Layout from "../../customComponents/layout/Layout";
import Loader from "../../customComponents/Loader";
import CustomTopInfo from "../../customComponents/layout/CustomTopInfo";
import TopBar from "../../components/agency/edit/TopBar";
import InformationForm from "../../components/agency/edit/InformationForm";
import LogoImage from "../../components/agency/edit/LogoImage";
import VerificationImage from "../../components/agency/edit/VerificationImage";
import { USER_TYPES } from "../../components/constants/global";
import { getSingleUnverifiedCompanyReset } from "../../features/store/verificationRequestsSlice";
import { resetCreateVerificationApi } from "../../features/verificationSlice";

const useStyles = makeStyles(() => ({
  bottomBorder: {
    height: 1,
    backgroundColor: "#707070",
    width: "30%",
    marginLeft: "130px",
    marginTop: "40px",
  },
  imageBottomBorder: {
    height: 1,
    backgroundColor: "#707070",
    width: "30%",
    marginLeft: "130px",
    marginTop: "20px",
  },
}));
const EditAgency = () => {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const darkMode = false;

  const {
    agencyToEdit,
    agencyDetails,
    agencyDetailsApiInfo,
    updateAgencyApiInfo,
  } = useSelector((state) => state.agency);
  const { createVerificationApiInfo } = useSelector(
    (state) => state.verifications
  );
  const loggedInObject = useSelector((state) => state.auth.currentUser);

  

  const resetStoreData = () => {
    dispatch(getSingleUnverifiedCompanyReset());
    dispatch(resetCreateVerificationApi());
    dispatch(resetUpdateAgencyApiInfo());
    dispatch(setAgencyUpdateInfo(null));
    dispatch(setAgencyToEdit(null));
  };

  useEffect(() => {
    if (updateAgencyApiInfo?.response?.status) {
      toast.success("Agency updated successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      resetStoreData();
      history.push(`/agencies/`);
    } else if (updateAgencyApiInfo?.response?.status === false) {
      toast.error(updateAgencyApiInfo?.response?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      resetStoreData();
      history.push(`/agencies/`);
    }
    // eslint-disable-next-line
  }, [updateAgencyApiInfo?.response]);

  useEffect(() => {
    if (updateAgencyApiInfo?.error) {
      toast.error("Something went wrong", {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      resetStoreData();
      history.push(`/agencies/`);
    }
    // eslint-disable-next-line
  }, [updateAgencyApiInfo?.error]);

  return (
    <Layout>
      <CustomTopInfo heading="Agency Edit Profile" />
      {agencyDetailsApiInfo?.loading ||
        updateAgencyApiInfo?.loading ||
        createVerificationApiInfo?.loading ? (
        <Loader />
      ) : (
        <>
          <TopBar />
          <InformationForm />
          <div className={classes.bottomBorder} />
          <LogoImage />
          {agencyToEdit?.admin === loggedInObject?.id ||
            loggedInObject?.user_type === USER_TYPES?.ADMIN ? (
            <>
              <div className={classes.imageBottomBorder} />
              <VerificationImage />
            </>
          ) : null}
        </>
      )}
    </Layout>
  );
};

export default EditAgency;
