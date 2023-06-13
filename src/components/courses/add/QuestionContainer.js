import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  FormControlLabel,
  IconButton,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputField from "../../listing/edit/InputField";
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
  label: {
    fontSize: 15,
    color: "#134696",
    fontFamily: "heavy",
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
  zIndex: 20,
};

const QuestionContainer = ({ index, elem, deleteControl }) => {
  let darkMode = false;
  const classes = useStyles();

  const dispatch = useDispatch();

  const { courseData } = useSelector((state) => state.course);

  const addQuestion = () => {
    const _temp = {
      ...courseData,
      modules: courseData?.modules?.map((questionElem, pos) => {
        if (pos === index)
          return {
            ...questionElem,
            questions: [
              ...questionElem?.questions,
              {
                // question: "",
                // correct_answer: "",
                // option_1: "",
                // option_2: "",
                // option_3: "",
                // option_4: "",
              },
            ],
          };
        else return questionElem;
      }),
    };
    dispatch(setCourseData(_temp));
  };

  const handleChange = (prop, index, qIndex) => (event) => {
    dispatch(
      setCourseData({
        ...courseData,
        modules: courseData?.modules?.map((elem, pos) => {
          if (pos === index)
            return {
              ...elem,
              questions: elem.questions?.map((se, si) => {
                if (si === qIndex)
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

  return (
    // {/* Question Details */}
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      {elem?.questions?.map((qItem, Qindex) => (
        <Grid key={`ques-${Qindex}`} item lg={12} md={12} xs={12}>
          <div style={{ position: "relative" }}>
            <IconButton
              sx={crossButton}
              component="label"
              onClick={() => deleteControl("question", index, null, Qindex)}
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
                  Question:{" "}
                  {elem?.questions[Qindex]?.question ? (
                    <span
                      className={classes.title}
                      style={{
                        color: "red",
                      }}
                    >
                      {elem?.questions[Qindex]?.question}
                    </span>
                  ) : (
                    ""
                  )}
                </span>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={0}>
                  <>
                    <Grid item xs={12} sm={12} md={12}>
                      <InputField
                        name="question"
                        label="Question"
                        placeholder="Question"
                        type="text"
                        onChange={handleChange("question", index, Qindex)}
                        value={
                          courseData?.modules[index]?.questions[Qindex]
                            ?.question
                        }
                      />
                      {/* Question Delete Button */}
                      {/* <DeleteOutlineIcon
                        fontSize="small"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          deleteControl("question", index, null, Qindex)
                        }
                      /> */}
                    </Grid>
                    <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                      <Grid item lg={6} md={6} xs={12}>
                        <InputField
                          name="option_1"
                          label="Option one"
                          placeholder="Option one"
                          value={
                            courseData?.modules[index]?.questions[Qindex]
                              ?.option_1
                          }
                          type="text"
                          onChange={handleChange("option_1", index, Qindex)}
                        />
                      </Grid>
                      <Grid item lg={6} md={6} xs={12}>
                        <InputField
                          name="option_2"
                          label="Option two"
                          placeholder="Option two"
                          value={
                            courseData?.modules[index]?.questions[Qindex]
                              ?.option_2
                          }
                          type="text"
                          onChange={handleChange("option_2", index, Qindex)}
                        />
                      </Grid>
                      <Grid item lg={6} md={6} xs={12}>
                        <InputField
                          name="option_3"
                          label="Option three"
                          placeholder="Option three"
                          value={
                            courseData?.modules[index]?.questions[Qindex]
                              ?.option_3
                          }
                          type="text"
                          onChange={handleChange("option_3", index, Qindex)}
                        />
                      </Grid>
                      <Grid item lg={6} md={6} xs={12}>
                        <InputField
                          name="option_4"
                          label="Option Four"
                          placeholder="Option Four"
                          value={
                            courseData?.modules[index]?.questions[Qindex]
                              ?.option_4
                          }
                          type="text"
                          onChange={handleChange("option_4", index, Qindex)}
                        />
                      </Grid>
                    </Grid>
                    <Box
                      sx={{
                        marginTop: "5px",
                        width: "100%",
                      }}
                    >
                      <Grid item lg={12} md={12} xs={12}>
                        <FormControl
                          fullWidth
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <FormLabel id="group-label" className={classes.label}>
                            Correct Option:&nbsp;
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="group-label"
                            name="correct_answer"
                            value={
                              courseData?.modules[index]?.questions[Qindex]
                                ?.correct_answer ?? ""
                            }
                            onChange={handleChange(
                              "correct_answer",
                              index,
                              Qindex
                            )}
                          >
                            <FormControlLabel
                              size="small"
                              key="option_1"
                              value="option_1"
                              control={<Radio />}
                              label="Option1"
                            />
                            <FormControlLabel
                              size="small"
                              key="option_2"
                              value="option_2"
                              control={<Radio />}
                              label="Option2"
                            />
                            <FormControlLabel
                              size="small"
                              key="option_3"
                              value="option_3"
                              control={<Radio />}
                              label="Option3"
                            />
                            <FormControlLabel
                              size="small"
                              key="option_4"
                              value="option_4"
                              control={<Radio />}
                              label="Option4"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    </Box>
                    <Divider variant="middle" sx={{ mb: "20px" }} />
                  </>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className={classes.divider} />
        </Grid>
      ))}
      {/* Add Question Button */}
      <Grid item sx={{ padding: "2px" }}>
        <Button
          onClick={() => {
            addQuestion();
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
          Add Question
        </Button>
      </Grid>
    </div>
  );
};

export default QuestionContainer;
