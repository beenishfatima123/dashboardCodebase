import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetCreateAgencyDataApi, setCreateAgencyData } from "../../features/agencySlice";
import { toast } from "react-toastify";
import Layout from "../../customComponents/layout/Layout";
import Loader from "../../customComponents/Loader";
import CustomTopInfo from "../../customComponents/layout/CustomTopInfo";
import TopBar from "../../components/agency/add/TopBar";
import InformationForm from "../../components/agency/add/InformationForm";
import LogoImage from "../../components/agency/add/LogoImage";
import VerificationImage from "../../components/agency/add/VerificationImage";

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
const AddAgency = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { createAgencyDataApiInfo } = useSelector((state) => state.agency);
  const { createVerificationApiInfo } = useSelector(
    (state) => state.verifications
  );

  const resetStoreData = () => {
    dispatch(setCreateAgencyData(null));
    dispatch(resetCreateAgencyDataApi());
  };

  useEffect(() => {
    if (createVerificationApiInfo?.response?.status) {
      toast.success("Agency created and verification submitted successfully.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      resetStoreData();
      history.push(`/agencies/`);
    }
    // eslint-disable-next-line
  }, [createVerificationApiInfo?.response]);

  useEffect(() => {
    if (createVerificationApiInfo?.error) {
      toast.error("Something went wrong", {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      resetStoreData();
      history.push(`/agencies/`);
    }
    // eslint-disable-next-line
  }, [createVerificationApiInfo?.error]);

  return (
    <Layout>
      <CustomTopInfo heading="Add Agency Profile" />
      {createAgencyDataApiInfo?.loading ||
        createVerificationApiInfo?.loading ? (
        <Loader />
      ) : (
        <>
          <TopBar />
          <InformationForm />
          <div className={classes.bottomBorder} />
          <LogoImage />
          <div className={classes.imageBottomBorder} />
          <VerificationImage />
        </>
      )}
    </Layout>
  );
};

export default AddAgency;
