import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../customComponents/layout/Layout";
import Loader from "../../customComponents/Loader";
import CustomTopInfo from "../../customComponents/layout/CustomTopInfo";
import TopCard from "../../components/projects/edit/TopCard";
import FeatureImage from "../../components/projects/edit/FeatureImage";
import Details from "../../components/projects/edit/Details";
import InstallmentPlans from "../../components/projects/edit/InstallmentPlans";
import Location from "../../components/projects/edit/Location";
import AdditionalImages from "../../components/projects/edit/AdditionImages";
import { validateInputs } from "../../components/constants/helperFunctions";
import {
  getProjectDetails,
  resetUpdateApi,
  setProjectToEdit,
} from "../../features/projectSlice";

const EditProject = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const darkMode = false;

  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState({});
  const { projectDetails, projectDetailsApiInfo, updateApiInfo } = useSelector(
    (state) => state.project
  );

  const [imageToDelete, setImageToDelete] = useState([]);
  const [installmentPlans, setInstallmentPlans] = useState([
    {
      duration: 12,
      description: "",
      amount: 0,
      down_payment: 0,
      // inserted: true,
      durationValidation: validateInputs("duration", 12),
      descriptionValidation: validateInputs("description", ""),
      amountValidation: validateInputs("amount", 0),
      down_paymentValidation: validateInputs("down_payment", 0),
    },
  ]);

  useEffect(() => {
    if (projectDetails?.id !== params?.id) {
      dispatch(getProjectDetails({ id: params?.id }));
    }
    // eslint-disable-next-line
  }, [params?.id]);

  useEffect(() => {
    if (projectDetails && projectDetails?.id !== params?.id) {
      setLoading(true);
      dispatch(setProjectToEdit(projectDetails));
      setInstallmentPlans(projectDetails?.project_installment);
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [projectDetails]);

  useEffect(() => {
    if (updateApiInfo?.error) {
      toast.error(updateApiInfo?.error, {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetUpdateApi());
    }
    // eslint-disable-next-line
  }, [updateApiInfo?.error]);

  useEffect(() => {
    if (updateApiInfo?.response) {
      toast.success("Project updated successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#134696" },
      });
      dispatch(resetUpdateApi());
      history.push("/projects");
    }
    // eslint-disable-next-line
  }, [updateApiInfo?.response]);
  // 120000656667.00
  return (
    <Layout>
      <CustomTopInfo heading="Project" />
      {loading || projectDetailsApiInfo?.loading || updateApiInfo?.loading ? (
        <Loader />
      ) : (
        <>
          <TopCard
            validation={validation}
            installmentPlans={installmentPlans}
            imageToDelete={imageToDelete}
          />
          <FeatureImage />
          <Details validation={validation} setValidation={setValidation} />
          <InstallmentPlans
            installmentPlans={installmentPlans}
            setInstallmentPlans={setInstallmentPlans}
          />
          <Location />
          <AdditionalImages
            imageToDelete={imageToDelete}
            setImageToDelete={setImageToDelete}
          />
        </>
      )}
    </Layout>
  );
};

export default EditProject;
