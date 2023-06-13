import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Divider, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ArrowBackIos } from "@mui/icons-material";
import timeIcon from "../../../../assets/courses/time.png";
import levelIcon from "../../../../assets/courses/level.png";
import languageIcon from "../../../../assets/courses/language.png";
import checkboxIcon from "../../../../assets/courses/checkbox.png";
import courseInfoLines from "../../../../assets/courses/courseInfoLines.png";
import ProfileMenu from "../../../../customComponents/profileMenu/ProfileMenu";
import { setModuleDetail } from "../../../../features/newCourseSlice";

const data = [
  {
    name: "Beginner Level",
    description: "No prior experience required",
    icon: levelIcon,
  },
  {
    name: "English Langugage",
    description: "No prior experience required",
    icon: languageIcon,
  },
  {
    name: "1 week to complete",
    description: "On the basis of 4hrs/day",
    icon: timeIcon,
  },
  {
    name: "Special Assignment",
    description: "Free checking by system",
    icon: checkboxIcon,
  },
];

const useStyles = makeStyles(() => ({
  courseLabel: {
    fontSize: 14,
    fontFamily: "medium",
    color: "#0ED864",
    textTransform: "uppercase",
  },
  courseName: {
    fontSize: 14,
    fontFamily: "medium",
    color: "#134696",
    textTransform: "uppercase",
  },
  courseTitle: {
    fontSize: 35,
    fontFamily: "medium",
    color: "#134696",
    textTransform: "uppercase",
    // width: '40%',
    marginTop: "1%",
  },
  instructorLabel: {
    fontSize: 17,
    fontFamily: "medium",
    color: "#0ED864",
  },
  instructorName: {
    fontSize: 21,
    fontFamily: "medium",
    color: "#134696",
    textTransform: "capitalize",
  },
  main: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  iconMain: {
    width: 61,
    height: 61,
    borderRadius: "50%",
    border: "1px solid #707070",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontFamily: "medium",
    color: "#134696",
    marginBottom: 5,
    marginLeft: 10,
  },
  description: {
    fontSize: 16,
    fontFamily: "medium",
    color: "#6B7B88",
    marginLeft: 10,
  },
  "@media (max-width: 1024px)": {
    courseTitle: {
      width: "80%",
    },
  },
}));

const CourseInfo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { moduleDetail } = useSelector((state) => state.course);

  return (
    <Grid container justifyContent="center" sx={{ mb: 1 }}>
      <Grid
        item
        xs={11}
        sm={11}
        md={11}
        lg={11}
        xl={11}
        sx={{
          mt: 5,
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          sx={{
            background:
              "linear-gradient(90deg, rgba(14,216,100,1) 0%, rgba(255,255,255,1) 100%)",
            textTransform: "none",
            color: "#134696",
            width: 150,
            mt: 3,
            borderRadius: 0,
          }}
          startIcon={<ArrowBackIos style={{ color: "#134696" }} />}
          onClick={() => dispatch(setModuleDetail(null))}
        >
          Back
        </Button>
        <ProfileMenu />
      </Grid>
      <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "30px 0 10px 0",
          }}
        >
          <div className={classes.courseLabel}>Course</div>
          <div className={classes.courseName}>{moduleDetail?.title}</div>
        </div>
      </Grid>
      <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
        <Divider sx={{ backgroundColor: "#0ED864" }} />
        <Grid container sx={{ my: 2 }}>
          <img
            alt="course-info-lines"
            src={courseInfoLines}
            style={{ position: "absolute", right: 0, zIndex: -1 }}
          />
          <Grid item xs={12} sm={12} md={7} lg={5} xl={5}>
            <div className={classes.courseTitle}>{moduleDetail?.title}</div>
          </Grid>
          <Grid container sx={{ my: 3 }}>
            <Grid item xs={3} sm={4} md={3} lg={3} xl={3}>
              <div>
                <div className={classes.instructorLabel}>Instructor</div>
                <div className={classes.instructorName}>
                  {moduleDetail?.instructor}
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={8} md={6} lg={7} xl={7}>
              <Grid container justifyContent="space-between" spacing={2}>
                {data.map((i, index) => (
                  <Grid
                    item
                    key={index}
                    xs={6}
                    sm={12}
                    md={12}
                    lg={5.7}
                    xl={5.7}
                  >
                    <div className={classes.main}>
                      <div className={classes.iconMain}>
                        <img alt={i.name} src={i.icon} />
                      </div>
                      <div>
                        <div className={classes.name}>{i.name}</div>
                        <div className={classes.description}>
                          {i.description}
                        </div>
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 3, backgroundColor: "#0ED864" }} />
      </Grid>
    </Grid>
  );
};

export default CourseInfo;
