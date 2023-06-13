import * as Yup from "yup";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { Col, Container, Row } from "react-bootstrap";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import Layout from "../../customComponents/layout/Layout";
import Loader from "../../customComponents/Loader";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { getBlogDetail } from "../../features/blogSlice";
import { baseUrl } from "../constants/baseUrls";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import {
  blogsCategories,
  updateBlog,
  resetUpdateBlogApi,
} from "../../features/blogSlice";

const useStyles = makeStyles(() => ({
  main: {
    border: "2px solid #014493",
    padding: 20,
    borderRadius: 20,
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

const EditBlog = () => {
  const blogParam = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  let history = useHistory();

  const lang = useSelector((state) => state.language);
  const { dataDetail, isLoading, categoriesData, updateBlogApiInfo } =
    useSelector((state) => state.blog);

  const loggedInObject = useSelector((state) => state.auth.currentUser);

  const [imgSrc, setImageSrc] = useState(null);
  const [imgFile, setImageFile] = useState(null);
  const [rawHtml, setRawHtml] = useState("");

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

  const handleImgUpload = (e) => {
    if (e.currentTarget.files[0]) {
      let file = e.currentTarget.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImageFile(file);
          setImageSrc(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  let Schema = Yup.object().shape({
    title: Yup.string(),
  });

  useEffect(() => {
    dispatch(blogsCategories({ authToken: loggedInObject.token }));
    dispatch(getBlogDetail(blogParam?.id)).then((res) => {
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
    if (updateBlogApiInfo?.response) {
      // const contentBlock = htmlToDraft(
      //   dataDetail?.result?.content ? dataDetail?.result?.content : ""
      // );
      // if (contentBlock) {
      //   const contentState = ContentState.createFromBlockArray(
      //     contentBlock.contentBlocks
      //   );
      //   const editorState = EditorState.createWithContent(contentState);
      //   setEditorState(editorState);
      // }
      toast.success("Post updated successfully.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetUpdateBlogApi());
      history.push(`/blog-detail/${blogParam?.id}`);
    }
    // eslint-disable-next-line
  }, [updateBlogApiInfo?.response]);

  const initialValue = {
    title: dataDetail?.result?.title ? dataDetail?.result?.title : "",
    tags: dataDetail?.result?.tags ? dataDetail?.result?.tags : "",
    category: dataDetail?.result?.category?.id
      ? dataDetail?.result?.category?.id
      : "",
    references: dataDetail?.result?.references
      ? dataDetail?.result?.references
      : "",
    description: dataDetail?.result?.description
      ? dataDetail?.result?.description
      : "",
    blog_photo: dataDetail?.result?.blog_photo
      ? dataDetail?.result?.blog_photo
      : "",
    content: dataDetail?.result?.content ? dataDetail?.result?.content : "",
    author: "",
  };

  if (isLoading || updateBlogApiInfo?.loading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout>
      <>
        <Formik
          initialValues={initialValue}
          enableReinitialize={true}
          validationSchema={Schema}
          onSubmit={async (values) => {
            let formData = new FormData();
            formData.append(
              "title",
              values.title ? values.title : initialValue?.title
            );
            formData.append(
              "description",
              values.description
                ? values.description
                : initialValue?.description
            );
            formData.append(
              "references",
              values.references ? values.references : initialValue?.references
            );
            formData.append(
              "tags",
              values.tags ? values.tags : initialValue.tags
            );
            formData.append(
              "category",
              values.category
                ? parseInt(values.category)
                : initialValue.category
            );
            imgFile && formData.append("feature_photo", imgFile);
            formData.append(
              "content",
              rawHtml !== "" ? rawHtml : initialValue?.content
            );
            dispatch(
              updateBlog({
                id: blogParam?.id,
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
                      {dataDetail?.result?.blog_photo === "" ? (
                        <InsertPhotoIcon
                          sx={{ fontSize: 50, color: "#014493" }}
                        />
                      ) : (
                        <img
                          className={classes.profileImg}
                          src={
                            imgSrc === null
                              ? `${baseUrl}/${dataDetail?.result?.feature_photo}`
                              : imgSrc
                          }
                          alt={imgSrc ? "blog-photo" : null}
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
                    <Col
                      xs={6}
                      sm={6}
                      md={4}
                      lg={12}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "5px",
                      }}
                    >
                      <span style={customInputStyle}>Title: </span>
                      <input
                        className={classes.input}
                        style={customInputStyle}
                        name="title"
                        defaultValue={dataDetail?.result?.title}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                      {errors.first_name && touched.first_name ? (
                        <div style={customErrorStyle}>{errors.first_name}</div>
                      ) : null}
                    </Col>
                    <Col
                      xs={6}
                      sm={6}
                      md={4}
                      lg={12}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "5px",
                      }}
                    >
                      <span style={customInputStyle}>Category: </span>
                      <select
                        name="category"
                        defaultValue={dataDetail?.result?.category?.id}
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

                      <span style={customInputStyle}>&nbsp;&nbsp;Tags: </span>
                      <input
                        placeholder="Tags"
                        className={classes.input}
                        style={customInputStyle}
                        name="tags"
                        defaultValue={dataDetail?.result?.tags}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                      {errors.last_name && touched.last_name ? (
                        <div style={customErrorStyle}>{errors.last_name}</div>
                      ) : null}
                    </Col>
                    <Col
                      xs={6}
                      sm={6}
                      md={4}
                      lg={12}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "5px",
                      }}
                    >
                      <span style={customInputStyle}>References: </span>
                      <input
                        placeholder="References"
                        className={classes.input}
                        style={customInputStyle}
                        name="references"
                        defaultValue={dataDetail?.result?.references}
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
                      <span style={{ marginLeft: "-5px" }}>Description: </span>
                      <textarea
                        placeholder="Description"
                        className={classes.textarea}
                        style={customInputStyle}
                        name="description"
                        defaultValue={dataDetail?.result?.description}
                        rows={3}
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
                      <span style={{ marginLeft: "-5px" }}>Content: </span>
                      <div className={classes.textarea}>
                        <Editor
                          editorState={editorState}
                          toolbarClassName="blog-editor-toolbar-class"
                          onEditorStateChange={(editorState) => {
                            onEditorStateChange(editorState);
                            setRawHtml(
                              draftToHtml(
                                convertToRaw(editorState.getCurrentContent())
                              )
                            );
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <button
                      type="button"
                      className={classes.btn}
                      onClick={() => history.goBack()}
                    >
                      Cancel
                    </button>
                    <button type="submit" className={classes.btn}>
                      SAVE
                    </button>
                  </Row>
                </div>
              </Container>
            </Form>
          )}
        </Formik>
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </>
    </Layout>
  );
};

export default EditBlog;
