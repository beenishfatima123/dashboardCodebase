import React, { useEffect } from "react";
import Layout from "../../customComponents/layout/Layout";
import { Stack, Typography, Grid, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AllBlogs, resetDeleteBlogApi } from "../../features/blogSlice";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Loader from "../../customComponents/Loader";
import BlogPostCard from "./BlogPostCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { baseUrl } from "../constants/baseUrls";

const Blogs = () => {
  const dispatch = useDispatch();
  const { data, isLoading, deleteBlogApiInfo } = useSelector(
    (state) => state.blog
  );

  useEffect(() => {
    dispatch(
      AllBlogs({
        dataURL: baseUrl + `/users/blogs/`,
      })
    );
  }, []);

  useEffect(() => {
    if (deleteBlogApiInfo?.response) {
      toast.success("Blog post deleted successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetDeleteBlogApi());
      dispatch(
        AllBlogs({
          dataURL: baseUrl + `/users/blogs/`,
        })
      );
    }
    // eslint-disable-next-line
  }, [deleteBlogApiInfo?.response]);

  const handlePrevClick = () => {
    dispatch(
      AllBlogs({
        dataURL: data?.result?.previous.replace("http://", "https://"),
      })
    );
  };

  const handleNextClick = () => {
    dispatch(
      AllBlogs({
        dataURL: data?.result?.next.replace("http://", "https://"),
      })
    );
  };

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Container>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mt={5}
              mb={5}
            >
              <Typography variant="h4" gutterBottom>
                Blogs
              </Typography>
              <Link to={`/add-blog`}>
                <Button variant="contained" startIcon={<AddIcon />}>
                  New Post
                </Button>
              </Link>
            </Stack>
            <Grid container spacing={3}>
              {data && data?.result?.results.length > 0 ? (
                data?.result?.results.map((post, index) => (
                  // <PostCard key={post.id} post={post} index={index} />
                  <BlogPostCard key={post.id} post={post} />
                ))
              ) : (
                <div
                  style={{
                    color: "#014493",
                    fontFamily: "Poopins-Bold",
                    fontSize: 30,
                    textAlign: "center",
                    margin: "auto",
                  }}
                >
                  No Blog post found!!
                </div>
              )}
            </Grid>
            {data?.result?.results && (
              <div className="pagination justify-content-center mt-4 mb-4">
                <Button
                  variant="contained"
                  startIcon={<ArrowBackIosNewIcon />}
                  onClick={handlePrevClick}
                  disabled={data?.result?.previous !== null ? false : true}
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
                  disabled={data?.result?.next !== null ? false : true}
                >
                  {" "}
                  Next{" "}
                </Button>
              </div>
            )}
          </Container>
        </>
      )}
    </Layout>
  );
};

export default Blogs;
