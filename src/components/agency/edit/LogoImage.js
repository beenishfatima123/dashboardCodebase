import React from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../constants/baseUrls";
import {
  setAgencyToEdit,
  setAgencyUpdateInfo,
} from "../../../features/agencySlice";
import { Grid, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import { validateInputs } from "../../constants/helperFunctions";

const gridSx = {
  display: "flex",
  flexDirection: "row",
  gap: 2,
  alignItems: "center",
  justifyContent: "center",
  minHeight: 200,
  transition: "0.5s",
};
const buttonSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
  borderRadius: "10px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "white",
  },
};
const crossButton = {
  position: "absolute",
  top: -10,
  right: -10,
  p: 0,
};
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 30,
    width: "78%",
    margin: "auto",
  },
  heading: {
    fontSize: 16,
    fontFamily: "medium",
    color: "#134696",
  },
  title: {
    marginTop: "23px",
    fontSize: 16,
    fontFamily: "light",
    color: "#7d7d7d",
  },
  image: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px",
    boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
    borderRadius: "10px",
    height: 150,
    width: 150,
    objectFit: "cover",
  },
  helperText: {
    fontSize: 12,
    color: "red",
    alignSelf: "flex-start",
    marginTop: 3,
  },
}));

const LogoImage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const darkMode = false;

  const { agencyToEdit, agencyUpdateInfo } = useSelector(
    (state) => state.agency
  );

  const handleImagePicker = (prop) => (event) => {
    const validationError = validateInputs("image", event.target.files[0]);
    dispatch(
      setAgencyToEdit({
        ...agencyToEdit,
        [prop]: event?.target?.files[0],
        [`${prop}Validation`]: validationError,
      })
    );
    dispatch(
      setAgencyUpdateInfo({
        ...agencyUpdateInfo,
        [prop]: event?.target?.files[0],
        [`${prop}Validation`]: validationError,
      })
    );
  };

  const handleRemoveImage = (prop) => {
    dispatch(
      setAgencyToEdit({
        ...agencyToEdit,
        edited: true,
        [prop]: null,
        [`${prop}Validation`]: "Please select logo for agency.",
      })
    );
    agencyUpdateInfo?.company_logo &&
      dispatch(
        setAgencyUpdateInfo({
          ...agencyUpdateInfo,
          [prop]: null,
        [`${prop}Validation`]: "Please select logo for agency.",
        })
      );
  };

  return (
    <div className={classes.container}>
      <span className={classes.heading}>Agency Profile Logo</span>
      <span className={classes.title}>
        Please attach the agency's logo for the profile view.
      </span>
      <Grid item xs={12} sm={4} md={3} lg={2} sx={gridSx}>
        {!agencyUpdateInfo?.company_logo &&
        agencyToEdit?.company_logo === null ? null : (
          <div style={{ position: "relative" }}>
            <img
              className={classes.image}
              src={
                !agencyUpdateInfo?.company_logo
                  ? `${baseUrl}/${agencyToEdit?.company_logo}`
                  : URL.createObjectURL(agencyUpdateInfo?.company_logo)
              }
              alt={agencyUpdateInfo?.company_logo ? "profile-image" : null}
            />
            <IconButton
              sx={crossButton}
              component="label"
              onClick={() => handleRemoveImage("company_logo")}
            >
              <CancelIcon style={{ color: darkMode ? "#0ed864" : "#134696" }} />
            </IconButton>
          </div>
        )}
        {agencyToEdit?.company_logo === null &&
        !agencyUpdateInfo?.company_logo ? (
          <div>
            <IconButton
              sx={{
                ...buttonSx,
                backgroundColor: darkMode ? "#212124" : "#fff",
                width: 150,
                height: 150,
              }}
              component="label"
            >
              <input
                hidden
                accept="image/png, image/jpeg"
                type="file"
                onInput={handleImagePicker("company_logo")}
              />
              <AddIcon style={{ color: darkMode ? "#0ed864" : "#134696" }} />
            </IconButton>
          </div>
        ) : null}
      </Grid>
      {agencyToEdit?.edited &&
        (agencyToEdit?.company_logoValidation ||
          agencyUpdateInfo?.company_logoValidation) && (
          <span className={classes.helperText}>
            {agencyUpdateInfo?.company_logoValidation}
          </span>
        )}
    </div>
  );
};

export default LogoImage;
