import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Layout from "../../customComponents/layout/Layout";
import { getAllProjects, paginate, resetCreateProject, resetUpdateApi } from "../../features/projectSlice";
import { baseUrl } from "../../components/constants/baseUrls";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../customComponents/Loader";
import { resetDeleteProjectApi } from "../../features/projectSlice";
import { Grid, Divider, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import CustomTopInfo from "../../customComponents/layout/CustomTopInfo";
import ProjectCard from "../../components/projects/ProjectCard";
import Pagination from "../../components/miscellaneousComponents/Pagination";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "25px 20px",
    border: "1px solid #c9c9c9",
    borderRadius: "10px",
  },
  topSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "100%",
    margin: "20px 35px",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    top: "80%",
    gap: "30px",
    maxWidth: "95%",
  },
  projectPic: {
    width: 135,
    height: 135,
    objectFit: "cover",
    position: "absolute",
    top: "-30%",
  },
  addBtn: {
    borderRadius: 35,
    backgroundColor: "#134696",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "0.5s",
    zIndex: 1200,
  },
  btnText: {
    fontSize: 15,
    color: "white",
  },
}));

const Projects = () => {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const {
    allProjects,
    allProjectsApiInfo,
    deleteProjectApiInfo,
    updateApiInfo,
  } = useSelector((state) => state.project);

  const [hovering, setHovering] = useState(false);
  const [selUserID, setSelUserID] = useState(null);


  useEffect(() => {
    dispatch(
      getAllProjects({
        authToken: loggedInObject?.token,
        dataURL: `${baseUrl}/users/new-project/?dashboard=true&user_type=${loggedInObject?.user_type}`,
      })
    );
    // }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (deleteProjectApiInfo?.response?.status) {
      toast.success("Project deleted successfully.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
        hideProgressBar: true,
      });
      dispatch(resetDeleteProjectApi());
    }
  }, [deleteProjectApiInfo?.response]);

  useEffect(() => {
    if (updateApiInfo?.toggleVisibility) {
      toast.success(
        updateApiInfo?.response?.is_active
          ? "Project is visible now."
          : "Project is hidden now",
        {
          position: toast.POSITION.TOP_CENTER,
          progressStyle: { backgroundColor: "#014493" },
        }
      );
      dispatch(resetUpdateApi());
    }
    // eslint-disable-next-line
  }, [updateApiInfo]);

  const paginateProjects = (url) => {
    dispatch(
      paginate({
        authToken: loggedInObject?.token,
        url,
      })
    );
  };
  const handlePageSelect = (pageNumber) => {
    let newLink,
      pageSplit = "";
    if (allProjects?.result?.next)
      pageSplit = allProjects?.result?.next?.split("page=");
    else pageSplit = allProjects?.result?.previous?.split("page=");
    if (pageSplit?.length > 2) {
      newLink = `${pageSplit[0]}page=${pageNumber}${pageSplit[1]?.substring(
        pageSplit[1]?.indexOf("&"),
        pageSplit[1]?.length
      )}`;
    } else if (pageSplit[0].includes("?")) {
      newLink = `${pageSplit[0]}page=${pageNumber}`;
    } else {
      newLink = `${pageSplit[0]}?page=${pageNumber}`;
    }
    paginateProjects(newLink.replace("http", "https"));
  };

  return (
    <Layout>
      <CustomTopInfo heading="Projects" />
      {allProjectsApiInfo?.loading ? (
        <Loader />
      ) : (
        <div className={classes.container}>
          <div className={classes.topSection}>
            <div
              style={{ fontSize: 22, fontFamily: "heavy", color: "#134696" }}
            >
              All Projects
            </div>
            <div
              className={classes.addBtn}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              style={{
                padding: hovering ? "10px 40px" : 10,
              }}
              onClick={() => {
                dispatch(resetCreateProject());
                history.push("/add-project")
              }}
            >
              {hovering ? (
                <span className={classes.btnText}>ADD Project</span>
              ) : (
                <AddIcon style={{ color: "white" }} />
              )}
            </div>
          </div>
          <Divider style={{ margin: "0 35px" }} />
          <Box
            sx={{
              margin: 5,
            }}
          >
            <Grid
              container
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
              marginTop="40px"
            >
              {allProjects && allProjects?.result.count > 0 ? (
                allProjects?.result?.results?.map((project, index) => (
                  <Grid item key={index} xs={12} sm={6} md={6} lg={4} xl={3}>
                    <ProjectCard 
                      project={project} 
                      verificationID={null} 
                      selUserID={selUserID}
                      setSelUserID={setSelUserID} />
                  </Grid>
                ))
              ) : (
                <>
                  <div>No Results Found</div>
                </>
              )}
            </Grid>
          </Box>
          {allProjects?.result?.results?.length > 0 && (
            <Pagination
              data={allProjects?.result}
              page={handlePageSelect}
              paginate={paginateProjects}
            />
          )}
        </div>
      )}
    </Layout>
  );
};

export default Projects;
