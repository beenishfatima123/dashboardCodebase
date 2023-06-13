import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextTranslation from "../constants/TextTranslation";
import { setAuctionForm } from "../../features/auctionSlice";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton } from "@mui/material";

let Schema = Yup.object().shape({
  image: Yup.mixed().required("Images Required"),
});

const useStyles = makeStyles(() => ({
  input: {
    height: 30,
    width: "100%",
    border: "1px solid #014493",
    borderRadius: 20,
    color: "#767676",
    fontFamily: "Poopins-SemiBold",
    fontSize: 11,
    paddingLeft: 10,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ebebeb",
    "&::placeholder": {
      color: "#767676",
      fontFamily: "Poopins-SemiBold",
      fontSize: 11,
    },
    "&:focus": {
      outline: "1px solid #014493",
    },
    "&::-webkit-file-upload-button": {
      border: "none",
      color: "#767676",
    },
  },
  error: {
    fontSize: 10,
    color: "red",
    marginTop: -7,
    marginLeft: 5,
    fontFamily: "Poopins-Regular",
  },
  gallerySectionLabel: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #014493",
    width: "auto",
    height: "10rem",
    cursor: "pointer",
    borderRadius: 20,
    color: "#767676",
    fontFamily: "Poopins-SemiBold",
    backgroundColor: "#ebebeb",
  },
  checkbox: {
    color: "#014493",
    fontFamily: "Poopins-SemiBold",
    fontSize: 12,
    display: "flex",
    alignItems: "center",
  },
  btn: {
    width: 150,
    height: 30,
    borderRadius: 20,
    border: "none",
    backgroundColor: "#014493",
    color: "#fff",
    fontFamily: "Poopins-SemiBold",
    fontSize: 12,
    cursor: "pointer",
  },
}));

const AuctionImages = ({ setNextTab }) => {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const [tosAccepted, setTosAccepted] = useState(true);

  const dispatch = useDispatch();
  const auctionForm = useSelector((state) => state.auctions.auctionForm);
  const lang = useSelector((state) => state.language);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray.map((file, index) => {
      return {id: files?.length ? files?.length+1 : index, file: file};
    });
    if (files !== undefined)
      setFiles((previousImages) => previousImages?.concat(imagesArray));
    else
      setFiles(imagesArray);
  };

  const removeNewImage = (id) => {
    const images = files.filter(file => Number(file.id) !== Number(id));
    setFiles(images);
  }

  const handleNextStep = () => {
    if (tosAccepted) {
      dispatch(
        setAuctionForm({
          ...auctionForm,
          images: files,
        })
      );
      setNextTab((currentTab) => currentTab + 1);
    } else {
      toast.warn("You must accept the terms of service", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  const initialValues = {
    image: files,
  };
  const customLabel = {
    margin: "5px 0 0 0",
    color: "#014493",
    display: "flex",
    flexDirection: lang.langIndex === 2 ? "row-reverse" : "row",
  };

  useEffect(() => {
    setFiles(auctionForm?.images);
  }, [])
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Schema}
      onSubmit={handleNextStep}
    >
      {({ handleChange, handleBlur, errors, touched, isValid }) => (
        <Form>
          <Container>
            <Row>
              <Col lg={12}>
                <label style={customLabel}>
                  {TextTranslation.propertyGallery[lang.langIndex]}
                </label>
                <div>
                  <label className={classes.gallerySectionLabel}>
                    <CloudUploadIcon
                      fontSize="large"
                      style={{ color: "#767676" }}
                    />
                    + {TextTranslation.addImages[lang.langIndex]}
                    <br />
                    <span>{TextTranslation.upTo[lang.langIndex]} 5</span>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      name="image"
                      multiple
                      accept="image/png , image/jpeg, image/webp"
                      onChange={handleChange}
                      onInput={onSelectFile}
                      onBlur={handleBlur}
                    />
                    {errors.image && touched.image ? (
                      <div className={classes.error}>{errors.image}</div>
                    ) : null}
                  </label>
                  <div style={{ display: "flex" }}>
                    {files &&
                      files.map((image, index) => {
                        return (
                          <div
                            key={index}
                            style={{
                              margin: "1rem 0.5rem",
                              position: "relative",
                              boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                            }}
                          >
                            <img
                              src={URL.createObjectURL(image?.file)}
                              height="100"
                              width="100"
                              alt="upload"
                            />
                            <IconButton
                              sx={{ position: "absolute", top: -5, right: -5, p: 0 }}
                              onClick={ () => removeNewImage(image?.id) }
                            >
                              <CancelIcon fontSize="small" style={{ color: "#014493" }} />
                            </IconButton>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className={classes.checkbox} style={customLabel}>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="termsAndConditions"
                      name="terms"
                      checked={tosAccepted}
                      onChange={() => setTosAccepted(!tosAccepted)}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="termsAndConditions"
                    >
                      &nbsp;&nbsp;
                      {TextTranslation.termsAndConditions[lang.langIndex]}
                    </label>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="justify-content-around">
              <button
                className={classes.btn}
                onClick={() => setNextTab((prev) => prev - 1)}
              >
                {TextTranslation.goBack[lang.langIndex]}
              </button>
              <button className={classes.btn} type="submit" disabled={!isValid}>
                {TextTranslation.saveAndProceed[lang.langIndex]}
              </button>
            </Row>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default AuctionImages;
