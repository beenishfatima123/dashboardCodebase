import React, { useEffect } from "react";
import moment from "moment/moment";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../customComponents/layout/Layout";
import Loader from "../../customComponents/Loader";
import {
  getLatestNews,
  getNewsDetail,
  resetDeleteNewsApi,
  resetUpdateNewsApi,
  resetVisibilityApi,
  setNewsDetails,
} from "../../features/newsSlice";
import TopSection from "../../components/news/view/TopSection";
import TitleContainer from "../../components/news/view/TitleContainer";

const useStyles = makeStyles(() => ({
  userContainer: {
    display: "flex",
    flex: 1,
    margin: "10px 3%",
    alignItems: "center",
  },
  user: {
    fontSize: 14,
    color: "#6B7B88",
    textTransform: "capitalize",
  },
  time: {
    fontSize: 14,
    color: "#6B7B88",
    margin: "0px 20px",
  },
  content: {
    margin: "10px 3%",
    fontSize: 18,
    color: "#6B7B88",
    paddingBottom: "10px",
    borderBottom: "1px solid #C9C9C9",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));
const NewsDetails = () => {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    latestNews,
    newsDetail,
    allNewsApiInfo,
    selectedNewsApiInfo,
    deleteNewsApiInfo,
    updateNewsApiInfo,
    visibilityApiInfo,
  } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(getNewsDetail({ id: params?.id }));
    // eslint-disable-next-line
  }, [params?.id]);

  useEffect(() => {
    if (!latestNews) {
      dispatch(getLatestNews());
    }
    // eslint-disable-next-line
  }, [latestNews]);

  useEffect(() => {
    if (updateNewsApiInfo?.toggleVisibility) {
      toast.success(
        updateNewsApiInfo?.response?.is_active
          ? "News is visible now."
          : "News is hidden now",
        {
          position: toast.POSITION.TOP_CENTER,
          progressStyle: { backgroundColor: "#014493" },
        }
      );
      dispatch(resetUpdateNewsApi());
    }
    // eslint-disable-next-line
  }, [updateNewsApiInfo]);

  useEffect(() => {
    if (deleteNewsApiInfo?.response) {
      toast.success("News deleted successfully.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
      });
      if(deleteNewsApiInfo?.response?.opened){
        dispatch(setNewsDetails(null));
        history.push("/news");
      }
      dispatch(resetDeleteNewsApi());
    }
    // eslint-disable-next-line
  }, [deleteNewsApiInfo?.response]);

  useEffect(() => {
    if (visibilityApiInfo?.response) {
      toast.success(
        visibilityApiInfo?.response?.is_active
          ? "News is visible now."
          : "News is hidden now",
        {
          position: toast.POSITION.TOP_CENTER,
          progressStyle: { backgroundColor: "#014493" },
        }
      );
      dispatch(resetVisibilityApi());
    }
    // eslint-disable-next-line
  }, [visibilityApiInfo]);

  return (
    <Layout>
      {selectedNewsApiInfo?.loading || deleteNewsApiInfo?.loading ? (
        <Loader />
      ) : (
        <div style={{ overflowX: "hidden" }}>
          <TopSection />
          <TitleContainer />
          <div className={classes.userContainer}>
            <span className={classes.user}>
              {newsDetail?.author?.full_name}
            </span>
            <p className={classes.time}>
              {moment(newsDetail?.updated_at).format("DD MMMM YYYY")}
            </p>
          </div>
          <p
            className={classes.content}
            dangerouslySetInnerHTML={{
              __html: newsDetail?.content,
            }}
          ></p>
        </div>
      )}
    </Layout>
  );
};

export default NewsDetails;
