import React, { useEffect, useState, useMemo } from "react";
import { useHistory } from "react-router";
import Layout from "../../customComponents/layout/Layout";
import { baseUrl } from "../../components/constants/baseUrls";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import Loader from "../../customComponents/Loader";
import { Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import CustomTopInfo from "../../customComponents/layout/CustomTopInfo";
import {
  getAllNews,
  resetSearchedNews,
  queryNews,
  resetDeleteNewsApi,
  deleteNews,
  resetUpdateNewsApi,
  paginate,
} from "../../features/newsSlice";
import NewsSearchFilter from "../../components/news/NewsSearchFilter";
import NewsCard from "../../components/news/NewsCard";
import ConfirmModal from "../../components/miscellaneousComponents/ConfirmModal";
import Pagination from "../../components/miscellaneousComponents/Pagination";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "25px 20px",
    border: "1px solid #c9c9c9",
    borderRadius: "10px",
  },
  topSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "100%",
    margin: "20px 35px",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: "0px 15px",
    marginBottom: "15px",
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
}));

const News = () => {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const {
    allNews,
    allNewsApiInfo,
    searchedNews,
    searchNewsApiInfo,
    updateNewsApiInfo,
    deleteNewsApiInfo,
  } = useSelector((state) => state.news);

  const [searchQuery, setSearchQuery] = useState("");
  const [hovering, setHovering] = useState(false);
  const [selId, setSelId] = useState();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const newsToShow = useMemo(() => {
    if (searchQuery?.length === 0) {
      return allNews;
    } else if (searchQuery?.length >= 3 && searchedNews) {
      return searchedNews;
    } else {
      return allNews;
    }
    // eslint-disable-next-line
  }, [searchedNews, allNews]);

  useEffect(() => {
    if (searchQuery?.length === 0) dispatch(resetSearchedNews());
    if (searchQuery?.length >= 3) delayedSearch(searchQuery);
    // eslint-disable-next-line
  }, [searchQuery]);

  const delayedSearch = useMemo(
    () => debounce((query) => searchNews(query), 500),
    // eslint-disable-next-line
    [searchQuery]
  );

  const searchNews = async (query) => {
    dispatch(
      queryNews({
        query,
      })
    );
  };

  useEffect(() => {
    // if (!allNews) {
      dispatch(
        getAllNews({
          authToken: loggedInObject?.token,
          dataURL: `${baseUrl}/users/news/`,
        })
      );
    // }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (deleteNewsApiInfo?.response) {
      toast.success("News deleted successfully.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetDeleteNewsApi());
    }
    // eslint-disable-next-line
  }, [deleteNewsApiInfo?.response]);

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

  const removeNews = () => {
    setOpenConfirmModal(false);
    setSelId(null);
    dispatch(deleteNews({ authToken: loggedInObject?.token, newsID: selId }));
  };

  const paginateNews = (url) => {
    dispatch(
      paginate({
        url,
      })
    );
  };

  const handlePageSelect = (pageNumber) => {
    let newLink,
      pageSplit = "";
    if (newsToShow?.result?.next)
      pageSplit = newsToShow?.result?.next?.split("page=");
    else pageSplit = newsToShow?.result?.previous?.split("page=");
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
    paginateNews(newLink.replace("http", "https"));
  };

  return (
    <Layout>
      <CustomTopInfo heading="News" />
      <div className={classes.container}>
        <div className={classes.topSection}>
          <div style={{ fontSize: 22, fontFamily: "heavy", color: "#134696" }}>
            News to the Global Phenomenon
          </div>
          <div
            className={classes.addBtn}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            style={{
              padding: hovering ? "10px 40px" : 10,
            }}
            onClick={() => history.push("/add-news")}
          >
            {hovering ? (
              <span className={classes.btnText}>ADD News</span>
            ) : (
              <AddIcon style={{ color: "white" }} />
            )}
          </div>
        </div>
        <Divider style={{ margin: "0 35px" }} />
        <NewsSearchFilter
          searchQuery={searchQuery || ""}
          setSearchQuery={setSearchQuery}
        />
        <div className={classes.innerContainer}>
          {allNewsApiInfo?.loading || searchNewsApiInfo?.loading ? (
            <Loader />
          ) : newsToShow && newsToShow?.result.count > 0 ? (
            newsToShow?.result?.results?.map((newsItem, index) => (
              <div key={index}>
                <NewsCard
                  news={newsItem}
                  selId={selId}
                  setSelId={setSelId}
                  setOpenConfirmModal={setOpenConfirmModal}
                />
                <Divider style={{ margin: "0 5px" }} />
              </div>
            ))
          ) : (
            <>
              <div>No Results Found</div>
            </>
          )}
        </div>
      </div>
      {newsToShow?.result?.results?.length > 0 && (
        <Pagination
          data={newsToShow?.result}
          page={handlePageSelect}
          paginate={paginateNews}
        />
      )}
      {openConfirmModal && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title="Are you sure you want to delete this news?"
          handleConfirm={removeNews}
        />
      )}
    </Layout>
  );
};

export default News;
