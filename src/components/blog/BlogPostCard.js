import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import {
  Card,
  Grid,
  Avatar,
  Typography,
  CardActions,
  CardContent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { baseUrl } from "../constants/baseUrls";
import { deleteBlog } from "../../features/blogSlice";
import { DEFAULT_AVATAR } from "../constants/global";
import moment from "moment";

const StyledCardMedia = styled("div")({
  position: "relative",
  paddingTop: "calc(100% * 3 / 4)",
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: "absolute",
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledCover = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

const BlogPostCard = ({ post }) => {
  const dispatch = useDispatch();
  const loggedInObject = useSelector((state) => state.auth.currentUser);

  const { id, feature_photo, title, description, author, created_at } = post;

  const [open, setOpen] = useState(false);
  const [selId, setSelId] = useState();

  const handleClickOpen = (id) => {
    setSelId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setSelId(null);
    setOpen(false);
  };

  const deletePost = () => {
    setSelId(null);
    setOpen(false);
    dispatch(deleteBlog({ authToken: loggedInObject?.token, id: selId }));
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          height: "100%",
        }}
      >
        <StyledCardMedia>
          <StyledAvatar
            alt={author.full_name}
            src={
              author?.photo !== null
                ? `${baseUrl}/${author?.photo}`
                : DEFAULT_AVATAR
            }
          />
          <StyledCover alt={title} src={`${baseUrl}/${feature_photo}`} />
        </StyledCardMedia>
        <CardContent
          sx={{
            pt: 4,
          }}
        >
          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: "text.disabled", display: "block" }}
          >
            {moment(new Date(created_at)).format("DD-MMM-YYYY")}
          </Typography>

          <Typography
            height="44"
            overflow={"hidden"}
            fontWeight="bold"
            color="inherit"
            variant="subtitle2"
            underline="hover"
          >
            {title}
          </Typography>

          <Typography
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              color: "grey",
              wordWrap: "break-word",
            }}
          >
            {description.substring(0, 40).concat("...")}
          </Typography>
        </CardContent>
        <CardActions
          style={{ display: "flex", justifyContent: "space-around" }}
          sx={{ mt: "auto" }}
        >
          <Link to={`/blog-detail/${id}`}>
            <Button variant="contained" color="primary" size="small">
              View
            </Button>
          </Link>
          <Link to={`/edit-blog/${id}`}>
            <Button variant="outlined" color="primary" size="small">
              Edit
            </Button>
          </Link>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => {
              handleClickOpen(id);
            }}
          >
            Delete
          </Button>
        </CardActions>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Post"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure to delete this blog post?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              No
            </Button>
            <Button onClick={() => deletePost()}>Yes</Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Grid>
  );
};
export default BlogPostCard;
