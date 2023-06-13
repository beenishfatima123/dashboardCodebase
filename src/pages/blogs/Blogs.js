import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Grid, Divider, Box } from "@mui/material";
import Layout from "../../customComponents/layout/Layout";
import AddIcon from "@mui/icons-material/Add";
import Loader from "../../customComponents/Loader";
import { baseUrl } from "../../components/constants/baseUrls";
import { debounce } from "lodash";
import {
  AllBlogs,
  deleteBlog,
  paginate,
  queryBlogs,
  resetDeleteBlogApi,
  resetSearchedBlogs,
  resetUpdateBlogApi,
} from "../../features/blogSlice";
import CustomTopInfo from "../../customComponents/layout/CustomTopInfo";
import Pagination from "../../components/miscellaneousComponents/Pagination";
import BlogSearchFilter from "../../components/blogs/BlogSearchFilter";
import BlogCard from "../../components/blogs/BlogCard";
import ConfirmModal from "../../components/miscellaneousComponents/ConfirmModal";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "25px 20px",
    border: "1px solid #c9c9c9",
    borderRadius: "10px",
    // maxWidth: "85%"
  },
  topSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: "95%",

    margin: "20px 35px",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    top: "80%",
    gap: "30px",
    maxWidth: "95%",
  },
  projectPic: {
    width: 135,
    height: 135,
    objectFit: "cover",
    position: "absolute",
    top: "-30%",
  },
  addBtn: {
    borderRadius: 35,
    backgroundColor: "#134696",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "0.5s",
    zIndex: 1200,
  },
  btnText: {
    fontSize: 15,
    color: "white",
  },
  text: {
    fontSize: 15,
    margin: 0,
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
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridGap: "20px",
  },
  "@media (max-width: 1500px)": {
    cards: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },
  "@media (max-width: 1200px)": {
    cards: {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
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
}));

const Blogs = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [hovering, setHovering] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selId, setSelId] = useState();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const {
    allBlogs,
    allBlogsApiInfo,
    searchedBlogs,
    searchBlogsApiInfo,
    updateBlogApiInfo,
    deleteBlogApiInfo,
  } = useSelector((state) => state.blog);

  const blogsToShow = useMemo(() => {
    if (searchQuery?.length === 0) {
      return allBlogs;
    } else if (searchQuery?.length >= 3 && searchedBlogs) {
      return searchedBlogs;
    } else {
      return allBlogs;
    }
  }, [searchedBlogs, allBlogs]);

  useEffect(() => {
    if (!allBlogs) {
      dispatch(
        AllBlogs({
          dataURL: baseUrl + `/users/blogs/`,
        })
      );
    }
  }, []);

  useEffect(() => {
    if (searchQuery?.length === 0) dispatch(resetSearchedBlogs());
    if (searchQuery?.length >= 3) delayedSearch(searchQuery);
  }, [searchQuery]);

  const delayedSearch = useMemo(() =>
    debounce((query) => searchBlogs(query), 500)
  );

  const searchBlogs = async (query) => {
    dispatch(
      queryBlogs({
        query,
      })
    );
  };

  const paginateBlogs = (url) => {
    dispatch(
      paginate({
        url: `${url}`,
        authToken: loggedInObject?.token,
      })
    );
  };

  const handlePageSelect = (pageNumber) => {
    let newLink,
      pageSplit = "";
    if (blogsToShow?.result?.next)
      pageSplit = blogsToShow?.result?.next?.split("page=");
    else pageSplit = blogsToShow?.result?.previous?.split("page=");
    if (pageSplit?.length > 2) {
      newLink = `${pageSplit[0]}page=${pageNumber}${pageSplit[1]?.substring(
        pageSplit[1]?.indexOf("&"),
        pageSplit[1]?.length
      )}`;
    } else if (pageSplit[0].includes("?")) {
      newLink = `${pageSplit[0]}page=${pageNumber}`;
    } else {
      newLink = `${pageSplit[0]}?page=${pageNumber}`;
    }
    paginateBlogs(newLink.replace("http", "https"));
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
      setSelId(null);
      dispatch(resetUpdateBlogApi());
    }
    // eslint-disable-next-line
  }, [updateBlogApiInfo]);

  useEffect(() => {
    if (deleteBlogApiInfo?.response) {
      toast.success("Blog deleted successfully.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetDeleteBlogApi());
    }
    // eslint-disable-next-line
  }, [deleteBlogApiInfo?.response]);

  const removeBlog = () => {
    setOpenConfirmModal(false);
    dispatch(deleteBlog({ authToken: loggedInObject?.token, blogID: selId, opened: false }));
    setSelId(null);
  };

  return (
    <Layout>
      <CustomTopInfo heading="Blogs" />
      {allBlogsApiInfo?.loading || searchBlogsApiInfo?.loading ? (
        <Loader />
      ) : (
        <div className={classes.container}>
          <div className={classes.topSection}>
            <div
              style={{ fontSize: 22, fontFamily: "heavy", color: "#134696" }}
            >
              Experiencing the world wide phenomena
            </div>
            <div
              className={classes.addBtn}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              style={{
                padding: hovering ? "10px 40px" : 10,
                float: "right",
              }}
              onClick={() => history.push("/add-blog")}

            >
              {hovering ? (
                <span className={classes.btnText}>Add Blog</span>
              ) : (
                <AddIcon style={{ color: "white" }} />
              )}
            </div>
          </div>
          <Divider style={{ margin: "0 35px" }} />
          <BlogSearchFilter
            searchQuery={searchQuery || ""}
            setSearchQuery={setSearchQuery}
          />
          <Box
            sx={{
              margin: 5,
            }}
          >
            <Grid container alignItems="center" spacing={2} marginTop="5px">
              <div className={classes.cards}>
                {blogsToShow?.result?.results.map((blog) => (
                  <BlogCard
                    key={blog?.id}
                    blog={blog}
                    selId={selId}
                    setSelId={setSelId}
                    setOpenConfirmModal={setOpenConfirmModal}
                  />
                ))}
              </div>
            </Grid>
          </Box>
        </div>
      )}
      {allBlogs ? (
        <Pagination
          data={allBlogs?.result}
          page={handlePageSelect}
          paginate={paginateBlogs}
        />
      ) : (
        <></>
      )}
      {openConfirmModal && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title="Are you sure you want to delete this blog?"
          handleConfirm={removeBlog}
          setSelItem={setSelId}
        />
      )}
    </Layout>
  );
};

export default Blogs;
