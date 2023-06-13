import React, { useState, useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../constants/baseUrls";
import {
  deletePropertyImage,
  setListingUpdateInfo,
} from "../../../features/listingsSlice";
import { Grid, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import ConfirmModal from "../../miscellaneousComponents/ConfirmModal";
import Loader from "../../../customComponents/Loader";
import { validateImageFiles } from "../../constants/helperFunctions";

const gridSx = {
  display: "flex",
  flexDirection: "column",
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
    flex: 1,
    padding: 20,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    margin: "10px 3px",
  },
  title: {
    fontSize: 24,
    fontFamily: "heavy",
    textTransform: "uppercase",
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
  helperContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    padding: "8px 16px",
  },
  helperText: {
    fontSize: 12,
    color: "red",
    alignSelf: "flex-start",
    marginLeft: 15,
  },
  helperTextTitle: {
    fontSize: 14,
    color: "red",
    alignSelf: "flex-start",
    marginLeft: 15,
    fontFamily: "heavy",
    marginBottom: 10,
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

const ImageEdit = ({ attribute, label }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [discarded, setDiscarded] = useState();

  const darkMode = false;
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const { listingToEdit, listingUpdateInfo, allListingsApiInfo } = useSelector(
    (state) => state.listings
  );

  const getDiscardedImageHelperText = (values) => {
    return (
      <div className={classes.helperContainer}>
        {values?.discardedForDuplicates?.length > 0 && (
          <>
            <span
              className={classes.helperTextTitle}
            >{`${values?.discardedForDuplicates?.length} files(s) discarded due to duplication: `}</span>
            {values?.discardedForDuplicates?.map((elem, index) => (
              <div key={index}>
                <span className={classes.helperText}>{`- ${elem?.name} `}</span>
              </div>
            ))}
            <br />
          </>
        )}

        {values?.discardedForName?.length > 0 && (
          <>
            <span
              className={classes.helperTextTitle}
            >{`${values?.discardedForName?.length} files(s) discarded due to invalid name: `}</span>
            {values?.discardedForName?.map((elem, index) => (
              <div key={index}>
                <span className={classes.helperText}>{`- ${elem?.name} `}</span>
                <br />
              </div>
            ))}
            <br />
          </>
        )}
        {values?.discardedForSize?.length > 0 && (
          <>
            <span
              className={classes.helperTextTitle}
            >{`${values?.discardedForSize?.length} files(s) discarded due to size limit: `}</span>
            {values?.discardedForSize?.map((elem, index) => (
              <div key={index}>
                <span className={classes.helperText}>{`- ${elem?.name} `}</span>
                <br />
              </div>
            ))}
          </>
        )}
      </div>
    );
  };

  const handleImagePicker = (prop) => (event) => {
    var files = Array.from(event?.target?.files);
    // console.log({ files });
    const validFiles = validateImageFiles(files, listingUpdateInfo?.[prop]);
    setDiscarded({
      ...discarded,
      [`${prop}Count`]: validFiles?.discarded,
    });

    dispatch(
      setListingUpdateInfo({
        ...listingUpdateInfo,
        [prop]: listingUpdateInfo?.[prop]?.length
          ? [...listingUpdateInfo?.[prop], ...Array.from(validFiles?.filesToSave)]
          : Array.from(event?.target?.files),
      })
    );
  };
  const handleRemoveImage = (removeExisting) => (position) => {
    if (removeExisting) {
      setImageToDelete(listingToEdit?.[attribute][position]);
      setOpenConfirmModal(true);
    } else
      dispatch(
        setListingUpdateInfo({
          ...listingUpdateInfo,
          [attribute]: listingUpdateInfo?.[attribute]?.filter(
            (elem, index) => index !== position
          ),
        })
      );
  };
  const handleDeleteImage = () => {
    // console.log({ attribute, imageToDelete });
    dispatch(
      deletePropertyImage({
        id: imageToDelete?.id,
        token: loggedInObject?.token,
        property: listingToEdit?.id,
        subURL: attribute === "image" ? "images" : "floor-images",
        attribute,
      })
    );
    setOpenConfirmModal(false);
  };
  const renderHelperText = useMemo(() => {
    return getDiscardedImageHelperText(discarded?.[`${attribute}Count`]);
    // eslint-disable-next-line
  }, [discarded?.[`${attribute}Count`]]);

  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      {openConfirmModal && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title={`Are you sure you want to delete this Image?`}
          handleConfirm={handleDeleteImage}
        />
      )}
      <span
        className={classes.title}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        {label}
      </span>
      {allListingsApiInfo?.deletingImage ? (
        <Loader
          customContainerStyle={{ minHeight: "10vh" }}
          customImageStyle={{ height: 150, width: 150 }}
        />
      ) : (
        <Grid container columnSpacing={1} sx={{ transition: "0.5s" }}>
          {listingToEdit?.[attribute]?.map((elem, index) => (
            <Grid item xs={12} sm={4} md={3} lg={2} sx={gridSx} key={index}>
              <div style={{ position: "relative" }}>
                <img
                  src={`${baseUrl}/${elem?.[attribute]}`}
                  alt=""
                  className={classes.image}
                />
                <IconButton
                  sx={crossButton}
                  component="label"
                  onClick={() => handleRemoveImage(true)(index)}
                >
                  <CancelIcon
                    style={{ color: darkMode ? "#0ed864" : "#134696" }}
                  />
                </IconButton>
              </div>
            </Grid>
          ))}
          {listingUpdateInfo?.[attribute]?.map((elem, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2} sx={gridSx} key={index}>
              <div style={{ position: "relative" }}>
                <img
                  src={URL.createObjectURL(elem)}
                  alt=""
                  className={classes.image}
                />
                <IconButton
                  sx={crossButton}
                  component="label"
                  onClick={() => handleRemoveImage(false)(index)}
                >
                  <CancelIcon
                    style={{ color: darkMode ? "#0ed864" : "#134696" }}
                  />
                </IconButton>
              </div>
            </Grid>
          ))}
          <Grid item xs={12} sm={4} md={3} lg={2} sx={gridSx}>
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
                onInput={handleImagePicker(attribute)}
                multiple
              />
              <AddIcon style={{ color: darkMode ? "#0ed864" : "#134696" }} />
            </IconButton>
          </Grid>
        </Grid>
      )}
      {discarded?.[`${attribute}Count`]?.total > 0 && (
        <>{renderHelperText}</>
      )}
    </div>
  );
};

export default ImageEdit;
