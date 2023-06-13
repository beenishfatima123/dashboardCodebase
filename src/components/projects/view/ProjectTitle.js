import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../constants/baseUrls";
import InvestmentPlan from "./InvestmentPlan";
import AdditionalImages from "./AdditionalImages";
import Location from "./Location";
import AcceptIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/CancelOutlined";
import HideIcon from "@mui/icons-material/VisibilityOff";
import ShowIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { Button, CircularProgress } from "@mui/material";
import { updateVerification } from "../../../features/verificationSlice";
import ConfirmModal from "../../../components/miscellaneousComponents/ConfirmModal";
import { deleteProject, resetUpdateApi, updateProject } from "../../../features/projectSlice";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    maxWidth: 1700,
  },
  topContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    padding: "0px 2%",
    minHeight: 100,
    position: "relative",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 2%",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    fontFamily: "medium",
    color: "#134696",
    margin: 0,
  },
  location: {
    color: "#1A2954",
    fontSize: 27,
  },
  iconsStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  description: {
    color: "#7D7D7D",
    fontSize: 16,
  },
  logoContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  companyLogo: {
    height: 230,
    width: 230,
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    position: "absolute",
    left: 0,
    bottom: 0,
    backgroundColor: "white",
  },
  heading: {
    color: "#134696",
    fontSize: 22,
    fontFamily: "medium",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // position: "absolute",
    top: "80%",
    gap: "35px",
  },
  "@media (max-width: 700px)": {
    topContainer: {
      flexDirection: "column",
    },
    iconsStyle: {
      maxWidth: "90%",
      marginRight: 0,
      alignSelf: "flex-end",
      marginTop: 50,
    },
    about: {
      marginLeft: 100,
      fontSize: 28,
    },
  },
}));

const ProjectTitle = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const { projectDetails, verificationDetail, updateApiInfo } = useSelector(
    (state) => state.project
  );
  const removeProject = () => {
    dispatch(
      deleteProject({
        authToken: loggedInObject?.token,
        id: projectDetails?.id,
      })
    );
  };

  const toggleView = () => {
    let formData = new FormData();
    formData.append("is_active", !projectDetails?.is_active);
    dispatch(
      updateProject({
        edit: true,
        id: projectDetails?.id,
        token: loggedInObject?.token,
        values: formData,
      })
    );
  }

  useEffect(() => {
    if (updateApiInfo?.response) {
      dispatch(resetUpdateApi());
    }
    // eslint-disable-next-line
  }, [updateApiInfo]);

  return (
    <div className={classes.container}>
      {openConfirmModal && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title="Are you sure you want to delete this project?"
          handleConfirm={removeProject}
        />
      )}
      <div className={classes.topContainer}>
        <div className={classes.logoContainer}>
          <img
            src={`${baseUrl}/${projectDetails?.company?.company_logo}`}
            alt=""
            className={classes.companyLogo}
          />
          <div style={{ marginLeft: 250 }}>
            <p className={classes.title}>{projectDetails?.title}</p>
            <span
              className={classes.location}
            >{`${projectDetails?.city}, ${projectDetails?.country}`}</span>
          </div>
        </div>
        <div className={classes.btnContainer}>
          {!verificationDetail?.isDirect &&
          projectDetails?.verification_status === "in_progress" ? (
            <>
              <Button
                startIcon={<AcceptIcon />}
                style={{
                  width: "166px",
                  height: "45px",
                  borderRadius: "10px",
                  color: "#FFFFFF",
                  background: "#0ed864",
                }}
                onClick={() => {
                  const sendVerificationData = {
                    status: "verified",
                  };
                  dispatch(
                    updateVerification({
                      id: verificationDetail?.verificationID,
                      token: loggedInObject?.token,
                      reqData: sendVerificationData,
                    })
                  );
                }}
              >
                Accept
              </Button>
              <Button
                startIcon={<DeleteIcon />}
                style={{
                  width: "166px",
                  height: "45px",
                  borderRadius: "10px",
                  color: "#FFFFFF",
                  background: "#ff6161",
                }}
                onClick={() => {
                  const sendVerificationData = {
                    status: "declined",
                  };
                  dispatch(
                    updateVerification({
                      id: verificationDetail?.verificationID,
                      token: loggedInObject?.token,
                      reqData: sendVerificationData,
                    })
                  );
                }}
              >
                Decline
              </Button>
            </>
          ) : (
            <>
              {updateApiInfo?.loading ? (
                <CircularProgress
                  size={45}
                  sx={{
                    color: "#134696",
                  }}
                />
              ) : projectDetails?.is_active ? (
                <ShowIcon
                  sx={{
                    fontSize: 20,
                    cursor: "pointer",
                    height: "55px",
                    width: "48px",
                  }}
                  onClick={toggleView}
                />
              ) : (
                <HideIcon
                  sx={{
                    fontSize: 20,
                    cursor: "pointer",
                    height: "55px",
                    width: "48px",
                  }}
                  onClick={toggleView}
                />
              )}
              <EditIcon
                sx={{
                  fontSize: 20,
                  cursor: "pointer",
                  height: "55px",
                  width: "48px",
                }}
                onClick={() => {
                  history.push(`/edit-project/${projectDetails?.id}`);
                }}
              />
              <DeleteIcon
                sx={{
                  fontSize: 20,
                  cursor: "pointer",
                  color: "red",
                  height: "55px",
                  width: "48px",
                }}
                onClick={() => setOpenConfirmModal(true)}
              />
            </>
          )}
        </div>
      </div>
      <div className={classes.content}>
        <span className={classes.heading}>Project Description</span>

        <span
          className={classes.description}
          dangerouslySetInnerHTML={{ __html: projectDetails?.description }}
        ></span>
        {projectDetails?.contents?.map((elem, index) => (
          <div key={index}>
            <span
              className={classes.heading}
              dangerouslySetInnerHTML={{ __html: elem?.body }}
            >
              {elem?.title || "Title"}
            </span>
          </div>
        ))}
      </div>
      <div className={classes.content}>
        <span className={classes.heading}>Investment Plan</span>
        <InvestmentPlan />
      </div>
      <div className={classes.content}>
        <AdditionalImages />
      </div>
      <div className={classes.content}>
        <Location />
      </div>
    </div>
  );
};

export default ProjectTitle;
