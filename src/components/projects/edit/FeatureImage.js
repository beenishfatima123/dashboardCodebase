import React from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { baseUrl } from "../../constants/baseUrls";
import { validateInputs } from "../../constants/helperFunctions";
import {
  setProjectToEdit,
  setProjectUpdateInfo,
} from "../../../features/projectSlice";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    margin: "25px 74px 0px",
    minHeight: "250px",
    backgroundPosition: "center !important",
    backgroundRepeat: "no-repeat !important",
    backgroundSize: "cover !important",
    width: "100wh",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 0,
  },
}));
const FeatureImage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { projectToEdit, projectUpdateInfo } = useSelector(
    (state) => state.project
  );

  const handleImagePicker = (prop) => (event) => {
    const validationError = validateInputs("image", event.target.files[0]);
    if (validationError) {
      dispatch(
        setProjectToEdit({
          ...projectToEdit,
          [`${prop}Validation`]: validationError,
        })
      );
    } else {
      dispatch(
        setProjectUpdateInfo({
          ...projectUpdateInfo,
          [prop]: event?.target?.files[0],
        })
      );
    }
  };

  return (
    <div className={classes.container}>
      <img
        src={
          projectUpdateInfo?.feature_photo
            ? URL.createObjectURL(projectUpdateInfo?.feature_photo)
            : `${baseUrl}/${projectToEdit?.feature_photo}`
        }
        alt=""
        className={classes.background}
      />
      <Button
        component="label"
        sx={{
          backgroundColor: "#134696",
          fontFamily: "heavy",
          borderRadius: 25,
          fontSize: 12,
          m: 2,
          color: "#fff",
          "&:hover": {
            backgroundColor: "#134696",
          },
          padding: "4px 20px",
          zIndex: 10,
        }}
        endIcon={<EditIcon />}
      >
        <input
          hidden
          accept="image/png, image/jpeg"
          type="file"
          onInput={handleImagePicker("feature_photo")}
        />
        Edit
      </Button>
    </div>
  );
};

export default FeatureImage;
