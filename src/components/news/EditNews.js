import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import Layout from "../../customComponents/layout/Layout";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import {
  newsCategories,
  updateNews,
  resetUpdateNewsApi,
  getNewsDetail,
} from "../../features/newsSlice";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import {
  Box,
  Button,
  Typography,
  TextField,
  Switch,
  MenuItem,
} from "@mui/material";
import Loader from "../../customComponents/Loader";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { baseUrl } from "../constants/baseUrls";

const EditNews = () => {
  const loggedInObject = useSelector((state) => state.auth.currentUser);

  const newsParam = useParams();
  console.log(newsParam?.id)
  const dispatch = useDispatch();
  let history = useHistory();

  const { dataDetail, selectedNewsApiInfo, categoriesData, updateNewsApiInfo } =
    useSelector((state) => state.news);

  const [imgFile, setImageFile] = useState(null);
  const [rawHtml, setRawHtml] = useState("");

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    return convertToRaw(editorState.getCurrentContent());
  };

  const initialValue = {
    categoryID: dataDetail?.result?.category?.id
      ? dataDetail?.result?.category?.id
      : "DEFAULT",
    title: dataDetail?.result?.title ? dataDetail?.result?.title : "",
    description: dataDetail?.result?.description
      ? dataDetail?.result?.description
      : "",
    feature_photo: dataDetail?.result?.feature_photo
      ? dataDetail?.result?.feature_photo
      : "",
    content: dataDetail?.result?.content ? dataDetail?.result?.content : "",
    status: dataDetail?.result?.status,
    author: dataDetail?.result?.author?.id
      ? dataDetail?.result?.author?.id
      : "",
  };

  const handleImgUpload = (e) => {
    if (e.currentTarget.files[0]) {
      let file = e.currentTarget.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImageFile(file);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(async () => {
    dispatch(newsCategories({ authToken: loggedInObject.token }));
    dispatch(getNewsDetail(newsParam?.id)).then((res) => {
      const contentBlock = htmlToDraft(
        res?.payload?.result?.content ? res?.payload?.result?.content : ""
      );
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
      }
    });
  }, []);

  useEffect(() => {
    if (updateNewsApiInfo?.response) {
      toast.success("News updated successfully.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetUpdateNewsApi());
      history.push(`/news-detail/${newsParam?.id}`);
    }
    // eslint-disable-next-line
  }, [updateNewsApiInfo?.response]);

  if (selectedNewsApiInfo?.loading || updateNewsApiInfo?.loading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout>
      <Formik
        initialValues={initialValue}
        enableReinitialize={true}
        onSubmit={async (values) => {
          let formData = new FormData();
          formData.append(
            "category",
            values.categoryID
              ? parseInt(values.categoryID)
              : initialValue.category
          );
          formData.append(
            "title",
            values.title ? values.title : initialValue?.title
          );
          formData.append(
            "description",
            values.description ? values.description : initialValue?.description
          );
          imgFile && formData.append("feature_photo", imgFile);
          formData.append(
            "content",
            rawHtml !== "" ? rawHtml : initialValue?.content
          );
          formData.append("status", values?.status);

          dispatch(
            updateNews({
              edit: true,
              newsID: newsParam?.id,
              values: formData,
              authToken: loggedInObject?.token,
            })
          );
        }}
      >
        {({ handleChange, isValid, values }) => (
          <Form>
            <Box
              marginTop="20px"
              display="flex"
              justifyContent="center"
              alignItems="flex-start"
              gap="20px"
              padding={"20px"}
            >
              <Box display="flex" flexDirection="column" gap="10px" width="60%">
                <TextField
                  id="categoryID"
                  select
                  label="Select"
                  defaultValue={values?.categoryID}
                  helperText="Please select your category"
                >
                  <MenuItem key="DEFAULT" value="DEFAULT" disabled>
                    Select Category
                  </MenuItem>
                  {categoriesData?.result?.results?.map((item, index) => (
                    <MenuItem key={index} value={item?.id}>
                      {item?.title}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  size="small"
                  label="Title"
                  name="title"
                  type="text"
                  variant="outlined"
                  defaultValue={dataDetail?.result?.title}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <TextField
                  fullWidth
                  size="small"
                  label="Descrition"
                  name="description"
                  type="text"
                  variant="outlined"
                  defaultValue={dataDetail?.result?.description}
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
                    Thumbnail:
                  </Typography>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ marginLeft: "20px" }}
                  >
                    Upload Thumbnail
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
                  {imgFile === null &&
                    (dataDetail?.result?.feature_photo === "" ||
                      dataDetail?.result?.feature_photo === null) ? (
                    <InsertPhotoIcon sx={{ fontSize: 50, color: "#014493" }} />
                  ) : (
                    <img
                      style={{
                        margin: "auto",
                        width: "250px",
                        height: "250px",
                      }}
                      src={
                        imgFile === null
                          ? `${baseUrl}/${dataDetail?.result?.feature_photo}`
                          : URL.createObjectURL(imgFile)
                      }
                      alt={imgFile ? "profile-image" : null}
                    />
                  )}
                </Box>
                <Box display="flex" flexDirection="row" justifyContent="center">
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
    </Layout>
  );
};

export default EditNews;
