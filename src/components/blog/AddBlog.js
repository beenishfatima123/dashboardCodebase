import * as Yup from "yup";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState, useMemo } from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { Col, Container, Row } from "react-bootstrap";
import TextTranslation from "../constants/TextTranslation";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import Layout from "../../customComponents/layout/Layout";
import Loader from "../../customComponents/Loader";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import {
  blogsCategories,
  createCategory,
  createBlog,
  resetCreateBlogApi,
  resetCreateCategoryApi,
} from "../../features/blogSlice";
import {
  Button,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const useStyles = makeStyles(() => ({
  main: {
    border: "2px solid #014493",
    padding: 20,
    borderRadius: 10,
    marginTop: "10%",
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
    width: "100%",
    height: 300,
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
    marginTop: 30,
    marginLeft: 35,
    color: "#fff",
    backgroundColor: "#014493",
    borderRadius: "50%",
    cursor: "pointer",
    padding: 1,
  },
  textarea: {
    width: "100%",
    border: "2px solid #014493",
    borderRadius: 5,
    color: "#767676",
    fontFamily: "Poopins-SemiBold",
    fontSize: 11,
    paddingLeft: 10,
    display: "flex",
    margin: "5px 0",
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
  },
  input: {
    height: 33,
    width: "100%",
    border: "2px solid #014493",
    borderRadius: 5,
    color: "#767676",
    fontFamily: "Poopins-SemiBold",
    fontSize: 11,
    paddingLeft: 10,
    display: "flex",
    margin: "5px 0",
    alignItems: "center",
    backgroundColor: "#ebebeb",
    textTransform: "capitalize",
    "&::placeholder": {
      color: "#767676",
      fontFamily: "Poopins-SemiBold",
      fontSize: 11,
    },
    "&:focus": {
      outline: "1px solid #014493",
    },
  },
  btn: {
    width: 141,
    height: 33,
    backgroundColor: "#014493",
    color: "#fff",
    fontFamily: "Poopins-SemiBold",
    fontSize: 12,
    border: "none",
    cursor: "pointer",
    borderRadius: 20,
    marginTop: 10,
  },
  btnNew: {
    height: 33,
    backgroundColor: "#014493",
    color: "#fff",
    fontFamily: "Poopins-SemiBold",
    fontSize: 12,
    border: "none",
    cursor: "pointer",
    borderRadius: 10,
    marginTop: 5,
    padding: 2,
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 310,
    backgroundColor: "#fff",
    border: "1px solid #fff",
    boxShadow: 24,
    padding: 10,
    borderRadius: 20,
  },
}));

const AddBlog = () => {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  const loggedInObject = useSelector((state) => state.auth.currentUser);

  const blogsState = useSelector((state) => state.blog);
  const { categoriesData, createCategoryApiInfo, createBlogApiInfo } =
    blogsState;

  const [img, setImage] = useState("");
  const [rawHtml, setRawHtml] = useState("");
  const lang = useSelector((state) => state.language);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    return convertToRaw(editorState.getCurrentContent());
  };

  const customInputStyle = {
    textAlign: lang.langIndex === 2 ? "right" : "left",
    paddingRight: 10,
  };

  const customErrorStyle = {
    textAlign: lang.langIndex === 2 ? "right" : "left",
    marginRight: 5,
    fontSize: 10,
    color: "red",
    marginLeft: 5,
    fontFamily: "Poopins-Regular",
  };

  const initialValues = {
    title: "",
    tags: "",
    references: "",
    description: "",
    feature_photo: "",
    author: "",
    content: "",
  };

  const handleImgUpload = (e) => {
    if (e.currentTarget.files[0]) {
      let file = e.currentTarget.files[0];
      setImage(file);
    }
  };
  let Schema = Yup.object().shape({
    title: Yup.string().required(
      TextTranslation.usernameRequired[lang.langIndex]
    ),
  });

  useEffect(async () => {
    dispatch(blogsCategories({ authToken: loggedInObject.token }));
  }, []);

  useEffect(async () => {}, [categoriesData?.result?.results?.length]);

  useEffect(() => {
    if (createBlogApiInfo?.response) {
      toast.success("Blog post added successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
      });
      history.push("/blogs");
      dispatch(resetCreateBlogApi());
    }
    // eslint-disable-next-line
  }, [createBlogApiInfo?.response]);

  useEffect(() => {
    if (createCategoryApiInfo?.response) {
      toast.success("New category added successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(blogsCategories({ authToken: loggedInObject.token }));
      dispatch(resetCreateCategoryApi());
    }
    // eslint-disable-next-line
  }, [createCategoryApiInfo?.response]);

  const [exist, setExist] = useState(false);
  const [catName, setCatName] = useState("");
  const inputSearch = (e) => {
    setExist(false);
    setCatName(e?.target?.value);
    for (const i in categoriesData?.result?.results) {
      if (categoriesData?.result?.results[i].title === e.target.value) {
        setExist(true);
      }
    }
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setCatName("");
    setExist(false);
    setOpen(true);
  };
  const handleClose = () => {
    setCatName("");
    setOpen(false);
    setExist(false);
  };
  const handleSave = (e) => {
    setExist(false);
    setOpen(false);

    let catFormData = new FormData();
    catFormData.append("title", catName);

    dispatch(
      createCategory({
        data: catFormData,
        authToken: loggedInObject?.token,
      })
    );
  };

  return (
    <Layout>
      {createBlogApiInfo.loading ? (
        <Loader />
      ) : (
        <>
          <Formik
            initialValues={initialValues}
            validationSchema={Schema}
            onSubmit={async (values) => {
              let formData = new FormData();
              formData.append("author", loggedInObject?.id);
              formData.append("category", parseInt(values?.categoryID));
              formData.append("title", values.title);
              formData.append("description", values.description);
              formData.append("content", rawHtml);
              formData.append("tags", values.tags);
              formData.append("references", values.references);
              formData.append("feature_photo", img ? img : null);

              dispatch(
                createBlog({
                  data: formData,
                  authToken: loggedInObject?.token,
                })
              );
            }}
          >
            {({ errors, handleChange, touched, handleBlur, isValid }) => (
              <Form>
                <Container>
                  <div className={classes.main}>
                    <Row className="justify-content-center">
                      <div className={classes.profileMain}>
                        {img === "" ? (
                          <InsertPhotoIcon
                            sx={{ fontSize: 50, color: "#014493" }}
                          />
                        ) : (
                          <img
                            className={classes.profileImg}
                            src={URL.createObjectURL(img)}
                            alt={img ? "profile-image" : null}
                          />
                        )}

                        <FileUploadOutlinedIcon
                          className={classes.fileUpload}
                          sx={{ fontSize: 18 }}
                        />
                        <input
                          type="file"
                          id="photo"
                          name="photo"
                          accept="image/x-png,image/jpeg"
                          className="custom-file-input absolute-position"
                          onChange={(e) => {
                            handleImgUpload(e);
                          }}
                        />
                      </div>
                    </Row>
                    <Row
                      className="justify-content-center"
                      style={{
                        display: "flex",
                        flexDirection:
                          lang.langIndex === 2 ? "row-reverse" : "row",
                      }}
                    >
                      <Col xs={6} sm={6} md={4} lg={12}>
                        <input
                          placeholder="Title"
                          className={classes.input}
                          style={customInputStyle}
                          name="title"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                        {errors.first_name && touched.first_name ? (
                          <div style={customErrorStyle}>
                            {errors.first_name}
                          </div>
                        ) : null}
                      </Col>

                      <Col xs={6} sm={6} md={6} lg={5}>
                        <select
                          name="categoryID"
                          defaultValue={"DEFAULT"}
                          className={classes.input}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        >
                          <option value="DEFAULT" disabled>
                            Blog Category *
                          </option>
                          {categoriesData?.result?.results?.map(
                            (catItem, index) => (
                              <option value={catItem?.id} key={index}>
                                {catItem?.title}
                              </option>
                            )
                          )}
                        </select>
                      </Col>
                      <Col xs={6} sm={6} md={6} lg={1}>
                        <button
                          type="button"
                          className={classes.btnNew}
                          onClick={handleClickOpen}
                        >
                          Add Category
                        </button>
                      </Col>
                      <Col xs={6} sm={6} md={6} lg={6}>
                        <input
                          placeholder="Tags"
                          className={classes.input}
                          style={customInputStyle}
                          name="tags"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                        {errors.last_name && touched.last_name ? (
                          <div style={customErrorStyle}>{errors.last_name}</div>
                        ) : null}
                      </Col>
                      <Col xs={6} sm={6} md={4} lg={12}>
                        <input
                          placeholder="References"
                          className={classes.input}
                          style={customInputStyle}
                          name="references"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                        {errors.last_name && touched.last_name ? (
                          <div style={customErrorStyle}>{errors.last_name}</div>
                        ) : null}
                      </Col>
                      <Col xs={6} sm={6} md={4} lg={12}>
                        <textarea
                          placeholder="Description"
                          className={classes.textarea}
                          style={customInputStyle}
                          name="description"
                          rows={6}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                        {errors.last_name && touched.last_name ? (
                          <div style={customErrorStyle}>{errors.last_name}</div>
                        ) : null}
                      </Col>
                      <Col>
                        <div className="editor">
                          <Editor
                            editorState={editorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            onEditorStateChange={(editorState) => {
                              onEditorStateChange(editorState);
                              setRawHtml(
                                draftToHtml(
                                  convertToRaw(editorState.getCurrentContent())
                                )
                              );
                            }}
                          />
                          {/* {console.log(
                          "editorState => ",
                          convertToRaw(editorState.getCurrentContent())
                        )} */}
                        </div>
                      </Col>
                    </Row>
                    <Row className="justify-content-center">
                      <button
                        type="submit"
                        className={classes.btn}
                        disabled={!isValid}
                      >
                        SAVE
                      </button>
                    </Row>
                  </div>
                </Container>
              </Form>
            )}
          </Formik>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogContent>
              <DialogContentText>Enter the name of category:</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Category name"
                type="text"
                fullWidth
                variant="standard"
                onInput={(e) => inputSearch(e)}
              />
              {exist && (
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  sx={{ color: "red" }}
                >
                  Name already exist.
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button disabled={exist || catName === ""} onClick={handleSave}>
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Layout>
  );
};

export default AddBlog;
