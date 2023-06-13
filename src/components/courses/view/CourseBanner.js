import React from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Dot from "./Dot";
import { Grid } from "@mui/material";
import lessonBanner from "../../../assets/courses/courseThumbnail.jpg";
import { baseUrl } from "../../constants/baseUrls";
import Loader from "../../../customComponents/Loader";
import { Button } from "@mui/material";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";

const useStyles = makeStyles(() => ({
  backButton: {
    left: "3%",
    marginTop: "20%",
    transform: "translateY(-50%)",
    color: "#134696",
    padding: 5,
    fontSize: 14,
    fontFamily: "medium",
    width: 110,
    cursor: "pointer",
  },
  main: {
    margin: 0,
    position: "relative",
    top: "20%",
    transform: "translate(2%,-60%)",
    zIndex: 2,
  },
  courseNumber: {
    fontSize: 25,
    fontFamily: "medium",
    margin: "20px 0 5px 0",
    color: "#0ed864", // green color
  },
  communicationText: {
    fontSize: 45,
    fontFamily: "medium",
    color: "#134696", // blue color
    textTransform: "capitalize",
  },
}));

const CourseBanner = () => {
  const classes = useStyles();
  const history = useHistory();

  const { courseDetail, courseDetailApiInfo } = useSelector(
    (state) => state.course
  );

  return (
    <>
      {courseDetailApiInfo?.loading ? (
        <Loader />
      ) : (
        <Grid container justifyContent="center">
          <Grid item xs={10} sm={10} md={4} lg={3.5} xl={3.5}>
            <div className={classes.backButton}>
              <Button
                sx={{
                  background:
                    "linear-gradient(90deg, rgba(14,216,100,0.9) 50%, rgba(0,0,0,0) 100%)",
                  textTransform: "none",
                  color: "#134696",
                  width: 150,
                  borderRadius: 0,
                }}
                startIcon={
                  <KeyboardBackspaceSharpIcon
                    style={{ color: "#134696", marginLeft: -30 }}
                  />
                }
                onClick={() => history.goBack()}
              >
                Back
              </Button>
            </div>
            <div className={classes.main}>
              <div className={classes.courseNumber}>
                COURSE {courseDetail?.id}
              </div>
              <div className={classes.communicationText}>
                {courseDetail?.title}
              </div>
            </div>
          </Grid>
          <Grid
            item
            xs={10}
            sm={10}
            md={7}
            lg={7.5}
            xl={7.5}
            sx={{ overflow: "hidden", backgroundColor: "blue" }}
          >
            <div style={{ display: "flex", position: "absolute" }}>
              <Dot color="#134696" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#ffffff" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#ffffff" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#ffffff" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#ffffff" style={{ margin: "10px 25px 50px 25px" }} />
            </div>
            <div
              style={{ display: "flex", position: "absolute", marginTop: 100 }}
            >
              <Dot color="#134696" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#134696" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#134696" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#ffffff" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#ffffff" style={{ margin: "10px 25px 50px 25px" }} />
            </div>
            <div
              style={{ display: "flex", position: "absolute", marginTop: 200 }}
            >
              <Dot color="#134696" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#134696" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#134696" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#134696" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#134696" style={{ margin: "10px 25px 50px 25px" }} />
            </div>
            <div
              style={{ display: "flex", position: "absolute", marginTop: 300 }}
            >
              <Dot color="#134696" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#134696" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#134696" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#134696" style={{ margin: "10px 25px 50px 25px" }} />
              <Dot color="#134696" style={{ margin: "10px 25px 50px 25px" }} />
            </div>
            <img
              alt="lesson-banner"
              src={
                courseDetail?.thumbnail
                  ? baseUrl + "/" + courseDetail?.thumbnail
                  : lessonBanner
              }
              style={{ width: "100%", maxHeight: 400 }}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default CourseBanner;
