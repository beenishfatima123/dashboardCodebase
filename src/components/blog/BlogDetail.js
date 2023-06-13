import React, { useEffect } from "react";
import Layout from "../../customComponents/layout/Layout";
import { useHistory, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { blogDetail } from "../../features/blogSlice";
import { baseUrl } from "../constants/baseUrls";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@mui/styles";
import Loader from "../../customComponents/Loader";
import { Avatar, Divider } from "@mui/material";
import { DEFAULT_AVATAR } from "../constants/global";

const useStyles = makeStyles(() => ({
  btn: {
    backgroundColor: "#fff",
    color: "#014493",
    border: "5px solid #014493",
    height: 60,
    width: 60,
    borderRadius: "50%",
    fontFamily: "Poopins-Regular",
    fontSize: 11,
    fontWeight: "bolder",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    marginTop: "0",
    top: 70,
    right: 20,
    position: "fixed",
  },
  btnBack: {
    width: 100,
    height: 33,
    backgroundColor: "#014493",
    color: "#fff",
    fontFamily: "Poopins-SemiBold",
    fontSize: 12,
    border: "none",
    cursor: "pointer",
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
  },
}));

const BlogDetail = () => {
  const classes = useStyles();
  const blogParams = useParams();
  let history = useHistory();

  const dispatch = useDispatch();
  const { dataDetail, isLoading } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(blogDetail(blogParams.id));
  }, []);

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Link to={`/edit-blog/${blogParams.id}`}>
            <button className={classes.btn}>
              Edit Blog <EditIcon fontSize="sm" />
            </button>
          </Link>
          <div>
            <div className="container">
              <div className="heading-blog-detail">
                {dataDetail?.result?.title}
              </div>
              <div className="cs-blog-detail">
                <div className="cs-main-post">
                  <figure>
                    <img
                      style={{ height: 375, width: "100%", objectFit: "cover" }}
                      data-pagespeed-url-hash="2714250504"
                      alt="post-feature-image"
                      src={`${baseUrl}/${dataDetail?.result?.feature_photo}`}
                    />
                  </figure>
                </div>
                <div className="cs-post-title">
                  <div className="cs-author">
                    <figure>
                      <img
                        width="32"
                        height="32"
                        data-pagespeed-url-hash="1229941675"
                        className="avatar avatar-32 photo"
                        src={
                          dataDetail?.result?.author?.photo !== null
                            ? `${baseUrl}/${dataDetail?.result?.author?.photo}`
                            : DEFAULT_AVATAR
                        }
                        alt="author-profile-image"
                      />
                    </figure>
                    <div className="cs-text" style={{ marginLeft: "20px" }}>
                      {dataDetail?.result?.author?.username}
                    </div>
                  </div>
                  <div className="post-option">
                    <span className="post-date">
                      Updated:
                      {/* <a href="https://dev.zeerac.com/blogs"> */}
                      <i className="cs-color icon-calendar6"></i>
                      {moment(dataDetail?.result?.updated_at).format(
                        "MMM DD, YYYY"
                      )}
                      {/* </a> */}
                    </span>
                  </div>
                </div>
                <Divider sx={{ marginTop: 2 }} />
                <div className="cs-post-option-panel">
                  <div className="rich-editor-text">
                    <p
                      style={{
                        backgroundColor: "#efefef",
                        borderStyle: "solid",
                        borderRadius: "10px",
                        padding: "5px",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: dataDetail?.result?.content,
                      }}
                    ></p>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <blockquote className="text-left-align">
                        <span>{dataDetail?.result?.description}</span>
                        <span className="author-name">
                          <a href="https://dev.zeerac.com/blogs">
                            -- {dataDetail?.result?.author?.username}
                          </a>
                        </span>
                      </blockquote>
                    </div>
                  </div>
                </div>
                <div className="cs-tags">
                  <div className="tags">
                    <span>Tags:</span>
                    <ul>
                      {dataDetail?.result?.tags
                        ?.split(",")
                        .map((tag, index) => (
                          <li key={index}>
                            <a rel="tag">{tag}</a>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <button
                    type="button"
                    className={classes.btnBack}
                    onClick={() => history.goBack()}
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default BlogDetail;
