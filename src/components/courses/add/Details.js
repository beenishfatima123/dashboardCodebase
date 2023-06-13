import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import InputField from "../../listing/edit/InputField";
import { validateInputs } from "../../constants/helperFunctions";
import { setCourseData } from "../../../features/newCourseSlice";
import { COURSE_PLANS } from "../../constants/global";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    margin: "25px 50px",
  },
  title: {
    fontSize: 24,
    fontFamily: "medium",
  },
  label: {
    fontSize: 15,
    color: "#134696",
    fontFamily: "heavy",
  },
  helperText: {
    fontSize: 12,
    color: "red",
    alignSelf: "flex-start",
    marginTop: 3,
  },
  "@media (max-width: 500px)": {
    title: {
      fontSize: 28,
    },
  },
}));

const course_features = [
  {
    code: "difficulty",
    label: "Difficulty Level",
  },
  {
    code: "language",
    label: "Language",
  },
  {
    code: "time_to_complete",
    label: "Time to complete",
  }
];
const Details = ({ validation, setValidation }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let darkMode = false;

  const { courseData } = useSelector((state) => state.course);

  const handleChange = (prop) => (event) => {
    dispatch(setCourseData({ ...courseData, [prop]: event.target.value }));
    setValidation((prev) => ({
      ...prev,
      [`${prop}Validation`]: validateInputs(prop, event.target.value),
    }));
  };

  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      <span
        className={classes.title}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        Details
      </span>

      <Grid container sx={{ mt: 2 }} columnSpacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <span
            className={classes.label}
            style={{
              color: darkMode ? "#0ed864" : "#134696",
            }}
          >
            Course Plan
          </span>
          <div className="listingsSelectDiv">
            <select
              label="Select Plan"
              name="plan"
              required
              defaultValue={courseData?.plan}
              value={courseData?.plan || "DEFAULT"}
              onChange={handleChange("plan")}
            >
              <option value="DEFAULT" disabled>
                Select Course Plan
              </option>
              {COURSE_PLANS?.map((plan, index) => (
                <option value={plan?.code} key={index}>
                  {plan?.title}
                </option>
              ))}
            </select>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <InputField
            placeholder="Course Title"
            value={courseData?.title}
            onChange={handleChange("title")}
            type="text"
            label="Title"
            validating={validation?.titleValidation}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <InputField
            placeholder="Course Description"
            value={courseData?.description}
            onChange={handleChange("description")}
            type="area"
            label="Description"
            validating={validation?.descriptionValidation}
          />
        </Grid>
        <Grid item xs={12}>
          {" "}
          <div
            style={{
              // border: "1px solid #134696",
              borderRadius: "5px",
              marginTop: 5,
              padding: 4,
            }}
          >
            <span
              className={classes.title}
              style={{
                color: darkMode ? "#0ed864" : "#134696",
              }}
            >
              Features
            </span>
            <Grid
              container
              justifyContent="space-between"
              spacing={2}
              marginTop={"0px"}
            >
              {course_features.map((item, index) => (
                <Grid item key={index} xs={6} sm={6} md={6} lg={4} xl={4}>
                  <InputField
                    placeholder={item?.label}
                    value={courseData?.[item?.code]}
                    onChange={handleChange(item?.code)}
                    type="text"
                    label={item?.label}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Details;
