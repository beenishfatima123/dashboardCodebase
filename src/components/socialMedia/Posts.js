import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Layout from "../../customComponents/layout/Layout";
import {
  getAllPosts,
  updatePost,
  getPostByID,
  getPostByTitle,
  resetSearch,
} from "../../features/socialSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import PostFilter from "./PostFilter";
import { baseUrl } from "../constants/baseUrls";
import moment from "moment";
import Loader from "../../customComponents/Loader";
import { toast } from "react-toastify";

function Row(props) {
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  let history = useHistory();

  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [hideBtn, setHideBtn] = React.useState(false);

  const togglePostVisibility = async (postId, visible) => {
    let formData = new FormData();
    formData.append("hide", visible);
    dispatch(
      updatePost({
        authToken: loggedInObject?.token,
        id: postId,
        data: formData,
      })
    ).then((response) => {
      if (response.payload.status) {
        toast.success(JSON.stringify("Post status updated successfully."), {
          position: toast.POSITION.BOTTOM_RIGHT,
          progressStyle: { backgroundColor: "#014493" },
        });
        history.push("/social-media-posts");
      } else {
        toast.error(JSON.stringify(response.payload.message), {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    });
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="center">{row?.id}</TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row?.description?.length > 15
            ? `${row?.description?.substring(0, 15)}...`
            : row?.description}
        </TableCell>
        <TableCell align="center">
          {moment(row?.created_at).format("MMMM DD, YYYY") + ""}
        </TableCell>
        <TableCell align="right">{row?.likes_count}</TableCell>
        <TableCell align="right">{row?.comments_count}</TableCell>
        <TableCell align="center">{row?.user_fk?.username}</TableCell>
        <TableCell>
          <Button onClick={() => togglePostVisibility(row?.id, !row?.hide)}>
            {!row?.hide ? "Hide" : "Show"}
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Post Description
              </Typography>
              <Grid
                container
                spacing={3}
                style={{
                  padding: 40,
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={4}
                  sx={{ paddingBottom: "24px", paddingRight: "20px" }}
                >
                  <img
                    src={`https://api.zeerac.com/` + row?.property_post_image}
                    alt="logo"
                    style={{
                      objectFit: "cover",
                      width: "80%",
                      borderRadius: 10,
                    }}
                  />
                </Grid>
                <Grid item xs={8}>
                  {row?.description}
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Posts() {
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  let token = loggedInObject?.token;

  const dispatch = useDispatch();

  const postState = useSelector((state) => state.social);
  const { allPosts, searchResults, isLoading } = postState;

  const [postId, setPostId] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleReset = (e) => {
    e.preventDefault();
    dispatch(resetSearch());
    setPostId("");
    setPostTitle("");
    setFilteredData(allPosts?.results);
  };

  const handlePrevClick = () => {
    dispatch(
      getAllPosts({
        authToken: token,
        dataURL: allPosts?.previous.replace("http://", "https://"),
      })
    );
  };

  const handleNextClick = () => {
    dispatch(
      getAllPosts({
        authToken: token,
        dataURL: allPosts?.next.replace("http://", "https://"),
      })
    );
  };

  useEffect(() => {
    setFilteredData(searchResults?.results);
  }, [searchResults]);

  const filterSearchResults = () => {
    if (postId === "" && postTitle === "") {
      setFilteredData(allPosts?.results);
    }
    if (postId !== "") {
      setTimeout(() => {
        dispatch(
          getPostByID({
            authToken: token,
            postId: postId,
          })
        );
        setFilteredData(searchResults?.results);
      }, 1000);
    }
    if (postTitle !== "") {
      setTimeout(() => {
        dispatch(
          getPostByTitle({
            authToken: token,
            postTitle: postTitle,
          })
        );
        setFilteredData(searchResults?.results);
      }, 1000);
    }
  };

  useEffect(() => {
    setFilteredData(searchResults?.results);
  }, [searchResults]);

  useEffect(() => {
    filterSearchResults();
  }, [postId, postTitle]);

  useEffect(() => {
    if (!allPosts || !allPosts?.length)
      dispatch(
        getAllPosts({
          authToken: token,
          dataURL: baseUrl + `/users/dashboard-property-posts/`,
        })
      );
  }, []);

  useEffect(() => {
    setFilteredData(allPosts?.results);
  }, [allPosts]);

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PostFilter
            setPostId={setPostId}
            postId={postId}
            setPostTitle={setPostTitle}
            postTitle={postTitle}
            handleSearch={(e) => {
              e.preventDefault();
              filterSearchResults();
            }}
            handleReset={handleReset}
          />
          <Box sx={{ margin: 5 }}>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  {/* <Typography variant="h6" gutterBottom component="div">
              Posts
            </Typography> */}
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Post ID
                    </TableCell>
                    <TableCell />
                    <TableCell style={{ fontWeight: "bold" }}>
                      Description
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      Created at
                    </TableCell>
                    <TableCell align="right" style={{ fontWeight: "bold" }}>
                      Likes
                    </TableCell>
                    <TableCell align="right" style={{ fontWeight: "bold" }}>
                      Comments
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      Username
                    </TableCell>
                    <TableCell align="left" style={{ fontWeight: "bold" }}>
                      Visibility
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData?.map((row) => (
                    <Row key={row.name} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {allPosts?.results && (
              <div className="pagination justify-content-center mt-4 mb-4">
                <Button
                  variant="contained"
                  startIcon={<ArrowBackIosNewIcon />}
                  onClick={handlePrevClick}
                  disabled={allPosts?.previous !== null ? false : true}
                >
                  {" "}
                  Previous{" "}
                </Button>
                <div
                  style={{
                    width: "5px",
                    height: "auto",
                    display: "inline-block",
                  }}
                ></div>
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIosIcon />}
                  onClick={handleNextClick}
                  disabled={allPosts?.next !== null ? false : true}
                >
                  {" "}
                  Next{" "}
                </Button>
              </div>
            )}
          </Box>{" "}
        </>
      )}
    </Layout>
  );
}
