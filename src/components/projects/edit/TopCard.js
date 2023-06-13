import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid } from "@mui/material";
import { useHistory } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  resetProjectToEdit,
  resetProjectUpdateInfo,
  setProjectToEdit,
  setProjectUpdateInfo,
  updateProject,
} from "../../../features/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateProjectFormData } from "../../constants/helperFunctions";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid #c9c9c9",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 3px",
    margin: "25px 50px",
  },
  title: {
    fontSize: 24,
    fontFamily: "heavy",
  },
  "@media (max-width: 500px)": {
    title: {
      fontSize: 28,
    },
  },
}));

const TopCard = ({ validation, installmentPlans, imageToDelete }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  let darkMode = false;

  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const { projectToEdit, projectUpdateInfo } = useSelector(
    (state) => state.project
  );

  const checkValidation = () => {
    let invalid = false;
    Object.keys(validation).forEach((element) => {
      if (validation?.[element]) invalid = validation?.[element];
    });
    return invalid;
  };

  const isInstallmentValid = () => {
    let elemIndex = 0;
    for (const elem of installmentPlans) {
      elemIndex++;
      if (
        !elem?.deleted &&
        (elem?.durationValidation ||
          elem?.descriptionValidation ||
          elem?.amountValidation ||
          elem?.down_paymentValidation)
      ) {
        return `Invalid data for installment plan No: ${elemIndex}`;
      }
      if (!elem?.deleted && elem?.amount < elem?.down_payment) {
        return `Price must be greater than down payment for plan No: ${elemIndex}`;
      }
    }
    return false;
  };

  function handleSubmit() {
    if (
      projectUpdateInfo ||
      imageToDelete.length > 0 ||
      projectUpdateInfo?.installmentEdited
    ) {
      let installmentsInvalid = false;
      const isFormInvalid = checkValidation();
      if (projectUpdateInfo?.installmentEdited) {
        installmentsInvalid = isInstallmentValid();
      }
      if (isFormInvalid || installmentsInvalid) {
        toast.error(isFormInvalid ? isFormInvalid : installmentsInvalid, {
          position: toast.POSITION.BOTTOM_RIGHT,
          progressStyle: { backgroundColor: "#014493" },
        });
      } else {
        dispatch(
          updateProject({
            edit: true,
            id: projectToEdit?.id,
            token: loggedInObject?.token,
            values: updateProjectFormData(projectUpdateInfo, installmentPlans, [
              ...new Set(imageToDelete),
            ]),
          })
        );
        dispatch(resetProjectUpdateInfo());
        dispatch(resetProjectToEdit());
      }
    } else
      toast.info("No changes made in project's details.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
      });
  }

  return (
    <div
      className={classes.container}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      <span
        className={classes.title}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        Edit Project
      </span>
      <Grid
        container
        sx={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
        spacing={2}
      >
        <Grid item xs={6} md={4} sm={6} lg={3}>
          <Button
            fullWidth
            sx={{
              backgroundColor: darkMode ? "#0ed864" : "#134696",
              color: "#fff",
              fontFamily: "heavy",
              borderRadius: 29,
              fontSize: 15,
              mr: 1,
              "&:hover": {
                backgroundColor: darkMode ? "#0ed864" : "#134696",
              },
            }}
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
        </Grid>
        <Grid item xs={6} md={4} sm={6} lg={3}>
          <Button
            fullWidth
            sx={{
              backgroundColor: "#fff",
              color: "#134696",
              fontFamily: "heavy",
              borderRadius: 29,
              fontSize: 15,
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              "&:hover": {
                backgroundColor: "#fff",
              },
            }}
            onClick={() => {
              dispatch(setProjectToEdit(null));
              dispatch(setProjectUpdateInfo(null));
              history.goBack();
            }}
            endIcon={
              <CancelIcon style={{ color: darkMode ? "#0ed864" : "#134696" }} />
            }
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default TopCard;
