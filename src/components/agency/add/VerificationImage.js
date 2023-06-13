import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { setCreateAgencyData } from "../../../features/agencySlice";
import { Grid, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import pdfIcon from "../../../assets/settings/pdficon.png";
import { MAX_IMAGE_SIZE, MAX_FILE_NAME_LENGTH } from "../../constants/global";

const gridSx = {
  display: "flex",
  flexDirection: "row",
  gap: 2,
  alignItems: "center",
  justifyContent: "flex-start",
  flexWrap: "wrap",
  minHeight: 200,
  transition: "0.5s",
  marginTop: 2,
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

const VerificationImage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const darkMode = false;

  const [discarded, setDiscarded] = useState({ documentsCount: 0 });
  const { createAgencyData } = useSelector((state) => state.agency);

  const handleImagePicker = (prop) => (event) => {
    let files = event?.target?.files;
    files = [...files].filter(function (e, index) {
      if (
        e.size / 1024 ** 2 < MAX_IMAGE_SIZE &&
        e?.name?.length < MAX_FILE_NAME_LENGTH &&
        index < 5
      ) {
        return e;
      }
    });
    setDiscarded({
      ...discarded,
      [`${prop}Count`]: event?.target?.files?.length - files?.length,
    });
    dispatch(
      setCreateAgencyData({
        ...createAgencyData,
        [prop]: createAgencyData?.[prop]?.length
          ? [
              ...createAgencyData?.[prop],
              ...Array.from(files).slice(
                0,
                5 - createAgencyData?.[prop]?.length
              ),
            ]
          : files,
      })
    );
  };

  const handleRemoveDocument = (prop) => (position) => {
    dispatch(
      setCreateAgencyData({
        ...createAgencyData,
        [prop]: createAgencyData?.[prop]?.filter(
          (elem, index) => index !== position
        ),
      })
    );
    setDiscarded({
      ...discarded,
      [`${prop}Count`]: 0,
    });
  };

  return (
    <div className={classes.container}>
      <span className={classes.heading}>Add Agency's Document</span>
      <span className={classes.title}>
        Please attach all the agency's documents in order for the agency's
        verification and better security. (Max. 5 images are allowed.)
      </span>
      <Grid item xs={12} sm={4} md={3} lg={2} sx={gridSx}>
        {createAgencyData?.verification_files?.length > 0 &&
          createAgencyData?.verification_files?.map((elem, index) => (
            <div key={index} style={{ position: "relative" }}>
              {elem?.type?.includes("image") ? (
                <img
                  src={URL.createObjectURL(elem)}
                  alt=""
                  className={classes.image}
                />
              ) : (
                <img src={pdfIcon} alt="" className={classes.image} />
              )}
              <IconButton
                sx={crossButton}
                component="label"
                onClick={() => handleRemoveDocument("verification_files")(index)}
              >
                <CancelIcon
                  style={{ color: darkMode ? "#0ed864" : "#134696" }}
                />
              </IconButton>
            </div>
          ))}

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
              accept="image/png, image/jpeg, .doc, .pdf"
              type="file"
              onInput={handleImagePicker("verification_files")}
              multiple
            />
            <AddIcon style={{ color: darkMode ? "#0ed864" : "#134696" }} />
          </IconButton>
        </div>
      </Grid>
      {discarded?.verification_filesCount > 0 && (
        <span className={classes.helperText}>
          {discarded?.verification_filesCount} image(s) discarded (file size too
          large).
        </span>
      )}
    </div>
  );
};

export default VerificationImage;
