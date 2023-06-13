import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../constants/baseUrls";
import "../../components/agency/view/slider/customSlider.css";
import {
  deleteProject,
  resetProjectToEdit,
  setVerificationDetail,
  updateProject,
} from "../../features/projectSlice";
import { Button, CircularProgress } from "@mui/material";
import HideIcon from "@mui/icons-material/VisibilityOff";
import ShowIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/CancelOutlined";
import EditIcon from "@mui/icons-material/Edit";
import ApproveIcon from "@mui/icons-material/CheckCircleOutline";
import ConfirmModal from "../miscellaneousComponents/ConfirmModal";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "237px",
    borderRadius: 5,
    filter: "drop-shadow(0px 3px 6px rgba(0,0,0,0.16 ))",
    background: "#ffffff",
    backgroundSize: "cover",
    marginBottom: "70px",
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
    cursor: "pointer",
    borderColor: "#134696",
    borderWidth: "8px",
    borderStyle: "solid",
    borderRadius: "8px",
    background: "#ffffff",
  },
  title: {
    fontSize: 10,
    color: "#fff",
    marginRight: 5,
  },
}));

const ProjectCard = ({ project, verificationID, selUserID, setSelUserID }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const darkMode = false;

  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const { updateApiInfo } = useSelector((state) => state.project);

  const removeProject = () => {
    setOpenConfirmModal(false);
    dispatch(
      deleteProject({ authToken: loggedInObject?.token, id: project?.id })
    );
  };

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
      <img
        className={classes.projectPic}
        src={`${baseUrl}/${project?.feature_photo}`}
        alt=""
        onClick={() => {
          dispatch(
            setVerificationDetail({
              isDirect: true,
              verificationID: verificationID,
            })
          );
          history.push(`/project/${project?.id}`);
        }}
      />
      <p
        style={{
          marginTop: "35px",
          color: "#134696",
          fontFamily: "medium",
          fontSize: "20px",
          lineHeight: "20px",
          textAlign: "center",
        }}
      >
        {project?.title}
      </p>
      <p
        style={{
          fontSize: "14px",
          lineHeight: "20px",
          textAlign: "center",
          color: "#b5b5be",
          fontFamily: "light",
        }}
      >
        {project?.city}, {project?.country}
      </p>
      <div className={classes.btnContainer}>
        {!verificationID ? (
          <>
            <Button
              startIcon={<EditIcon />}
              sx={{
                fontSize: "12px",
                lineHeight: "20px",
                textAlign: "left",
                fontFamily: "light",
                width: "87px",
                height: "46px",
                borderRadius: "14px",
                color: "#FFFFFF",
                background: "#123e86",
                "&:hover": {
                  backgroundColor: "#123e86",
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(resetProjectToEdit());
                history.push(`/edit-project/${project?.id}/`);
              }}
            >
              Edit
            </Button>
            {selUserID === project?.id && updateApiInfo?.loading ? (
              <CircularProgress
                size={45}
                sx={{
                  color: "#134696",
                }}
              />
            ) : (
              <Button
                startIcon={
                  project?.is_active === true ? <ShowIcon /> : <HideIcon />
                }
                sx={{
                  fontSize: "12px",
                  lineHeight: "20px",
                  textAlign: "left",
                  fontFamily: "light",
                  width: "87px",
                  height: "46px",
                  border: "1px solid #134594",
                  borderRadius: "14px",
                  color: "#0F3879",
                  background: "#FFFFFF",
                }}
                onClick={() => {
                  setSelUserID(project?.id);
                  let formData = new FormData();
                  formData.append("is_active", !project?.is_active);
                  dispatch(
                    updateProject({
                      edit: false,
                      id: project?.id,
                      token: loggedInObject?.token,
                      values: formData,
                    })
                  );
                }}
              >
                {project?.is_active === true ? "Hide" : "UnHide"}
              </Button>
            )}
            <Button
              startIcon={<DeleteIcon />}
              sx={{
                fontSize: "12px",
                lineHeight: "20px",
                textAlign: "left",
                fontFamily: "light",
                width: "87px",
                height: "46px",
                border: "1px solid #ff6161",
                borderRadius: "14px",
                color: "#ff6161",
                background: "#FFFFFF",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setOpenConfirmModal(true);
              }}
            >
              Delete
            </Button>
          </>
        ) : (
          <>
            <Button
              startIcon={<ApproveIcon />}
              sx={{
                fontSize: "12px",
                lineHeight: "20px",
                textAlign: "left",
                fontFamily: "light",
                width: "87px",
                height: "46px",
                border: "1px solid #0ed864",
                borderRadius: "14px",
                color: "#0ed864",
                background: "#FFFFFF",
              }}
              onClick={() => {}}
            >
              Accept
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              sx={{
                fontSize: "12px",
                lineHeight: "20px",
                textAlign: "left",
                fontFamily: "light",
                width: "87px",
                height: "46px",
                border: "1px solid #ff6161",
                borderRadius: "14px",
                color: "#ff6161",
                background: "#FFFFFF",
              }}
              onClick={(e) => {
                e.stopPropagation();
                // handleDeleteClick(project?.id);
              }}
            >
              Decline
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
