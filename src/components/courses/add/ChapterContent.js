import React from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import { validateInputs } from "../../constants/helperFunctions";
import { setCourseData } from "../../../features/newCourseSlice";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    // position: "relative",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 7.5px",
    // margin: "25px 50px",
    minHeight: "200px",
    backgroundPosition: "center !important",
    backgroundRepeat: "no-repeat !important",
    backgroundSize: "cover !important",
    width: "50wh",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    zIndex: 0,
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
};

const ChapterContent = ({ title, attribute, moduleIndex, chapterIndex }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let darkMode = false;

  const { courseData } = useSelector((state) => state.course);

  const handleImagePicker = (prop) => (event) => {
    dispatch(
      setCourseData({
        ...courseData,
        modules: courseData?.modules?.map((speceificChapterElem, pos) => {
          if (pos === moduleIndex)
            return {
              ...speceificChapterElem,
              chapters: speceificChapterElem.chapters?.map((se, si) => {
                if (si === chapterIndex)
                  return {
                    ...se,
                    [prop]: event.target.files[0],
                  };
                else return se;
              }),
            };
          else return speceificChapterElem;
        }),
      })
    );
  };

  const handleRemoveImage = (prop) => {
    dispatch(
      setCourseData({
        ...courseData,
        modules: courseData?.modules?.map((speceificChapterElem, pos) => {
          if (pos === moduleIndex)
            return {
              ...speceificChapterElem,
              chapters: speceificChapterElem.chapters?.map((se, si) => {
                if (si === chapterIndex)
                  return {
                    ...se,
                    [prop]: null,
                  };
                else return se;
              }),
            };
          else return speceificChapterElem;
        }),
      })
    );
  };

  return (
    <div className={classes.container}>
      <span
        className={classes.title}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        {title}
      </span>
      <>
        {courseData?.modules[moduleIndex]?.chapters[chapterIndex]?.[
          attribute
        ] && (
          <>
            <img
              src={URL.createObjectURL(
                courseData?.modules[moduleIndex]?.chapters[chapterIndex]?.[
                  attribute
                ]
              )}
              alt=""
              className={classes.background}
            />
            <IconButton
              sx={crossButton}
              component="label"
              onClick={() => handleRemoveImage(attribute)}
            >
              <CancelIcon style={{ color: darkMode ? "#0ed864" : "#134696" }} />
            </IconButton>
          </>
        )}
        {!courseData?.modules[moduleIndex]?.chapters[chapterIndex]?.[
          attribute
        ] && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IconButton
              sx={{
                backgroundColor: darkMode ? "#212124" : "#fff",
              }}
              component="label"
            >
              <input
                hidden
                accept=".doc, .pdf"
                type="file"
                onInput={handleImagePicker(attribute)}
              />
              <AddIcon style={{ color: darkMode ? "#0ed864" : "#134696" }} />
            </IconButton>
            {/* Validation */}
            {/* {courseData?.thumbnailValidation && (
              <span className={classes.helperText}>
                {courseData?.thumbnailValidation}
              </span>
            )} */}
          </div>
        )}
      </>
    </div>
  );
};

export default ChapterContent;
