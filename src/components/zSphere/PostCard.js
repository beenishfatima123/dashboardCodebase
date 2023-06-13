import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Button, Divider, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/CancelOutlined";
import ShowIcon from "@mui/icons-material/Visibility";
import HideIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import defaultPost from "../../assets/misc/defaultPost.png";
import CustomTooltip from "../miscellaneousComponents/CustomTooltip";
import { deletePost, editPost, setSelectedPost } from "../../features/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "../miscellaneousComponents/ConfirmModal";
import Loader from "../../customComponents/Loader";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    border: "1px solid #707070",
    borderRadius: 10,
    margin: "20px 50px",
  },
  descriptionContainer: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
  },
  description: {
    minHeight: 50,
    maxHeight: 100,
    overflowY: "scroll",
  },
  postImage: {
    height: "130px",
    width: "135px",
    objectFit: "cover",
    borderRadius: 5,
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  heading: {
    color: "#134696",
  },
  text: {
    marginLeft: 10,
    color: "#1A2954",
  },
  showPostContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  showPostButton: {
    width: "100%",
    backgroundColor: "#134696",
    color: "#FFFFFF",
    borderColor: "#707070",
    borderTopRightRadius: "0px",
    borderTopLeftRadius: "0px",
    borderBottomRightRadius: "9px",
    borderBottomLeftRadius: "9px",
    "&:hover": {
      backgroundColor: "#134696",
    },
  },
}));

const PostCard = ({ index, post, setOpen, clickedIndex, setClickedIndex }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const { allPostsApiInfo } = useSelector((state) => state.posts);

  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const removePost = () => {
    setOpenConfirmModal(false);
    dispatch(deletePost({ token: loggedInObject?.token, id: post?.id }));
  };

  return (
    <>
      {index === clickedIndex && allPostsApiInfo?.loadingDelete ? (
        <Loader
          customContainerStyle={{ minHeight: "20vh" }}
          customImageStyle={{ height: 200, width: 200 }}
        />
      ) : (
        <div key={post?.id} className={classes.container}>
          {openConfirmModal && (
            <ConfirmModal
              open={openConfirmModal}
              setOpen={setOpenConfirmModal}
              title="Are you sure you want to delete this post?"
              handleConfirm={removePost}
            />
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "15px 50px",
            }}
          >
            <div style={{ alignSelf: "center" }}>
              <img
                className={classes.postImage}
                loading="lazy"
                src={
                  post?.images?.length > 0
                    ? "https://api.zeerac.com/" + post?.images[0]?.image
                    : defaultPost
                }
              />
            </div>
            <div className={classes.descriptionContainer}>
              <div className={classes.description}>{post?.description}</div>
              <Divider sx={{ marginTop: 2 }} />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <div style={{ display: "flex", marginTop: 20 }}>
                  <div className={classes.heading}>Post ID:</div>
                  <div className={classes.text}>{post?.id}</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: 20,
                    marginLeft: "30%",
                  }}
                >
                  <div className={classes.heading}>User Name:</div>
                  <div className={classes.text}>{post?.user?.full_name}</div>
                </div>
              </div>
            </div>
            <div className={classes.iconContainer}>
              <DeleteIcon
                sx={{
                  fontSize: 20,
                  width: 26,
                  height: 26,
                  cursor: "pointer",
                  color: "red",
                }}
                onClick={() => {
                  setClickedIndex(index);
                  setOpenConfirmModal(true);
                }}
              />
              {/* <EditIcon
            sx={{
              fontSize: 20,
              width: 26,
              height: 26,
              cursor: "pointer",
            }}
          /> */}
              {clickedIndex === index && allPostsApiInfo?.loadingEdit ? (
                <CircularProgress
                  size={25}
                  sx={{
                    color: "#134696",
                  }}
                />
              ) : !post?.is_hidden ? (
                <CustomTooltip title="Hide Post" placement="left">
                  <ShowIcon
                    onClick={() => {
                      setClickedIndex(index);
                      let formData = new FormData();
                      formData.append("is_hidden", true);
                      dispatch(
                        editPost({
                          id: post?.id,
                          token: loggedInObject?.token,
                          values: formData,
                        })
                      );
                    }}
                    sx={{
                      fontSize: 20,
                      width: 26,
                      height: 26,
                      cursor: "pointer",
                    }}
                  />
                </CustomTooltip>
              ) : (
                <CustomTooltip title="Show Post" placement="left">
                  <HideIcon
                    onClick={() => {
                      setClickedIndex(index);
                      let formData = new FormData();
                      formData.append("is_hidden", false);
                      dispatch(
                        editPost({
                          token: loggedInObject?.token,
                          values: formData,
                          id: post?.id,
                        })
                      );
                    }}
                    sx={{
                      fontSize: 20,
                      width: 26,
                      height: 26,
                      cursor: "pointer",
                    }}
                  />
                </CustomTooltip>
              )}
            </div>
          </div>
          <div className={classes.showPostContainer}>
            <Button
              className={classes.showPostButton}
              onClick={() => {
                setClickedIndex(index);
                dispatch(setSelectedPost(post));
                setOpen(true);
              }}
            >
              Show Post
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default PostCard;
