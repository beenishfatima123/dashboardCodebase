import React from "react";
import { Grid } from "@mui/material";
import CourseInfo from "./CourseInfo";
import CourseChapterDetail from "./CourseChapterDetail";
import ChapterVideos from "../chapters/ChapterVideos";

const ModuleContainer = () => {
  return (
    <Grid container justifyContent="center">
      <CourseInfo />
      <ChapterVideos />
      <CourseChapterDetail />
    </Grid>
  );
};

export default ModuleContainer;
