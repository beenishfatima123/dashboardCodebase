import React, { useEffect, useMemo, useRef } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { paginateComments } from "../../features/postsSlice";
import Loader from "../../customComponents/Loader";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 0px",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: 8,
    margin: "20px 0px",
  },
  text1: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "medium",
    margin: "5px 0px",
    alignSelf: "center",
  },
  text2: {
    fontSize: 17,
    fontWeight: "bold",
    alignSelf: "center",
  },
}));
const FinishedCommentsContainer = () => {
  const classes = useStyles();
  const containerRef = useRef();
  const dispatch = useDispatch();

  const { darkMode } = useSelector((state) => state.global);
  const { selectedPost, allPostsApiInfo } = useSelector((state) => state.posts);

  const paginationUrl = useMemo(
    () => selectedPost?.fetchedComments?.next?.replace("http", "https"),
    [selectedPost]
  );
  useEffect(() => {
    if (selectedPost?.fetchedComments?.next) {
      getPaginatedComments();
    }
    // eslint-disable-next-line
  }, [selectedPost]);

  const getPaginatedComments = async () => {
    dispatch(
      paginateComments({
        url: paginationUrl,
      })
    );
  };
  return (
    <div
      ref={containerRef}
      className={classes.container}
      style={{
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      {allPostsApiInfo?.loadingCommentsPagination ? (
        <Loader />
      ) : (
        <>
          <span
            className={classes.text1}
            style={{
              color: darkMode ? "#fff" : "#65676b",
            }}
          >
            No more Replies
          </span>
          <span
            className={classes.text2}
            style={{
              color: darkMode ? "#fff" : "#65676b",
            }}
          >
            You are all caught up
          </span>
        </>
      )}
    </div>
  );
};

export default FinishedCommentsContainer;
