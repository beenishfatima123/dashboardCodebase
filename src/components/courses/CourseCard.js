import React from "react";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress } from "@mui/material";
import { baseUrl } from "../constants/baseUrls";
import DeleteIcon from "@mui/icons-material/CancelOutlined";
import ShowIcon from "@mui/icons-material/Visibility";
import HideIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import courseThumbnail from "../../assets/courses/courseThumbnail.jpg";
import zeeracLogo from "../../assets/courses/zeerac.png";
import { toggleVisibility } from "../../features/newCourseSlice";

const useStyles = makeStyles(() => ({
  thumbnail: {
    height: 228,
    width: "100%",
    objectFit: "cover",
    filter: "grayscale(95%)",
    "&:hover": {
      filter: "grayscale(0%)",
    },
  },
  courseContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1,
    padding: "5px 10px",
    marginTop: -80,
  },
  courseName: {
    fontFamily: "medium",
    color: "#ffffff",
    fontSize: 18,
    marginBottom: 5,
    zIndex: 1,
    textTransform: "uppercase",
  },
  courseTitle: {
    fontFamily: "medium",
    color: "#ffffff",
    fontSize: 22,
    zIndex: 1,
    width: "100%",
  },
  courseNumberMain: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  courseNumberId: {
    fontSize: 36,
    color: "#0ed864", // green color
    zIndex: 1,
  },
  courseNumberName: {
    position: "absolute",
    opacity: 0.6,
    fontSize: 12,
    color: "#134696", // blue color
    zIndex: 1,
  },
  btnContainer: {
    display: "flex",
    justifyContent: "flex-end",
    background: `linear-gradient(to top, rgba(0,0,0,0) 20%, rgba(0,0,0,1))`,
    width: "100%",
  },
  iconStyle: {
    cursor: "pointer",
    color: "#FFFFFF",
  },
}));

const CourseCard = ({
  course,
  selCourse,
  setSelCourse,
  setOpenConfirmModal,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const { visibilityApiInfo } = useSelector((state) => state.course);

  const toggleView = () => {
    setSelCourse(course?.id);
    let formData = new FormData();
    formData.append("data", JSON.stringify({ is_active: !course?.is_active }));
    dispatch(
      toggleVisibility({
        type: "course",
        contentID: course?.id,
        authToken: loggedInObject?.token,
        values: formData,
      })
    );
  };

  return (
    <>
      <img
        alt="thumbnail"
        src={
          course?.thumbnail
            ? baseUrl + "/" + course?.thumbnail
            : courseThumbnail
        }
        className={classes.thumbnail}
        onClick={() => history.push(`/courseDetail/${course?.id}`)}
      />
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 10,
          display: "flex",
          width: "70%",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button>
          {visibilityApiInfo?.updatingCourse && selCourse === course?.id ? (
            <CircularProgress
              size={25}
              sx={{
                color: "#134696",
              }}
            />
          ) : course?.is_active ? (
            <ShowIcon className={classes.iconStyle} onClick={toggleView} />
          ) : (
            <HideIcon className={classes.iconStyle} onClick={toggleView} />
          )}
        </Button>
        <Button>
          <EditIcon className={classes.iconStyle} />
        </Button>
        <Button>
          <DeleteIcon
            className={classes.iconStyle}
            onClick={() => {
              setSelCourse(course?.id);
              setOpenConfirmModal(true);
            }}
          />
        </Button>
      </div>
      <div>
        <img
          alt=""
          src={zeeracLogo}
          style={{
            position: "absolute",
            objectFit: "cover",
            width: 30,
            marginTop: -140,
            marginLeft: 10,
          }}
        />
        <div className={classes.courseContainer}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className={classes.courseName}>Course {course?.id}</div>
            <div className={classes.courseTitle}>{course?.title}</div>
          </div>
          <div className={classes.courseNumberMain}>
            <div className={classes.courseNumberId}>{course?.id}</div>
            <div className={classes.courseNumberName}>Course</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
