import React from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import { setProjectData } from "../../../features/projectSlice";
import { validateInputs } from "../../constants/helperFunctions";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 7.5px",
    margin: "25px 50px",
    minHeight: "250px",
    backgroundPosition: "center !important",
    backgroundRepeat: "no-repeat !important",
    backgroundSize: "cover !important",
    width: "100wh",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    zIndex: 0,
  },
  helperText: {
    fontSize: 12,
    color: "red",
    alignSelf: "flex-start",
    marginTop: 3,
  },
}));

const crossButton = {
  position: "absolute",
  top: -10,
  right: -10,
  p: 0,
};

const FeatureImage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let darkMode = false;

  const { projectData } = useSelector((state) => state.project);

  const handleImagePicker = (prop) => (event) => {
    if (prop === "feature_photo") {
      const validationError = validateInputs("image", event.target.files[0]);
      dispatch(
        setProjectData({
          ...projectData,
          [prop]: event?.target?.files[0],
          [`${prop}Validation`]: validationError,
        })
      );
    }
  };

  const handleRemoveImage = (prop) => {
    dispatch(
      setProjectData({
        ...projectData,
        [prop]: null,
        [`${prop}Validation`]: "Please select feature photo for project.",
      })
    );
  };

  return (
    <div className={classes.container}>
      <>
        {projectData?.feature_photo && (
          <>
            <img
              src={URL.createObjectURL(projectData?.feature_photo)}
              alt=""
              className={classes.background}
            />
            <IconButton
              sx={crossButton}
              component="label"
              onClick={() => handleRemoveImage("feature_photo")}
            >
              <CancelIcon style={{ color: darkMode ? "#0ed864" : "#134696" }} />
            </IconButton>
          </>
        )}
        {!projectData?.feature_photo && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IconButton
              sx={{
                backgroundColor: darkMode ? "#212124" : "#fff",
              }}
              component="label"
            >
              <input
                hidden
                accept="image/png, image/jpeg"
                type="file"
                onInput={handleImagePicker("feature_photo")}
              />
              <AddIcon style={{ color: darkMode ? "#0ed864" : "#134696" }} />
            </IconButton>
            {projectData?.feature_photoValidation && (
              <span className={classes.helperText}>
                {projectData?.feature_photoValidation}
              </span>
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default FeatureImage;
