import React, { useEffect } from "react";
import Layout from "../../customComponents/layout/Layout";
import {
  getProjectDetails,
  resetDeleteProjectApi,
  setProjectDetails,
} from "../../features/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../../customComponents/Loader";
import { makeStyles } from "@mui/styles";
import DetailsTop from "../../components/projects/view/DetailsTop";
import ProjectTitle from "../../components/projects/view/ProjectTitle";
import { toast } from "react-toastify";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 5,
  },
  heading: {
    color: "#134696",
    fontSize: 32,
  },
  slider: {
    margin: "20px 5%",
  },
}));

const ProjectDetail = () => {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const { projectDetailsApiInfo, deleteProjectApiInfo } =
    useSelector((state) => state.project);


  useEffect(() => {
    dispatch(getProjectDetails({ id: params?.id }));
    // eslint-disable-next-line
  }, [params?.id]);

  useEffect(() => {
    if (deleteProjectApiInfo?.response?.status) {
      toast.success("Project deleted successfully.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
        hideProgressBar: true,
      });
      dispatch(setProjectDetails(null));
      dispatch(resetDeleteProjectApi());
      history.push("/projects");
    }
  }, [deleteProjectApiInfo?.response]);

  return (
    <Layout>
      <div className={classes.container}>
        {projectDetailsApiInfo?.loading || deleteProjectApiInfo?.loading ? (
          <Loader />
        ) : (
          <>
            <DetailsTop />
            <ProjectTitle />
          </>
        )}
      </div>
    </Layout>
  );
};

export default ProjectDetail;
