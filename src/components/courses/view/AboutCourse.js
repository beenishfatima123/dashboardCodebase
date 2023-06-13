import React from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import headingPattern from "../../../assets/courses/headingPattern.png";
import ShowIcon from "@mui/icons-material/Visibility";
import HideIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/CancelOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { toggleVisibility } from "../../../features/newCourseSlice";

const useStyles = makeStyles(() => ({
  headingPattern: {
    position: "absolute",
    left: "9vw",
    marginTop: 20,
    marginBottom: 5,
  },
  heading: {
    fontSize: 32,
    fontFamily: "heavy",
    color: "#134696",
    marginLeft: "3vw",
    marginTop: 50,
    marginBottom: -70,
  },
  text1: {
    color: "#7d7d7d",
    fontSize: 18,
    margin: "15px 0px",
  },
  text2: {
    color: "#7d7d7d",
    fontSize: 18,
  },
  bottomBorder: {
    height: 1,
    width: "100%",
    backgroundColor: "#707070",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: "1%",
    marginRight: "3%",
    gap: "20px",
  },
}));

const AboutCourse = ({ setSelCourse, setOpenConfirmModal }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { courseDetail, visibilityApiInfo } = useSelector(
    (state) => state.course
  );
  const loggedInObject = useSelector((state) => state.auth.currentUser);

  const toggleView = () => {
    setSelCourse(courseDetail?.id);
    let formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({ is_active: !courseDetail?.is_active })
    );
    dispatch(
      toggleVisibility({
        type: "course",
        contentID: courseDetail?.id,
        authToken: loggedInObject?.token,
        values: formData,
      })
    );
  };

  return (
    <>
      <div>
        <div className={classes.heading}>About the course</div>
        <img className={classes.headingPattern} alt="" src={headingPattern} />
      </div>
      <div className={classes.bottomBorder} />
      <div className={classes.btnContainer}>
        <>
          {visibilityApiInfo?.updatingCourse ? (
            <CircularProgress
              size={45}
              sx={{
                color: "#134696",
              }}
            />
          ) : courseDetail?.is_active ? (
            <ShowIcon
              sx={{
                fontSize: 20,
                cursor: "pointer",
                height: "55px",
                width: "48px",
              }}
              onClick={toggleView}
            />
          ) : (
            <HideIcon
              sx={{
                fontSize: 20,
                cursor: "pointer",
                height: "55px",
                width: "48px",
              }}
              onClick={toggleView}
            />
          )}
          <EditIcon
            sx={{
              fontSize: 20,
              cursor: "pointer",
              height: "55px",
              width: "48px",
            }}
          />
          <DeleteIcon
            sx={{
              fontSize: 20,
              cursor: "pointer",
              color: "red",
              height: "55px",
              width: "48px",
            }}
            onClick={() => {
              setSelCourse(courseDetail?.id);
              setOpenConfirmModal(true);
            }}
          />{" "}
        </>
      </div>
      <Grid container justifyContent="center" sx={{ mt: 5 }}>
        <Grid item xs={10} sm={10} md={11} lg={11}>
          <div className={classes.text1}>{courseDetail?.description}</div>
        </Grid>
      </Grid>
    </>
  );
};

export default AboutCourse;
