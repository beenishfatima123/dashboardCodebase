import React from "react";
import { Grid } from "@mui/material";
import ChapterContainer from "../chapters/ChapterContainer";

const CourseChapterDetail = () => {
  return (
    <Grid container justifyContent="center" sx={{ my: 2, height: 300 }}>
      <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
        <ChapterContainer />
      </Grid>
    </Grid>
  );
};

export default CourseChapterDetail;
