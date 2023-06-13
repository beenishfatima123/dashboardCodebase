import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  IconButton,
  Grid,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import InputField from "../../listing/edit/InputField";
import ChapterContent from "./ChapterContent";
import { setCourseData } from "../../../features/newCourseSlice";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
  title: {
    fontSize: 24,
    fontFamily: "medium",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#bbbbbb",
    margin: "20px 0px",
  },
  helperText: {
    fontSize: 12,
    color: "red",
    alignSelf: "flex-start",
    marginTop: 3,
  },
}));

const crossButton = {
  position: "absolute",
  top: -10,
  right: -10,
  p: 0,
  zIndex: 30,
};

const ChapterContainer = ({ index, elem, deleteControl }) => {
  let darkMode = false;
  const classes = useStyles();

  const dispatch = useDispatch();

  const { courseData } = useSelector((state) => state.course);

  const handleChange = (prop, index, cIndex) => (event) => {
    dispatch(
      setCourseData({
        ...courseData,
        modules: courseData?.modules?.map((elem, pos) => {
          if (pos === index)
            return {
              ...elem,
              chapters: elem.chapters?.map((se, si) => {
                if (si === cIndex)
                  return {
                    ...se,
                    [prop]: event.target.value,
                  };
                else return se;
              }),
            };
          else return elem;
        }),
      })
    );
  };

  const addNewChapter = () => {
    const _temp = {
      ...courseData,
      modules: courseData?.modules?.map((chapterElem, pos) => {
        if (pos === index)
          return {
            ...chapterElem,
            chapters: [...chapterElem?.chapters, {}],
          };
        else return chapterElem;
      }),
    };
    dispatch(setCourseData(_temp));
  };

  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      {elem?.chapters?.map((cItem, cIndex) => (
        <>
          <Grid key={`chap-${cIndex}`} item lg={12} md={12} xs={12}>
            <div style={{ position: "relative" }}>
              <IconButton
                sx={crossButton}
                component="label"
                onClick={() => deleteControl("chapter", index, cIndex)}
              >
                <CancelIcon
                  style={{ color: darkMode ? "#0ed864" : "#134696" }}
                />
              </IconButton>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <span
                    className={classes.title}
                    style={{
                      color: darkMode ? "#0ed864" : "#134696",
                    }}
                  >
                    Chapter's Detail: {cIndex + 1}
                  </span>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid key={`chapp-${cIndex}`} container spacing={2}>
                    <Grid item lg={6} md={6} xs={11}>
                      <InputField
                        placeholder="Chapter Title"
                        value={
                          courseData?.modules[index]?.chapters[cIndex]?.title
                        }
                        onChange={handleChange("title", index, cIndex)}
                        type="text"
                        label="Title"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={11}>
                      <InputField
                        placeholder="Chapter Description"
                        value={
                          courseData?.modules[index]?.chapters[cIndex]
                            ?.description
                        }
                        onChange={handleChange("description", index, cIndex)}
                        type="text"
                        label="Description"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={11}>
                      <InputField
                        placeholder="Video Link"
                        value={
                          courseData?.modules[index]?.chapters[cIndex]?.link
                        }
                        onChange={handleChange("link", index, cIndex)}
                        type="text"
                        label="Video Link"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={11}>
                      <InputField
                        placeholder="Duration"
                        value={
                          courseData?.modules[index]?.chapters[cIndex]?.duration
                        }
                        onChange={handleChange("duration", index, cIndex)}
                        type="text"
                        label="Duration"
                      />
                    </Grid>
                    <Grid item lg={12} md={12} xs={11}>
                      <ChapterContent
                        title={"Upload Handouts"}
                        attribute={"handout"}
                        moduleIndex={index}
                        chapterIndex={cIndex}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </div>
          </Grid>
          <Typography
            component="div"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "20px",
            }}
          ></Typography>
        </>
      ))}
      {/* Add More Button */}
      <Grid item sx={{ padding: "2px" }}>
        <Button
          onClick={() => {
            addNewChapter();
          }}
          startIcon={<AddIcon />}
          sx={{
            color: "#FFFFFF",
            fontSize: 14,
            fontFamily: "medium",
            cursor: "pointer",
            display: "flex",
            justifyContent: "flex-end",
            margin: "10px 0px",
            textTransform: "none",
            backgroundColor: "#134696",
            "&:hover": {
              color: "#ffffff",
              backgroundColor: "#134696",
            },
          }}
        >
          Add Chapter
        </Button>
      </Grid>
    </div>
  );
};

export default ChapterContainer;
