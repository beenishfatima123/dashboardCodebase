import React from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import { validateInputs } from "../../constants/helperFunctions";
import { setCourseData } from "../../../features/newCourseSlice";

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

  const { courseData } = useSelector((state) => state.course);

  const handleImagePicker = (prop) => (event) => {
    if (prop === "thumbnail") {
      const validationError = validateInputs("image", event.target.files[0]);
      dispatch(
        setCourseData({
          ...courseData,
          [prop]: event?.target?.files[0],
          [`${prop}Validation`]: validationError,
        })
      );
    }
  };

  const handleRemoveImage = (prop) => {
    dispatch(
      setCourseData({
        ...courseData,
        [prop]: null,
        [`${prop}Validation`]: "Please select thumbnail for course.",
      })
    );
  };

  return (
    <div className={classes.container}>
      <>
        {courseData?.thumbnail && (
          <>
            <img
              src={URL.createObjectURL(courseData?.thumbnail)}
              alt=""
              className={classes.background}
            />
            <IconButton
              sx={crossButton}
              component="label"
              onClick={() => handleRemoveImage("thumbnail")}
            >
              <CancelIcon style={{ color: darkMode ? "#0ed864" : "#134696" }} />
            </IconButton>
          </>
        )}
        {!courseData?.thumbnail && (
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
                onInput={handleImagePicker("thumbnail")}
              />
              <AddIcon style={{ color: darkMode ? "#0ed864" : "#134696" }} />
            </IconButton>
            {courseData?.thumbnailValidation && (
              <span className={classes.helperText}>
                {courseData?.thumbnailValidation}
              </span>
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default FeatureImage;
