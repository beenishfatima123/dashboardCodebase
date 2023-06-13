import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { makeStyles } from "@mui/styles";
import {
  Avatar,
  Button,
  CircularProgress,
  IconButton,
  Modal,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/CancelOutlined";
import HideIcon from "@mui/icons-material/VisibilityOff";
import ShowIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import PostImages from "./PostImages";
import CommentCard from "./CommentCard";
import { baseUrl } from "../constants/baseUrls";
import Loader from "../../customComponents/Loader";
import FinishedCommentsContainer from "./FinishedCommentsContainer";
import {
  deletePost,
  editPost,
  getAllPostComments,
  getSinglePost,
  setSelectedPost,
} from "../../features/postsSlice";
import ConfirmModal from "../miscellaneousComponents/ConfirmModal";

const useStyles = makeStyles(() => ({
  modalContent: {
    position: "absolute",
    top: "10%",
    left: "28%",
    backgroundColor: "white",
    margin: "auto",
    padding: "0",
    border: "1px solid #888",
    width: "50%",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)",
    borderRadius: "20px",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: "12px 12px 0px 16px",
    color: "white",
  },
  close: {
    color: "#FF6161",
    float: "right",
    fontSize: "28px",
    fontWeight: "bold",
  },
  modalBody: {
    padding: "5px 40px",
    height: "60vh",
    overflowY: "scroll",
  },
  modalFooter: {
    padding: "0px 0px",
    backgroundColor: "green",
    color: "white",
  },
  title: {
    color: "#134696",
    fontFamily: "light",
    fontSize: "20px",
    textTransform: "capitalize",
  },
  author: {
    color: "#6b7b88",
    fontFamily: "light",
    fontSize: "15px",
    textTransform: "capitalize",
  },
  commentsContainer: {
    display: "flex",
    flexDirection: "column",
    transition: "height 0.5s",
  },
  hideButton: {
    width: "100%",
    height: "45px",
    color: "#FFFFFF",
    background: "#134696",
    borderTopRightRadius: "0px",
    borderTopLeftRadius: "0px",
    borderBottomRightRadius: "0px",
    borderBottomLeftRadius: "18px",
    "&:hover": {
      backgroundColor: "#134696",
    },
  },
  shareButton: {
    width: "100%",
    height: "45px",
    color: "#FFFFFF",
    background: "#DBDBDB",
    borderRadius: "0px",
    "&:hover": {
      backgroundColor: "#DBDBDB",
    },
  },
  deleteButton: {
    width: "100%",
    height: "45px",
    color: "#FFFFFF",
    background: "#FF6161",
    borderTopRightRadius: "0px",
    borderTopLeftRadius: "0px",
    borderBottomRightRadius: "18px",
    borderBottomLeftRadius: "0px",
    "&:hover": {
      backgroundColor: "#FF6161",
    },
  },
}));

const PostModal = ({ post, open, setOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const { selectedPost, allPosts, userPosts, allPostsApiInfo } = useSelector(
    (state) => state.posts
  );

  const handleClose = () => {
    dispatch(setSelectedPost(null));
    setOpen(false);
  };

  const removePost = () => {
    setOpenConfirmModal(false);
    dispatch(setSelectedPost(null));
    dispatch(deletePost({ token: loggedInObject?.token, id: post?.id }));
    setOpen(false);
  };

  useEffect(() => {
    if (
      (selectedPost?.comments_count >= 1 && !selectedPost?.fetchedComments) ||
      selectedPost?.action === "updated"
    ) {
      dispatch(
        getAllPostComments({
          token: loggedInObject?.token,
          id: post?.id,
        })
      );
    }
    // eslint-disable-next-line
  }, [selectedPost, post?.id]);

  useEffect(() => {
    if (!selectedPost) {
      dispatch(getSinglePost({ id: post?.id }));
    }
  }, [selectedPost, post?.id, allPosts, userPosts]);

  // console.log({ post, allPosts, selectedPost });

  return (
    <Modal open={open} onClose={handleClose} scroll={scroll}>
      <div className={classes.modalContent}>
        {openConfirmModal && (
          <ConfirmModal
            open={openConfirmModal}
            setOpen={setOpenConfirmModal}
            title="Are you sure you want to delete this post?"
            handleConfirm={removePost}
          />
        )}
        <div className={classes.modalHeader}>
          <span className={classes.close}>
            {" "}
            <DeleteIcon
              sx={{
                fontSize: 20,
                cursor: "pointer",
                color: "red",
                width: "40px",
                height: "40px",
              }}
              onClick={handleClose}
            />
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div>
              <IconButton size="small" sx={{ ml: 2 }}>
                <Avatar
                  sx={{
                    width: 50,
                    height: 50,
                    background: `#fff`,
                    border: "1px solid black",
                  }}
                  src={`${baseUrl}/${post?.user?.photo}`}
                >
                  <PersonIcon sx={{ color: "#014493" }} />
                </Avatar>
              </IconButton>
            </div>
            <div>
              <span className={classes.title}>{post?.user?.full_name}</span>
              <br />
              <span className={classes.author}>
                {moment(post?.created_at)?.add(5, "h")?.from(moment())}
              </span>
            </div>
          </div>
        </div>
        <div className={classes.modalBody}>
          <p>{post?.description}</p>
          {post?.images?.length > 0 && <PostImages images={post?.images} />}
          {allPostsApiInfo?.loadingCommentDelete ? (
            <Loader
              customContainerStyle={{ minHeight: "20vh" }}
              customImageStyle={{ height: 150, width: 150 }}
            />
          ) : (
            <>
              {allPostsApiInfo?.loadingComments === `${post?.id}` ? (
                <Loader
                customContainerStyle={{ minHeight: "20vh" }}
                customImageStyle={{ height: 150, width: 150 }}
              />
              ) : (
                <div className={classes.commentsContainer}>
                  {post?.comments &&
                    post?.fetchedComments?.results?.length <= 0 && (
                      <CommentCard comment={post?.comments} post={post} />
                    )}
                  {post?.fetchedComments?.results?.map((elem, index) => (
                    <CommentCard key={index} comment={elem} post={post} />
                  ))}
                  {post?.fetchedComments?.count > 10 && (
                    <FinishedCommentsContainer />
                  )}
                </div>
              )}
            </>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div style={{ width: "33%" }}>
            <Button
              startIcon={!post?.is_hidden ? <ShowIcon /> : <HideIcon />}
              className={classes.hideButton}
              onClick={() => {
                let formData = new FormData();
                formData.append("is_hidden", !post?.is_hidden);
                dispatch(
                  editPost({
                    id: post?.id,
                    token: loggedInObject?.token,
                    values: formData,
                  })
                );
              }}
            >
              {!post?.is_hidden ? "Hide" : "Show"}
            </Button>
          </div>
          <div style={{ width: "34%" }}>
            <Button startIcon={<EditIcon />} className={classes.shareButton}>
              Share
            </Button>
          </div>
          <div style={{ width: "33%" }}>
            <Button
              startIcon={<DeleteIcon />}
              className={classes.deleteButton}
              onClick={() => {
                setOpenConfirmModal(true);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PostModal;
