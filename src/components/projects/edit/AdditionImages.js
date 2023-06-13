import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  IconButton,
} from "@mui/material";
import {
  setProjectUpdateInfo,
} from "../../../features/projectSlice";
import { baseUrl } from "../../constants/baseUrls";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import { MAX_IMAGE_SIZE, MAX_FILE_NAME_LENGTH } from "../../constants/global";
import ConfirmModal from "../../miscellaneousComponents/ConfirmModal";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: 20,
    margin: "25px 74px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
  title: {
    fontSize: 24,
    fontFamily: "medium",
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
  "@media (max-width: 500px)": {
    title: {
      fontSize: 28,
    },
    image: {
      height: 100,
      width: 100,
    },
  },
}));

const gridSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 200,
  transition: "0.5s",
  position: "relative",

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
const crossButtonX = {
  position: "absolute",
  top: 13,
  right: -7,
  p: 0,
};

const AdditionalImages = ({imageToDelete, setImageToDelete}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let darkMode = false;

  const { projectToEdit, projectUpdateInfo } = useSelector(
    (state) => state.project
  );
  
  const [discarded, setDiscarded] = useState({ project_photoCount: 0 });
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selId, setSelId] = useState();
  const handleImagePicker = (prop) => (event) => {
    let intialCount = 0,
      count = 0;
    if (projectUpdateInfo?.project_photo)
      intialCount = count =
        projectToEdit?.project_photo?.length -
        imageToDelete?.length +
        projectUpdateInfo?.project_photo?.length;
    else
      intialCount = count =
        projectToEdit?.project_photo?.length - imageToDelete?.length;

    var files = event.target.files;
    files = [...files].filter(function (e) {
      if (
        e.size / 1024 ** 2 < MAX_IMAGE_SIZE &&
        e?.name?.length < MAX_FILE_NAME_LENGTH &&
        count < 5
      ) {
        count += 1;
        return e;
      }
    });
    setDiscarded({
      ...discarded,
      [`${prop}Count`]: event.target.files?.length - files?.length,
    });
    dispatch(
      setProjectUpdateInfo({
        ...projectUpdateInfo,
        [prop]: projectUpdateInfo?.[prop]?.length
          ? [
              ...projectUpdateInfo?.[prop],
              ...Array.from(files).slice(0, 5 - intialCount),
            ]
          : files,
      })
    );
  };
  const handleRemoveImage = (removeExisting) => (position) => {
    if (removeExisting) {
      setSelId(projectToEdit?.["project_photo"][position]?.id);
      setOpenConfirmModal(true);
    } else
      dispatch(
        setProjectUpdateInfo({
          ...projectUpdateInfo,
          ["project_photo"]: projectUpdateInfo?.["project_photo"]?.filter(
            (elem, index) => index !== position
          ),
        })
      );
  };
  const handleDeleteImage = () => {
    setImageToDelete([...imageToDelete, selId]);
    setOpenConfirmModal(false);
  };

  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      <span
        className={classes.title}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        Upload Additional Plan Images
      </span>
      <Grid container columnSpacing={1} sx={{ transition: "0.5s" }}>
        {projectToEdit?.project_photo?.map((elem, index) => (
          <Grid item xs={6} sm={4} md={3} lg={2} sx={gridSx} key={index}>
            <div style={{ position: "relative" }}>
              <img
                src={`${baseUrl}/${elem?.photo}`}
                alt=""
                className={classes.image}
                style={{
                  opacity: imageToDelete?.includes(elem?.id) ? "0.5" : "1",
                }}
              />
              <IconButton
                sx={crossButton}
                component="label"
                onClick={() => handleRemoveImage("project_photo")(index)}
              >
                <CancelIcon
                  style={{ color: darkMode ? "#0ed864" : "#134696" }}
                />
              </IconButton>
            </div>
          </Grid>
        ))}
        {projectUpdateInfo?.project_photo?.map((elem, index) => (
          <Grid item xs={6} sm={4} md={3} lg={2} sx={gridSx} key={index}>
            <img
              src={URL.createObjectURL(elem)}
              alt=""
              className={classes.image}
            />
            <IconButton
              sx={crossButtonX}
              component="label"
              onClick={() => handleRemoveImage(false)(index)}
            >
              <CancelIcon style={{ color: "#134696" }} />
            </IconButton>
          </Grid>
        ))}
        <Grid item xs={6} sm={4} md={3} lg={2} sx={gridSx}>
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
              onInput={handleImagePicker("project_photo")}
              multiple
            />
            <AddIcon style={{ color: darkMode ? "#0ed864" : "#134696" }} />
          </IconButton>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
        {discarded?.project_photoCount > 0 && (
            <div className={classes.helperText}>
              {discarded?.project_photoCount} image(s) discarded (file size/name
              too large).
            </div>
          )}
          </Grid>
      </Grid>
      {openConfirmModal && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title="Are you sure to delete this image?"
          handleConfirm={handleDeleteImage}
        />
      )}
    </div>
  );
};

export default AdditionalImages;
