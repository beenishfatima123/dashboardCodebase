import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { makeStyles, Modal, Backdrop, Fade } from "@material-ui/core";
import { baseUrl } from "../../constants/baseUrls";
import pdfIcon from "../../../assets/settings/pdficon.png";

const gridSx = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  flexWrap: "wrap",
  minHeight: 200,
  transition: "0.5s",
  gap: 2,
};

const useStyles = makeStyles(() => ({
  headings: {
    fontSize: 16,
    color: "#134696",
    fontFamily: "heavy",
  },
  image: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px",
    boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
    borderRadius: "10px",
    height: 165,
    width: 275,
    objectFit: "cover",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundcolor: "red",
    },
  },
}));

const VerificationDocuments = ({type}) => {
  const classes = useStyles();
  const darkMode = false;

  const { allRequests } = useSelector((state) => state.verifications);
  const userVerification = useSelector((state) => state.users.verificationDetail);
  const agencyVerification = useSelector((state) => state.agency.verificationDetail);
  const propertyVerification = useSelector((state) => state.listings.verificationDetail);

  const documentToShow = useMemo(() => {
    let verificationDetail;
    if (type === "user")
        verificationDetail = userVerification;
    else if (type === "agency")
        verificationDetail = agencyVerification;
    else if (type === "property")
      verificationDetail = propertyVerification;

    return allRequests?.result?.results?.filter(
      (elem) => elem?.id === verificationDetail?.verificationID
    );
  }, [userVerification, agencyVerification]);

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState("false");
  function openFile(fileName) {
    setFile(`https://api.zeerac.com/` + fileName);
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <p
        className={classes.headings}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        Attached Documents
      </p>
      <Grid item xs={12} sm={12} md={12} lg={12} sx={gridSx}>
        {documentToShow?.length > 0
          ? documentToShow[0]?.verification_files?.map((elem, index) => (
              <div key={`current${index}`} style={{ position: "relative" }}>
                <img
                  key={elem?.id}
                  src={
                    elem?.file.includes("pdf")
                      ? pdfIcon
                      : `${baseUrl}/${elem?.file}`
                  }
                  alt=""
                  className={classes.image}
                  onClick={(e) => openFile(elem?.file)}
                />
              </div>
            ))
          : null}
      </Grid>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open} timeout={500} sx={{ outline: "none" }}>
          {file?.includes("pdf") ? (
            <object
              data={file}
              type="application/pdf"
              width="90%"
              height="90%"
            ></object>
          ) : (
            <img src={file} style={{ maxHeight: "90%", maxWidth: "90%" }} />
          )}
        </Fade>
      </Modal>
    </>
  );
};

export default VerificationDocuments;
