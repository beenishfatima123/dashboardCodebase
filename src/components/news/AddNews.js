import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Box, Button, Typography, TextField, Switch } from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import {
  createNews,
  newsCategories,
  resetCreateNewsApi,
} from "../../features/newsSlice";
import Layout from "../../customComponents/layout/Layout";
import Loader from "../../customComponents/Loader";

const AddNews = () => {
  const loggedInObject = useSelector((state) => state.auth.currentUser);

  let history = useHistory();
  const dispatch = useDispatch();

  const [img, setImage] = useState("");
  const [rawHtml, setRawHtml] = useState("");

  const newsState = useSelector((state) => state.news);
  const { isLoading, categoriesData, createNewsApiInfo } = newsState;

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    return convertToRaw(editorState.getCurrentContent());
  };

  const initialValues = {
    categoryID: "DEFAULT",
    title: "",
    description: "",
    content: "",
    feature_photo: "",
    status: false,
    author: "",
  };

  const handleImgUpload = (e) => {
    if (e.currentTarget.files[0]) {
      let file = e.currentTarget.files[0];
      setImage(file);
    }
  };

  useEffect(async () => {
    dispatch(newsCategories({ authToken: loggedInObject.token }));
  }, []);

  useEffect(async () => {}, [categoriesData?.result?.results?.length]);

  useEffect(() => {
    if (createNewsApiInfo?.response) {
      toast.success("News added successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
      });
      history.push("/news");
      dispatch(resetCreateNewsApi());
    }
    // eslint-disable-next-line
  }, [createNewsApiInfo?.response]);

  return (
    <Layout>
      {isLoading || createNewsApiInfo.loading ? (
        <Loader />
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            if (values?.categoryID === "DEFAULT") {
              toast.error("Category field is required", {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
              return;
            }
            let formData = new FormData();
            formData.append("category", parseInt(values?.categoryID));
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("content", rawHtml);
            formData.append("feature_photo", img ? img : null);
            formData.append("status", values?.status);
            formData.append("author", loggedInObject?.id);

            dispatch(
              createNews({
                data: formData,
                authToken: loggedInObject?.token,
              })
            );
          }}
        >
          {({ handleChange, handleBlur, values, isValid }) => (
            <Form>
              <Box
                marginTop="20px"
                display="flex"
                justifyContent="center"
                alignItems="flex-start"
                gap="20px"
                padding={"20px"}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  gap="10px"
                  width="60%"
                >
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    borderColor="grey"
                    gap="10px"
                    justifyContent="flex-start"
                  >
                    <TextField
                      name="categoryID"
                      select
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      SelectProps={{ native: true }}
                      value={values?.categoryID}
                      variant="outlined"
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
                    </TextField>
                    <Button size="small" color="primary" variant="contained">
                      Add Category
                    </Button>
                  </Box>
                  <TextField
                    fullWidth
                    size="small"
                    label="Title"
                    name="title"
                    type="text"
                    variant="outlined"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    label="Description"
                    name="description"
                    type="text"
                    variant="outlined"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <Box
                    alignItems={"center"}
                    border={1}
                    borderColor="grey"
                    minHeight="300px"
                  >
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
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap="10px"
                  border={1}
                  borderColor="grey"
                  padding="10px"
                >
                  <Typography variant="h5" gutterBottom>
                    Publish
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    Status:
                    <Switch
                      name="status"
                      checked={values?.status}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </Typography>
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    borderColor="grey"
                  >
                    <Typography variant="subtitle2" gutterBottom>
                      Feature Photo:
                    </Typography>
                    <Button
                      variant="contained"
                      component="label"
                      sx={{ marginLeft: "20px" }}
                    >
                      Upload
                      <input
                        hidden
                        accept="image/x-png,image/jpeg"
                        type="file"
                        onChange={(e) => {
                          handleImgUpload(e);
                        }}
                      />
                    </Button>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    borderColor="grey"
                  >
                    {img === "" ? (
                      <InsertPhotoIcon
                        sx={{
                          width: "250px",
                          height: "250px",
                          fontSize: 50,
                          color: "#014493",
                        }}
                      />
                    ) : (
                      <img
                        style={{
                          margin: "auto",
                          width: "250px",
                          height: "250px",
                        }}
                        src={
                          img === "" ? (
                            <InsertPhotoIcon />
                          ) : (
                            URL.createObjectURL(img)
                          )
                        }
                        alt={img ? "profile-image" : null}
                      />
                    )}
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                  >
                    <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      disabled={!isValid}
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      )}
    </Layout>
  );
};

export default AddNews;
