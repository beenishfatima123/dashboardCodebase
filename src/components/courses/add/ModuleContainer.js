import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { setCourseData } from "../../../features/newCourseSlice";
import InputField from "../../listing/edit/InputField";
import ChapterContainer from "./ChapterContainer";
import QuestionContainer from "./QuestionContainer";

const module_features = [
  {
    code: "difficulty",
    label: "Difficulty Level",
  },
  {
    code: "time_to_complete",
    label: "Time to complete",
  },
];

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
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#bbbbbb",
    margin: "10px 0px",
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
  zIndex: 10,
};

const ModuleContainer = ({ deleteControl }) => {
  let darkMode = false;
  const classes = useStyles();

  const dispatch = useDispatch();

  const { courseData } = useSelector((state) => state.course);

  const handleModuleAddClick = () => {
    dispatch(
      setCourseData({
        ...courseData,
        modules: [
          ...courseData?.modules,
          {
            questions: [],
            chapters: [],
          },
        ],
      })
    );
  };

  const handleChange = (prop, index) => (event) => {
    dispatch(
      setCourseData({
        ...courseData,
        modules: courseData?.modules?.map((elem, pos) => {
          if (pos === index)
            return {
              ...elem,
              [prop]: event.target.value,
            };
          else return elem;
        }),
      })
    );
  };

  return (
    // {/* MODULE DETAILS */}
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      {courseData?.modules?.map((elem, index) => (
        <Grid key={`mod-${index}`} item lg={12} md={12} xs={12}>
          <div style={{ position: "relative" }}>
            <IconButton
              sx={crossButton}
              component="label"
              onClick={() => deleteControl("module", index, null, null)}
            >
              <CancelIcon style={{ color: darkMode ? "#0ed864" : "#134696" }} />
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
                  Module's Detail:{" "}
                  {courseData?.modules[index]?.title ? (
                    <span
                      className={classes.title}
                      style={{
                        color: "red",
                      }}
                    >
                      ({courseData?.modules[index]?.title})
                    </span>
                  ) : (
                    ""
                  )}
                </span>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={12}>
                    <InputField
                      placeholder="Module Title"
                      value={courseData?.modules[index]?.title}
                      onChange={handleChange("title", index)}
                      type="text"
                      label="Title"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <InputField
                      placeholder="Module Description"
                      value={courseData?.modules[index]?.description}
                      onChange={handleChange("description", index)}
                      type="area"
                      label="Description"
                    />
                  </Grid>
                  {/* Module Features */}
                  <Grid item xs={12}>
                    {" "}
                    <div
                      style={{
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
                        {module_features.map((item, fIndex) => (
                          <Grid
                            item
                            key={fIndex}
                            xs={6}
                            sm={6}
                            md={6}
                            lg={6}
                            xl={6}
                          >
                            <InputField
                              placeholder={item?.label}
                              value={courseData?.modules[index]?.[item?.code]}
                              onChange={handleChange(item?.code, index)}
                              type="text"
                              label={item?.label}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
                <ChapterContainer
                  elem={elem}
                  index={index}
                  deleteControl={deleteControl}
                />
                <Typography
                  component="div"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: "20px",
                  }}
                ></Typography>
                <QuestionContainer
                  elem={elem}
                  index={index}
                  deleteControl={deleteControl}
                />
              </AccordionDetails>
            </Accordion>
          </div>
          <div className={classes.divider} />
        </Grid>
      ))}
      <Grid item sx={{ padding: "2px" }}>
        <Button
          onClick={() => {
            handleModuleAddClick();
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
          Add Module
        </Button>
      </Grid>
    </div>
  );
};

export default ModuleContainer;
