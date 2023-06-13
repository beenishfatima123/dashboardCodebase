import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../customComponents/layout/Layout";
import Loader from "../../customComponents/Loader";
import CustomTopInfo from "../../customComponents/layout/CustomTopInfo";
import TopCard from "../../components/projects/add/TopCard";
import FeatureImage from "../../components/projects/add/FeatureImage";
import Details from "../../components/projects/add/Details";
import InstallmentPlans from "../../components/projects/add/InstallmentPlans";
import Location from "../../components/projects/add/Location";
import AdditionalImages from "../../components/projects/add/AdditionImages";
import SaveCard from "../../components/projects/add/SaveCard";
import { validateInputs } from "../../components/constants/helperFunctions";
import {
  resetCreateProject,
  resetCreateProjectApi,
} from "../../features/projectSlice";

const AddProject = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const darkMode = false;

  const [validation, setValidation] = useState({});
  const { createProjectApiInfo } = useSelector((state) => state.project);

  const [installmentPlans, setInstallmentPlans] = useState([
    {
      duration: 12,
      description: "",
      amount: 0,
      down_payment: 0,
      inserted: true,
      durationValidation: validateInputs("duration", 12),
      descriptionValidation: validateInputs("description", ""),
      amountValidation: validateInputs("amount", 0),
      down_paymentValidation: validateInputs("down_payment", 0),
    },
  ]);

  useEffect(() => {
    if (createProjectApiInfo?.error) {
      toast.error(createProjectApiInfo?.error, {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetCreateProjectApi());
    }
    // eslint-disable-next-line
  }, [createProjectApiInfo?.error]);

  useEffect(() => { 
    if (createProjectApiInfo?.response?.status) {
      toast.success("Project added successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#134696" },
      });
      history.push("/projects");
      dispatch(resetCreateProject());
      dispatch(resetCreateProjectApi());
    }
    // eslint-disable-next-line
  }, [createProjectApiInfo?.response]);

  return (
    <Layout>
      <CustomTopInfo heading="Project" />
      {createProjectApiInfo?.loading ? (
        <Loader />
      ) : (
        <>
          <TopCard />
          <FeatureImage />
          <Details validation={validation} setValidation={setValidation} />
          <InstallmentPlans
            installmentPlans={installmentPlans}
            setInstallmentPlans={setInstallmentPlans}
          />
          <Location />
          <AdditionalImages />
          <SaveCard installmentPlans={installmentPlans} />
        </>
      )}
    </Layout>
  );
};

export default AddProject;
