import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../constants/baseUrls";
import { setAgencyUpdateInfo } from "../../../features/agencySlice";
import { Grid, IconButton, Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import { getSingleUnverifiedCompany } from "../../../features/store/verificationRequestsSlice";
import pdfIcon from "../../../assets/settings/pdficon.png";
import Loader from "../../../customComponents/Loader";
import { MAX_IMAGE_SIZE, MAX_FILE_NAME_LENGTH } from "../../constants/global";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
  const [imageToDelete, setImageToDelete] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selId, setSelId] = useState();

  const { agencyToEdit, agencyUpdateInfo } = useSelector(
    (state) => state.agency
  );
  const { companyRequestData, companyLoading, deleteVerificationFileApiInfo } =
    useSelector((state) => state.requests);

  const handleImagePicker = (prop) => (event) => {
    let intialCount = 0,
      count = 0;
    let currentVerificationFiles = companyRequestData?.results[0]
      ?.verification_files
      ? companyRequestData?.results[0]?.verification_files?.length
      : 0;

    if (agencyUpdateInfo?.verification_files?.length)
      intialCount = count =
        currentVerificationFiles -
        imageToDelete?.length +
        agencyUpdateInfo?.verification_files?.length;
    else intialCount = count = currentVerificationFiles - imageToDelete?.length;

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
      setAgencyUpdateInfo({
        ...agencyUpdateInfo,
        verificated_edited: true,
        [prop]: agencyUpdateInfo?.[prop]?.length
          ? [
            ...agencyUpdateInfo?.[prop],
            ...Array.from(files).slice(0, 5 - intialCount),
          ]
          : files,
      })
    );
  };

  const handleRemoveDocument = (removeExisting) => (position) => {
    if (removeExisting) {
      setSelId(
        companyRequestData?.results[0]?.["verification_files"][position]?.id
      );
      setOpenModal(true);
    } else {
      dispatch(
        setAgencyUpdateInfo({
          ...agencyUpdateInfo,
          verificated_edited: true,
          ["verification_files"]: agencyUpdateInfo?.[
            "verification_files"
          ]?.filter((elem, index) => index !== position),
        })
      );
    }
    setDiscarded({
      ...discarded,
      [`documentsCount`]: 0,
    });
  };
  const handleDeleteImage = () => {
    setImageToDelete([...imageToDelete, selId]);
    dispatch(
      setAgencyUpdateInfo({
        ...agencyUpdateInfo,
        verificated_edited: true,
        files_to_delete: [...imageToDelete, selId],
      })
    );
    setOpenModal(false);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    // dispatch(getSingleUnverifiedCompanyReset());
    dispatch(getSingleUnverifiedCompany(agencyToEdit?.id));
  }, []);

  useEffect(() => {
    if (companyRequestData && companyRequestData?.results?.length > 0) {
      dispatch(
        setAgencyUpdateInfo({
          ...agencyUpdateInfo,
          ["verification_id"]: companyRequestData?.results[0]?.id,
        })
      );
    }
  }, [companyRequestData]);



  return (
    <div className={classes.container}>
      <span className={classes.heading}>Add Agency's Document</span>
      <span className={classes.title}>
        Please attach all the agency's documents in order for the agency's
        verification and better security.
      </span>
      {companyLoading || deleteVerificationFileApiInfo?.deletingImage ? (
        <Loader />
      ) : (
        <Grid item xs={12} sm={4} md={3} lg={2} sx={gridSx}>
          {companyRequestData && companyRequestData?.results?.length > 0
            ? companyRequestData?.results[0]?.verification_files?.map(
              (elem, index) => (
                <div key={`current${index}`} style={{ position: "relative" }}>
                  <img
                    key={elem?.id}
                    src={
                      elem?.file.includes("png")
                        ? `${baseUrl}/${elem?.file}`
                        : pdfIcon
                    }
                    alt=""
                    className={classes.image}
                    style={{
                      opacity: imageToDelete?.includes(elem?.id)
                        ? "0.5"
                        : "1",
                    }}
                  />
                  {(agencyToEdit?.verification_status === "in_progress" ||
                    agencyToEdit?.verification_status === "not_applied") && (
                      <IconButton
                        sx={crossButton}
                        component="label"
                        onClick={() => handleRemoveDocument(true)(index)}
                      >
                        <CancelIcon
                          style={{ color: darkMode ? "#0ed864" : "#134696" }}
                        />
                      </IconButton>
                    )}
                </div>
              )
            )
            : null}
          {agencyUpdateInfo?.verification_files?.length > 0 &&
            agencyUpdateInfo?.verification_files?.map((elem, index) => (
              <div key={`new${index}`} style={{ position: "relative" }}>
                {elem?.type.includes("image") ? (
                  <img
                    key={index}
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
                  onClick={() => handleRemoveDocument(false)(index)}
                >
                  <CancelIcon
                    style={{ color: darkMode ? "#0ed864" : "#134696" }}
                  />
                </IconButton>
              </div>
            ))}
          {agencyToEdit?.verification_status === "in_progress" ||
            agencyToEdit?.verification_status === "not_applied" ? (
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
          ) : null}
          <Dialog
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Delete Image"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure to delete this image?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} autoFocus>
                No
              </Button>
              <Button onClick={handleDeleteImage}>Yes</Button>
            </DialogActions>
          </Dialog>
        </Grid>
      )}
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
