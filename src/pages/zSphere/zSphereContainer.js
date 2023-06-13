import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { debounce } from "lodash";
import Layout from "../../customComponents/layout/Layout";
import { Divider } from "@mui/material";
import { baseUrl } from "../../components/constants/baseUrls";
import CustomTopInfo from "../../customComponents/layout/CustomTopInfo";
import SearchFilters from "../../components/zSphere/SearchFilters";
import PostModal from "../../components/zSphere/PostModal";
import { getAllPostComments, getAllPosts, paginate, searchPosts } from "../../features/postsSlice";
import { USER_TYPES } from "../../components/constants/global";
import Loader from "../../customComponents/Loader";
import PostCard from "../../components/zSphere/PostCard";
import Pagination from "../../components/miscellaneousComponents/Pagination";
import { buildPostSearchQuery } from "../../components/constants/helperFunctions";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "25px 20px",
    border: "1px solid #c9c9c9",
    borderRadius: "10px",
  },
}));

const ZSpehereContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const { allPosts, allPostsApiInfo, searchedPosts, selectedPost } = useSelector(
    (state) => state.posts
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [clickedIndex, setClickedIndex] = useState();

  const delayedPostSearch = useMemo(
    () => debounce((query) => queryPosts(query), 500),
    // eslint-disable-next-line
    []
  );

  const postsToShow = useMemo(() => {
    if (searchQuery?.postID?.length > 0 && searchedPosts) {
      return searchedPosts;
    } else if (searchQuery?.searchText?.length >= 3 && searchedPosts) {
      return searchedPosts;
    } else {
      return allPosts;
    }
    // eslint-disable-next-line
  }, [searchedPosts, allPosts]);

  useEffect(() => {
    if (
      searchQuery?.searchText?.length >= 3 ||
      searchQuery?.postID?.length > 0
    ) {
      delayedPostSearch(buildPostSearchQuery(searchQuery));
    }
    // eslint-disable-next-line
  }, [searchQuery]);

  useEffect(() => {
    if (loggedInObject?.user_type === USER_TYPES.ADMIN) {
      dispatch(
        getAllPosts({
          dataURL: baseUrl + `/zsphere/posts/`,
        })
      );
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (allPostsApiInfo?.loadingCommentDelete === true) {
      dispatch(
        getAllPostComments({
          token: loggedInObject?.token,
          id: selectedPost?.id,
        })
      );
    }

  }, [allPostsApiInfo?.loadingCommentDelete])

  const queryPosts = async (query) => {
    dispatch(
      searchPosts({
        searchQuery: query,
      })
    );
  };

  const paginatePosts = (url) => {
    dispatch(
      paginate({
        url,
      })
    );
  };

  const handlePageSelect = (pageNumber) => {
    let newLink,
      pageSplit = "";
    if (allPosts?.next) pageSplit = allPosts?.next?.split("page=");
    else pageSplit = allPosts?.previous?.split("page=");
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
    paginatePosts(newLink.replace("http", "https"));
  };


  return (
    <Layout>
      <CustomTopInfo heading="Z-Sphere" />
      <div className={classes.container}>
        <SearchFilters
          searchQuery={searchQuery || ""}
          setSearchQuery={setSearchQuery}
        />
        <Divider style={{ margin: "0 20px" }} />
        {allPostsApiInfo?.loading ? (
          <Loader />
        ) : postsToShow?.count > 0 ? (
          postsToShow?.results?.map((post, index) => {
            return (
              <PostCard
                index={index}
                post={post}
                setOpen={setOpen}
                clickedIndex={clickedIndex}
                setClickedIndex={setClickedIndex}
              />
            );
          })
        ) : (
          <div>No result</div>
        )}
      </div>
      {postsToShow?.results?.length > 0 && (
        <Pagination
          data={postsToShow}
          page={handlePageSelect}
          paginate={paginatePosts}
        />
      )}
      {open && <PostModal post={selectedPost} open={open} setOpen={setOpen} />}
    </Layout>
  );
};

export default ZSpehereContainer;
