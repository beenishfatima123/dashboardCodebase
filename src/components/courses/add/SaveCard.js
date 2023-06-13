import React from "react";
import { useHistory } from "react-router";
import { makeStyles } from "@mui/styles";
import { Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createProject, setProjectData } from "../../../features/projectSlice";
import { getProjectFormData } from "../../constants/helperFunctions";
import { setCourseData } from "../../../features/newCourseSlice";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
    margin: "25px 50px",
  },
  title: {
    fontSize: 24,
    fontFamily: "medium",
  },
  btnContainer: {
    display: "flex",
  },
  "@media (max-width: 500px)": {
    title: {
      fontSize: 28,
    },
  },
}));

const SaveCard = ({ installmentPlans }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();
  let darkMode = false;

  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const { projectData } = useSelector((state) => state.project);
  const { courseData } = useSelector((state) => state.course);

  const isInstallmentValid = async () => {
    for (const elem of installmentPlans) {
      if (
        elem?.durationValidation ||
        elem?.descriptionValidation ||
        elem?.amountValidation ||
        elem?.down_paymentValidation
      ) {
        return "Invalid data for installment plans";
      }
      if (elem?.amount < elem?.down_payment) {
        return "Price must be greater than down payment";
      }
    }
  };

  const isFormValid = async (data) => {
    if (!data?.project_title || data?.project_titleValidation)
      return "Project's title is required";
    else if (!data?.company) return "Select Company from list";
    else if (!data?.description) return "Description is required.";
    else if (!data?.feature_photo) return "Feature photo is required.";
    else if (data?.feature_photoValidation)
      return "Feature photo is discarded (size too large)";
  };

  const postProject = () => {
    dispatch(
      createProject({
        values: getProjectFormData(projectData, installmentPlans),
        token: loggedInObject?.token,
      })
    );
  };

  return (
    <div
      className={classes.container}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      <Grid
        container
        sx={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
        spacing={2}
      >
        <Grid item xs={6} md={4} sm={6} lg={6}>
          <Button
            fullWidth
            sx={{
              backgroundColor: darkMode ? "#0ed864" : "#134696",
              color: "#fff",
              fontFamily: "heavy",
              borderRadius: "7px",
              height: "54px",
              border: "1px solid #707070",
              fontSize: 13,
              mr: 1,
              "&:hover": {
                backgroundColor: darkMode ? "#0ed864" : "#134696",
              },
            }}
            onClick={() => {
              console.log({ courseData });
            }}
            // onClick={async () => {
            //   const formValid = await isFormValid(projectData);
            //   const instValid = await isInstallmentValid();
            //   if (!formValid && !instValid) postProject();
            //   else
            //     toast.error(formValid ? formValid : instValid, {
            //       position: toast.POSITION.TOP_CENTER,
            //       hideProgressBar: true,
            //     });
            // }}
          >
            Submit
          </Button>
        </Grid>
        <Grid item xs={6} md={4} sm={6} lg={6}>
          <Button
            fullWidth
            sx={{
              backgroundColor: "#fff",
              color: "#134696",
              fontFamily: "heavy",
              border: "1px solid #707070",
              borderRadius: "7px",
              height: "54px",
              fontSize: 15,
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              "&:hover": {
                backgroundColor: "#fff",
              },
            }}
            onClick={() => {
              dispatch(
                setCourseData({
                  modules: [
                    {
                      chapters: [],
                      questions: [],
                    },
                  ],
                })
              );
              // history.goBack();
            }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default SaveCard;
