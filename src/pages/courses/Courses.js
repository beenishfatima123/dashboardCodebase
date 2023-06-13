import React, { useEffect, useState, useMemo } from "react";
import { useHistory } from "react-router";
import Layout from "../../customComponents/layout/Layout";
import { baseUrl } from "../../components/constants/baseUrls";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import Loader from "../../customComponents/Loader";
import { Grid, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import CustomTopInfo from "../../customComponents/layout/CustomTopInfo";
import ConfirmModal from "../../components/miscellaneousComponents/ConfirmModal";
import Pagination from "../../components/miscellaneousComponents/Pagination";
import CourseSearchFilter from "../../components/courses/CourseSearchFilter";
import {
  deleteCourse,
  getAllCourses,
  paginate,
  queryCourses,
  resetDeleteCourseApi,
  resetSearchedCourses,
  resetVisibilityApi,
} from "../../features/newCourseSlice";
import CourseCard from "../../components/courses/CourseCard";

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

const Courses = () => {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const {
    allCourses,
    searchedCourses,
    allCoursesApiInfo,
    searchCourseApiInfo,
    deleteCourseApiInfo,
    visibilityApiInfo,
  } = useSelector((state) => state.course);

  const [searchQuery, setSearchQuery] = useState("");
  const [hovering, setHovering] = useState(false);
  const [selCourse, setSelCourse] = useState();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const coursesToShow = useMemo(() => {
    if (searchQuery?.length === 0) {
      return allCourses;
    } else if (searchQuery?.length >= 3 && searchedCourses) {
      return searchedCourses;
    } else {
      return allCourses;
    }
    // eslint-disable-next-line
  }, [searchedCourses, allCourses]);

  useEffect(() => {
    if (searchQuery?.length === 0) dispatch(resetSearchedCourses());
    if (searchQuery?.length >= 3) delayedSearch(searchQuery);
    // eslint-disable-next-line
  }, [searchQuery]);

  const delayedSearch = useMemo(
    () => debounce((query) => searchCourse(query), 500),
    // eslint-disable-next-line
    [searchQuery]
  );

  const searchCourse = async (query) => {
    dispatch(
      queryCourses({
        authToken: loggedInObject?.token,
        query,
      })
    );
  };

  useEffect(() => {
    // if (!allCourses) {
    dispatch(
      getAllCourses({
        authToken: loggedInObject?.token,
        dataURL: `${baseUrl}/users/course/?dashboard=true`,
      })
    );
    // }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (deleteCourseApiInfo?.response) {
      toast.success("Course deleted successfully.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetDeleteCourseApi());
    }
    // eslint-disable-next-line
  }, [deleteCourseApiInfo?.response]);

  useEffect(() => {
    if (visibilityApiInfo?.response) {
      toast.success(
        visibilityApiInfo?.response?.is_active
          ? "Course is visible now."
          : "Course is hidden now",
        {
          position: toast.POSITION.TOP_CENTER,
          progressStyle: { backgroundColor: "#014493" },
        }
      );
      dispatch(resetVisibilityApi());
    }
    // eslint-disable-next-line
  }, [visibilityApiInfo]);

  const removeCourse = () => {
    setOpenConfirmModal(false);
    setSelCourse(null);
    dispatch(
      deleteCourse({ authToken: loggedInObject?.token, courseId: selCourse })
    );
  };

  const paginateCourses = (url) => {
    dispatch(
      paginate({
        authToken: loggedInObject?.token,
        url,
      })
    );
  };

  const handlePageSelect = (pageNumber) => {
    let newLink,
      pageSplit = "";
    if (coursesToShow?.result?.next)
      pageSplit = coursesToShow?.result?.next?.split("page=");
    else pageSplit = coursesToShow?.result?.previous?.split("page=");
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
    // paginateCourse(newLink.replace("http", "https"));
  };

  return (
    <Layout>
      <CustomTopInfo heading="Courses" />
      <div className={classes.container}>
        <div className={classes.topSection}>
          <div style={{ fontSize: 22, fontFamily: "heavy", color: "#134696" }}>
            Best learning experience in Real Estate
          </div>
          <div
            className={classes.addBtn}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            style={{
              padding: hovering ? "10px 40px" : 10,
            }}
            onClick={() => history.push("/add-course")}
          >
            {hovering ? (
              <span className={classes.btnText}>ADD Course</span>
            ) : (
              <AddIcon style={{ color: "white" }} />
            )}
          </div>
        </div>
        <Divider style={{ margin: "0 35px" }} />
        <CourseSearchFilter
          searchQuery={searchQuery || ""}
          setSearchQuery={setSearchQuery}
        />
        <Grid container justifyContent="flex-start" sx={{ p: 3 }} spacing={2}>
          {allCoursesApiInfo?.loading ||
          searchCourseApiInfo?.loading ||
          deleteCourseApiInfo?.loading ? (
            <Loader />
          ) : (
            coursesToShow?.results.map((course, index) => (
              <Grid
                item
                key={index}
                xs={11.9}
                sm={11.9}
                md={5.9}
                lg={4}
                xl={4}
                sx={{
                  my: 1,
                  height: 228,
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <CourseCard
                  course={course}
                  selCourse={selCourse}
                  setSelCourse={setSelCourse}
                  setOpenConfirmModal={setOpenConfirmModal}
                />
              </Grid>
            ))
          )}
        </Grid>
      </div>
      {coursesToShow?.result?.results?.length > 0 && (
        <Pagination
          data={coursesToShow?.result}
          page={handlePageSelect}
          paginate={paginateCourses}
        />
      )}
      {openConfirmModal && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title="Are you sure you want to delete this course?"
          handleConfirm={removeCourse}
          setSelItem={setSelCourse}
        />
      )}
    </Layout>
  );
};

export default Courses;
