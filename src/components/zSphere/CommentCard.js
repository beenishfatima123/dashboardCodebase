import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { baseUrl } from "../constants/baseUrls";
import "./postStyles.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import HideIcon from "@mui/icons-material/VisibilityOff";
import ShowIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteComment, editComment } from "../../features/postsSlice";

const useStyles = makeStyles(() => ({
  comment: {
    borderBottom: "1px solid #D6D6D6",
    display: "flex",
    flexDirection: "column",
    padding: "10px 0px",
    position: "relative",
  },
  userDetails: {
    display: "flex",
    alignItems: "center",
  },
  name: {
    fontSize: 14,
    color: "#171725",
    marginRight: 10,
    textTransform: "capitalize",
  },
  time: {
    color: "#92929D",
    fontSize: 12,
  },
  commentText: {
    fontSize: 14,
    color: "#696974",
    marginBottom: 5,
    paddingTop: 5,
  },
  textContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#EDEDED",
    padding: "0px 16px",
    borderRadius: 20,
    marginTop: 10,
    position: "relative",
  },
  allReactions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#FFFFFF",
    border: "1px solid #707070",
    borderRadius: 20,
    padding: "0px 10px",
  },
  reaction: {
    height: 26,
    width: 26,
  },
  commentReaction: {
    height: 26,
    width: 26,
    marginLeft: 20,
  },
  inputContainer: {
    display: "flex",
    flex: 1,
    borderRadius: 30,
    border: "1px solid #9DAFBD",
    height: 27,
    margin: "8px 5%",
    padding: "4px 20px",
  },
  commentReactionsContainer: {
    display: "flex",
    flex: 1,
    padding: "4px 16px",
    alignItems: "center",
  },
  reactionText: {
    fontSize: 12,
    color: "#92929D",
    fontFamily: "medium",
    marginLeft: 5,
  },
  nestedContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    marginLeft: "5%",
  },
  reactionIcons: {
    position: "absolute",
    right: 10,
    top: "90%",
  },
}));

const CommentCard = ({ comment, post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const containerRef = useRef();

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [isHiden, setIsHidden] = useState(comment?.is_hidden);

  const menuOpen = Boolean(anchorEl);

  const [nestedComments, setNestedComments] = useState([]);
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const darkMode = false;

  useEffect(() => {
    if (comment?.comment_replies?.length > 0) {
      setNestedComments(comment?.comment_replies);
    }
  }, [comment]);

  return (
    <div
      className={classes.comment}
      ref={containerRef}
      style={{
        border: isHiden ? "1px solid red" : "",
        borderRadius: isHiden ? "10px" : "",
        padding: isHiden ? "3px" : "",
      }}
    >
      <div className={classes.userDetails}>
        <Avatar
          src={`${baseUrl}/${comment?.user_fk?.photo}`}
          style={{ height: 24, width: 24, marginRight: 10 }}
        />
        <span
          className={classes.name}
          style={{
            color: darkMode ? "#0ed864" : "#171725",
          }}
        >
          {comment?.user_fk?.full_name}
        </span>
        <span className={classes.time}>
          {moment(comment?.updated_at)
            ?.add(5, "h")
            ?.format(" Do, MMMM  h:mm a")}
        </span>
      </div>
      <div
        className={classes.textContainer}
        style={{
          backgroundColor: darkMode ? "#212124" : "#EDEDED",
        }}
      >
        <p
          className={classes.commentText}
          style={{
            color: darkMode ? "#fff" : "#696974",
          }}
        >
          {comment?.content}
        </p>
        <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
          <MoreVertIcon />
        </IconButton>
      </div>
      <div className={classes.nestedContainer}>
        {nestedComments?.map((elem, index) => (
          <CommentCard key={index} comment={elem} post={post} />
        ))}
      </div>

      <Menu
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={() => {
          setAnchorEl(null);
        }}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            boxShadow: "0px 0px #ffffff",
            border: "0.1px solid grey",
            zIndex: 10,
          },
        }}
      >
        <MenuItem
          disableRipple
          onClick={() => {
            setAnchorEl(null);
            setIsHidden(!isHiden);
            console.log({ comment, nestedComments, post });
            let formData = new FormData();
            formData.append("is_hidden", !comment?.is_hidden);
            dispatch(
              editComment({
                postID: post?.id,
                commentID: comment?.id,
                values: formData,
                token: loggedInObject?.token,
              })
            );
          }}
        >
          <ListItemIcon>
            {isHiden ? (
              <HideIcon sx={{ color: "black" }} fontSize="small" />
            ) : (
              <ShowIcon sx={{ color: "black" }} fontSize="small" />
            )}
          </ListItemIcon>
          {isHiden ? "Show" : "Hide"}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            dispatch(
              deleteComment({
                token: loggedInObject?.token,
                commentID: comment?.id,
                postID: post?.id,
              })
            );
            setNestedComments([]);
          }}
          sx={{ color: "error.main" }}
          disableRipple
        >
          <ListItemIcon>
            <DeleteIcon color="error" fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
      </Menu>
    </div>
  );
};

export default CommentCard;
