import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router";
import { Formik, Form } from "formik";
import { Container, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncGetPropertyDetail,
  getPropertyDetailForUpdate,
  postAsyncUpdatePropertyDetail,
} from "../../features/store/property/propertySlice";
import { Col, Row, Card } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "./../constants/baseUrls";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Loader from '../../customComponents/Loader';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const useStyles = makeStyles(() => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "5% 10% 0% 10%",
  },
  fields: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
  },
  iconDiv: {
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
  },
  iconText: {
    fontSize: 14,
  },
  input: {
    height: 33,
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
  profileMain: {
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  profileImg: {
    margin: "auto",
    width: 150,
    height: 150,
    borderRadius: 35,
    border: "2px solid #014493",
    marginTop: 10,
    marginBottom: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  fileUpload: {
    position: "absolute",
    color: "#fff",
    backgroundColor: "#014493",
    borderRadius: "50%",
    cursor: "pointer",
    padding: 1,
  },
}));

const GalleryInfo = () => {
  // const loggedInObject = JSON.parse(localStorage.getItem("logged_in"));
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  let paramFromDetailListing = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const data = useSelector(getPropertyDetailForUpdate);
  let { isLoading } = useSelector((state) => state.properties);
  const lang = useSelector((state) => state.language);

  const [deletedIds, setDeletedIds] = React.useState([]);
  const [files, setFiles] = React.useState([]);

  const initialValues = {
    thumbnail: data?.thumbnail ? data?.thumbnail : '',
    image: data?.image ? data?.image : []
  };

  const getUpdateData = async (values) => {
    const listingId = paramFromDetailListing.id;
    values = {
      ...values,
    };
    const val = { authToken: loggedInObject?.token, listingId, values };
    try {
      await axios
        .put(
          `${baseUrl}/users/property/${paramFromDetailListing.id}/`,
          values,
          {
            headers: {
              Authorization: `token ${loggedInObject?.token}`,
            },
          }
        )
        .then((response) => {
          if (response?.data?.status) {
            toast.success(JSON.stringify("Feature details updated"), {
              position: toast.POSITION.BOTTOM_RIGHT,
              progressStyle: { backgroundColor: "#014493" },
            });
          } else {
            toast.error(JSON.stringify(response?.data?.message), {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return message;
    }
    dispatch(postAsyncUpdatePropertyDetail(val));
  };

  useEffect(() => {
    dispatch(fetchAsyncGetPropertyDetail(paramFromDetailListing.id));
  }, []);

  useEffect(() => {
    setFiles(data?.image);
    setNewFiles([]);
    setDeletedIds([]);
  }, [data]);

  const [thumbnail, setThumbnail] = React.useState(null);
  const handleImgUpload = (e) => {
    if (e.target.files[0]) {
      let file = e.currentTarget.files[0];
      setThumbnail(file);
    }
  };

  const [newFiles, setNewFiles] = React.useState([]);
  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray.map((file, index) => {
      return { id: index, file: file };
    });
    setNewFiles((previousImages) => previousImages.concat(imagesArray));
  };

  const [open, setOpen] = React.useState(false);
  const [selId, setSelId] = React.useState();
  const handleClickOpen = (id) => {
    setSelId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setSelId(null);
    setOpen(false);
  };

  const removeExistingImage = () => {
    setDeletedIds([...deletedIds, selId])
    const images = files.filter(file => Number(file.id) !== Number(selId));
    setFiles(images);
    setSelId(null);
    setOpen(false);
  }

  const removeNewImage = (id) => {
    const images = newFiles.filter(file => Number(file.id) !== Number(id));
    setNewFiles(images);
  }

  const deleteImages = () => {
    deletedIds?.forEach(async (imageId, i) => {
      try {
        await axios.delete(baseUrl + `/users/images/${imageId}`, {
          headers: { Authorization: `token ${loggedInObject?.token}` },
        });
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
      }
    });
    setDeletedIds([]);
  }

  const uploadNewImages = async () => {
    let imageData = new FormData();
    imageData.append("property", paramFromDetailListing.id);
    imageData.append("len", newFiles.length);
    newFiles?.forEach((item, i) => {
      imageData.append("file[" + i + "]", item.file);
    });
    const response = await axios.post(baseUrl + "/users/images/", imageData,
      {
        headers: {
          Authorization: `Token ${loggedInObject?.token}`,
        },
      }
    );
    if (response?.data?.count === 0) {
      toast.success(JSON.stringify("Listing image(s) uploaded successfully."), {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
      });
    }
    else if (response?.data?.count > 0) {
      toast.error(JSON.stringify(response?.data?.message), {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }

  if (isLoading === true) {
    return <Loader />;
  }

  return (
    <Container fullwidth="true">
      <div className={classes.paper}>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            // console.log("Values: ", values);
            if (thumbnail !== null) {
              let formData = new FormData();
              formData.append("thumbnail", thumbnail);
              const response = await axios.put(baseUrl + "/users/property/" + paramFromDetailListing.id + "/",
                formData,
                {
                  headers: {
                    Authorization: `Token ${loggedInObject?.token}`,
                  },
                }
              )
            }

            if (deletedIds.length > 0) {
              deleteImages();
            }
            if (newFiles.length > 0) {
              uploadNewImages();
            }
            return;
            getUpdateData(values);
          }}
        >
          {({ handleChange, handleBlur }) => (
            <Form>
              <Container>

                <Row>
                  <Col lg={6}>
                    <div className={classes.profileMain}>
                      <label>
                        Property Images:
                      </label>
                      <div className={classes.profileMain}>
                        <CloudUploadIcon
                          className={classes.profileImg}
                          sx={{ fontSize: 18 }}
                        />
                        <input
                          type="file"
                          id="image"
                          name="image"
                          multiple
                          accept="image/x-png,image/jpeg"
                          className="custom-file-input absolute-position"
                          onChange={handleChange}
                          onInput={onSelectFile}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      {files &&
                        files?.map((item, index) => {
                          return (
                            <div
                              key={index}
                              style={{
                                margin: "1rem 0.5rem",
                                position: "relative",
                                boxShadow:
                                  "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                              }}
                            >
                              <img
                                src={(`${baseUrl}/${item?.image}`)}
                                height="100"
                                width="100"
                                alt="upload"
                              />
                              <div className="close-button" onClick={() => handleClickOpen(item?.id)}>
                                <div></div>
                                <div></div>
                              </div>
                              <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                              >
                                <DialogTitle id="alert-dialog-title">
                                  {"Delete Listing's image"}
                                </DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description">
                                    This action will remove the image from listing. Are you sure to do this?
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleClose} autoFocus>No</Button>
                                  <Button onClick={removeExistingImage}>Yes</Button>
                                </DialogActions>
                              </Dialog>
                            </div>
                          );
                        })}
                    </div>
                    <div style={{ display: "flex" }}>
                      {newFiles &&
                        newFiles?.map((item, index) => {
                          return (
                            <div
                              key={index}
                              style={{
                                margin: "1rem 0.5rem",
                                position: "relative",
                                boxShadow:
                                  "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                              }}
                            >
                              <img
                                src={URL.createObjectURL(item?.file)}
                                height="100"
                                width="100"
                                alt="upload"
                              />
                              <div className="close-button" onClick={() => removeNewImage(item?.id)}>
                                <div></div>
                                <div></div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </Col>
                </Row>
              </Container>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Button variant="outlined" type="submit">
                  Update
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default GalleryInfo;
