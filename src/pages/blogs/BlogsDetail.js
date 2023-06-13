import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBlog,
  getBlogDetail,
  resetUpdateBlogApi,
  resetVisibilityApi,
  setBlogDetails,
  updateBlog,
} from "../../features/blogSlice";
import { baseUrl } from "../../components/constants/baseUrls";
import moment from "moment";
import { CircularProgress, Divider } from "@mui/material";
import parse from "html-react-parser";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Loader from "../../customComponents/Loader";
import Layout from "../../customComponents/layout/Layout";
import ProfileMenu from "../../customComponents/profileMenu/ProfileMenu";
import ConfirmModal from "../../components/miscellaneousComponents/ConfirmModal";
import { resetDeleteBlogApi } from "../../features/blogSlice";

const useStyles = makeStyles(() => ({
  topContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    width: "100%",
    position: "relative",
  },
  backContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 35,
  },
  category: {
    fontSize: "15px",
    color: "#0ED864",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  headingBlogDetail: {
    color: "#134696",
    fontSize: "35px",
    fontWeight: "bold",
    fontFamily: "unset",
  },
  csText: {
    fontSize: "12px",
  },
  csPostTitle: {
    marginTop: 10,
    display: "flex",
    color: "grey",
  },
  postOption: {
    fontSize: "12px",
    marginLeft: "1rem",
  },
  latestCards: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridGap: "20px",
  },

  "@media (max-width: 1500px)": {
    latestCards: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },
  "@media (max-width: 1200px)": {
    latestCards: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },
  btn: {
    backgroundColor: "#fff",
    color: "#014493",
    backgroundImage:
      "linear-gradient(90deg, #0ED864 50%, rgba(255,0,0,0) 100%)",
    border: "transparent",
    height: 40,
    width: 120,
    fontFamily: "medium",
    fontSize: 20,
    fontWeight: "bolder",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    marginTop: "0",
    top: 40,
    left: "25%",
    zIndex: 1000,
  },
  csPostOptionPanel: {
    borderBottom: "1px solid #c9c9c9",
    marginTop: "10px",
  },
  csBlogDetail: {
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    marginBottom: 10,
  },
  btnBack: {
    width: 100,
    height: 33,
    backgroundColor: "#014493",
    color: "#fff",
    fontFamily: "medium",
    fontSize: 12,
    border: "none",
    cursor: "pointer",
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  btnReadMore: {
    border: "none",
    color: "#134696",
    fontWeight: "bold",
    backgroundColor: "transparent",
  },
  blogIcons: {
    position: "absolute",
    color: "white",
    display: "flex",
    right: "15px",
    columnGap: "10px",
    top: "7px",
  },
  blog_cards: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  blog_image: {
    width: "100%",
    aspectRatio: "16/9",
  },
  blog_body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  titleText: {
    color: "#134696",
    fontSize: 27,
    margin: 0,
  },
}));

const BlogsDetail = () => {
  const classes = useStyles();
  const blogParams = useParams();
  let history = useHistory();

  const dispatch = useDispatch();
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const {
    blogDetail,
    selectedBlogApiInfo,
    updateBlogApiInfo,
    deleteBlogApiInfo,
    visibilityApiInfo,
  } = useSelector((state) => state.blog);

  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  useEffect(() => {
    if (blogParams?.id !== blogDetail?.id) {
      dispatch(getBlogDetail({ id: blogParams?.id }));
    }
    // eslint-disable-next-line
  }, [blogParams?.id]);

  const toggleView = () => {
    let formData = new FormData();
    formData.append("is_active", !blogDetail?.is_active);
    dispatch(
      updateBlog({
        edit: false,
        blogID: blogDetail?.id,
        authToken: loggedInObject?.token,
        values: formData,
      })
    );
  };

  useEffect(() => {
    if (updateBlogApiInfo?.toggleVisibility) {
      toast.success(
        updateBlogApiInfo?.response?.is_active
          ? "Blog is visible now."
          : "Blog is hidden now",
        {
          position: toast.POSITION.TOP_CENTER,
          progressStyle: { backgroundColor: "#014493" },
        }
      );
      dispatch(resetUpdateBlogApi());
    }
    // eslint-disable-next-line
  }, [updateBlogApiInfo]);

  useEffect(() => {
    if (visibilityApiInfo?.response) {
      toast.success(
        visibilityApiInfo?.response?.is_active
          ? "Blog is visible now."
          : "Blog is hidden now",
        {
          position: toast.POSITION.TOP_CENTER,
          progressStyle: { backgroundColor: "#014493" },
        }
      );
      dispatch(resetVisibilityApi());
    }
    // eslint-disable-next-line
  }, [visibilityApiInfo]);

  useEffect(() => {
    if (deleteBlogApiInfo?.response) {
      toast.success("Blog deleted successfully.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
      });
      if (deleteBlogApiInfo?.response?.opened) {
        dispatch(setBlogDetails(null));
        history.push("/blogs");
      }
      dispatch(resetDeleteBlogApi());
    }
    // eslint-disable-next-line
  }, [deleteBlogApiInfo?.response]);

  const removeBlog = () => {
    setOpenConfirmModal(false);
    dispatch(
      deleteBlog({
        authToken: loggedInObject?.token,
        blogID: blogDetail?.id,
        opened: true,
      })
    );
  };

  return (
    <Layout>
      {selectedBlogApiInfo?.loading || deleteBlogApiInfo?.loading ? (
        <Loader />
      ) : (
        <>
          {openConfirmModal && (
            <ConfirmModal
              open={openConfirmModal}
              setOpen={setOpenConfirmModal}
              title="Are you sure you want to delete this blog?"
              handleConfirm={removeBlog}
            />
          )}
          <div>
            <div className={classes.topContainer}>
              <img
                style={{ height: 375, width: "100%", objectFit: "cover" }}
                data-pagespeed-url-hash="2714250504"
                alt="post-feature-image"
                src={`${baseUrl}/${blogDetail?.feature_photo}`}
              />
              <div className={classes.backContainer}>
                <button
                  className={classes.btn}
                  onClick={() => history.goBack()}
                >
                  Back
                </button>
                <ProfileMenu />
              </div>
            </div>
            <div className="container">
              <div>
                <div className={classes?.category}>
                  {blogDetail?.category?.title}
                </div>
                <div className={classes.csBlogDetail}>
                  <div className={classes?.headingBlogDetail}>
                    {blogDetail?.title}
                  </div>
                  <div>
                    {updateBlogApiInfo?.loading ? (
                      <CircularProgress
                        size={35}
                        sx={{
                          color: "#134696",
                        }}
                      />
                    ) : blogDetail?.is_active ? (
                      <VisibilityOutlinedIcon
                        sx={{
                          fontSize: 40,
                          cursor: "pointer",
                          marginRight: "10px",
                          height: "55px",
                          width: "48px",
                        }}
                        onClick={toggleView}
                      />
                    ) : (
                      <VisibilityOffOutlinedIcon
                        sx={{
                          fontSize: 40,
                          cursor: "pointer",
                          marginRight: "10px",
                          height: "55px",
                          width: "48px",
                        }}
                        onClick={toggleView}
                      />
                    )}
                    <EditOutlinedIcon
                      sx={{
                        fontSize: 40,
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                    />
                    <CancelOutlinedIcon
                      sx={{ fontSize: 40, cursor: "pointer", color: "red" }}
                      onClick={() => setOpenConfirmModal(true)}
                    />
                  </div>
                </div>
                <Divider />
                <div className={classes.csPostTitle}>
                  <div>
                    <div className={classes.csText}>
                      {blogDetail?.author?.full_name}
                    </div>
                  </div>
                  <div className={classes.postOption}>
                    <span>
                      <i className="cs-color icon-calendar6"></i>
                      {moment(blogDetail?.updated_at).format("MMM DD, YYYY")}
                    </span>
                  </div>
                </div>

                <div className={classes.csPostOptionPanel}>
                  {blogDetail?.content ? parse(blogDetail?.content) : ""}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default BlogsDetail;
