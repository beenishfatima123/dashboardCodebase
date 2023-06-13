import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import Layout from "../../customComponents/layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../customComponents/Loader";
import { toast } from "react-toastify";
import { Grid } from "@mui/material";
import ConfirmModal from "../../components/miscellaneousComponents/ConfirmModal";
import {
  deleteCourse,
  getCourseDetail,
  resetVisibilityApi,
} from "../../features/newCourseSlice";
import CourseBanner from "../../components/courses/view/CourseBanner";
import AboutCourse from "../../components/courses/view/AboutCourse";
import Modules from "../../components/courses/view/Modules";
import ModuleContainer from "../../components/courses/view/modules/ModuleContainer";

const CourseDetail = () => {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const { moduleDetail, courseDetailApiInfo, visibilityApiInfo } = useSelector(
    (state) => state.course
  );

  const [selCourse, setSelCourse] = useState();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  useEffect(() => {
    dispatch(
      getCourseDetail({
        authToken: loggedInObject?.token,
        courseId: params?.id,
      })
    );
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (visibilityApiInfo?.response) {
      toast.success(
        visibilityApiInfo?.response?.is_active
          ? `${
              visibilityApiInfo?.toggleType?.charAt(0)?.toUpperCase() +
              visibilityApiInfo?.toggleType?.slice(1)
            } is visible now.`
          : `${
              visibilityApiInfo?.toggleType?.charAt(0)?.toUpperCase() +
              visibilityApiInfo?.toggleType?.slice(1)
            } is hidden now.`,
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
    dispatch(
      deleteCourse({ authToken: loggedInObject?.token, courseId: selCourse })
    );
    setSelCourse(null);
    history.push("/courses");
  };

  return (
    <Layout>
      {courseDetailApiInfo?.loading ? (
        <Loader />
      ) : moduleDetail ? (
        <ModuleContainer />
      ) : (
        <>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <CourseBanner />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <AboutCourse
                setSelCourse={setSelCourse}
                setOpenConfirmModal={setOpenConfirmModal}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Modules />
            </Grid>
          </Grid>
          {openConfirmModal && (
            <ConfirmModal
              open={openConfirmModal}
              setOpen={setOpenConfirmModal}
              title="Are you sure you want to delete this course?"
              handleConfirm={removeCourse}
              setSelItem={setSelCourse}
            />
          )}
        </>
      )}
    </Layout>
  );
};

export default CourseDetail;
