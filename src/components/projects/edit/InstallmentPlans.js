import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { validateInputs } from "../../constants/helperFunctions";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import RemoveIcon from "@mui/icons-material/Remove";
import RestoreIcon from "@mui/icons-material/Restore";
import {
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import { setProjectUpdateInfo } from "../../../features/projectSlice";
import InputField from "../../listing/edit/InputField";
import ConfirmModal from "../../miscellaneousComponents/ConfirmModal";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    margin: "25px 74px",
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
    margin: "20px 0px",
  },
  addNew: {
    color: "#1d396b",
    fontSize: 14,
    fontFamily: "medium",
    cursor: "pointer",
    margin: "auto",
  },
  counterContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "13px 0px",
  },
  planContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  "@media (max-width: 500px)": {
    title: {
      fontSize: 28,
    },
  },
}));

const crossButton = {
  position: "absolute",
  top: -10,
  right: -10,
  p: 0,
};

const InstallmentPlans = ({ installmentPlans, setInstallmentPlans }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const darkMode = false;

  const { projectUpdateInfo } = useSelector((state) => state.project);

  const [deletePlanModal, setDeletePlanModal] = useState(false);
  const [planId, setPlanId] = useState();
  const handlePlanOpen = (id, status) => {
    setPlanId({ id, status });
    setDeletePlanModal(true);
  };
  const handlePlanClose = () => {
    setPlanId(null);
    setDeletePlanModal(false);
  };
  const handleDeletePlan = () => {
    setInstallmentPlans((prev) =>
      prev?.map((elem, pos) => {
        if (pos === planId?.id) {
          return {
            ...elem,
            deleted: planId?.status,
          };
        } else return elem;
      })
    );
    if (!projectUpdateInfo?.installmentEdited) {
      dispatch(
        setProjectUpdateInfo({
          ...projectUpdateInfo,
          installmentEdited: true,
        })
      );
    }
    setPlanId(null);
    setDeletePlanModal(false);
  };
  const handleAddPlan = () => {
    setInstallmentPlans([
      ...installmentPlans,
      {
        duration: 12,
        description: "",
        amount: 0,
        down_payment: 0,
        inserted: true,
        durationValidation: validateInputs("duration", 12),
        descriptionValidation: validateInputs("description", ""),
        amountValidation: validateInputs("amount", 0),
        down_paymentValidation: validateInputs("down_payment", 0),
      },
    ]);
    if (!projectUpdateInfo?.installmentEdited) {
      dispatch(
        setProjectUpdateInfo({
          ...projectUpdateInfo,
          installmentEdited: true,
        })
      );
    }
  };

  const handleCounter = (e, index, operation) => {
    setInstallmentPlans((prev) =>
      prev?.map((elem, pos) => {
        if (pos === index) {
          return {
            ...elem,
            [e]:
              operation === "add"
                ? parseInt(elem?.[e]) + 1
                : parseInt(elem?.[e]) - 1,
            edited: true,
          };
        } else return elem;
      })
    );
    if (!projectUpdateInfo?.installmentEdited) {
      dispatch(
        setProjectUpdateInfo({
          ...projectUpdateInfo,
          installmentEdited: true,
        })
      );
    }
  };

  const handlePlanChange = (e, index) => {
    const validationError = validateInputs(e.target.name, e.target.value);
    setInstallmentPlans((prev) =>
      prev?.map((elem, pos) => {
        if (pos === index) {

          return {
            ...elem,
            [e.target.name]:
              e.target.name === "duration" ||
                e.target.name === "amount" ||
                e.target.name === "down_payment"
                ? parseInt(e.target.value)
                : e.target.value,
            [`${e.target.name}Validation`]: validationError,
            [`amountCheckValidation`]:
              e.target.name === "amount" &&
                e.target.value < parseInt(elem?.down_payment)
                ? "Price must be greater than down payment"
                : null,
            [`down_paymentCheckValidation`]:
              e.target.name === "down_payment" &&
                e.target.value > parseInt(elem?.amount)
                ? "Down payment must be less than price"
                : null,
            edited: true,
          };
        } else return elem;
      })
    );
    if (!projectUpdateInfo?.installmentEdited) {
      dispatch(
        setProjectUpdateInfo({
          ...projectUpdateInfo,
          installmentEdited: true,
        })
      );
    }
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
        Installment Plans
      </span>
      {installmentPlans?.map((planItem, index) => (
        <Grid
          container
          key={index}
          spacing={1}
          className={classes.planContainer}
          sx={{
            marginTop: installmentPlans?.length > 0 ? 2 : 0,
            opacity: planItem?.deleted ? 0.5 : 1,
            borderRadius: planItem?.deleted ? 3 : 0,
            border: planItem?.deleted ? "1px solid #bbbbbb" : "none",
            borderBottom:
              installmentPlans?.length > 1 ? "1px  solid #bbbbbb" : "none",
          }}
        >
          <>
            <Grid item xs={12} sm={12} md={6} lg={3.9}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginBottom: 10,
                }}
              >
                <span
                  className={classes.label}
                  style={{
                    color: darkMode ? "#0ed864" : "#134696",
                    marginRight: 10,
                  }}
                >
                  Duration (months)
                </span>
                <div className={classes.vertical}>
                  <div className={classes.counterContainer}>
                    <IconButton
                      sx={{
                        borderRadius: "5px",
                        backgroundColor: "#c8dbe7",

                        "&:hover": {
                          backgroundColor: "#c8dbe7",
                        },
                      }}
                      onClick={(e) =>
                        planItem?.duration > 12 &&
                        handleCounter("duration", index, "subtract")
                      }
                    >
                      <RemoveIcon style={{ color: "#134696" }} />
                    </IconButton>
                    <input
                      style={{
                        border:
                          typeof validating === "string"
                            ? "1px solid #D83F50"
                            : "1px solid #b2b2c9",
                        color: darkMode ? "#fff" : "#134696",
                      }}
                      name="duration"
                      type="number"
                      className="counter-input"
                      value={planItem?.duration || 12}
                      onChange={(e) => handlePlanChange(e, index)}
                    />
                    <IconButton
                      name="duration"
                      sx={{
                        borderRadius: "5px",
                        backgroundColor: "#c8dbe7",
                        "&:hover": {
                          backgroundColor: "#c8dbe7",
                        },
                      }}
                      onClick={(e) => handleCounter("duration", index, "add")}
                    >
                      <AddIcon style={{ color: "#134696" }} />
                    </IconButton>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={3.9}>
              <InputField
                name="amount"
                placeholder="Total Price"
                value={parseInt(planItem?.amount)}
                onChange={(e) => handlePlanChange(e, index)}
                type="number"
                label="Total Price"
                validating={
                  planItem?.edited && planItem?.amountValidation
                    ? planItem?.amountValidation
                    : planItem?.amountCheckValidation
                      ? planItem?.amountCheckValidation
                      : null
                  // planItem?.edited && planItem?.amountValidation
                  //   ? planItem?.amountValidation
                  //   : null
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3.9}>
              <InputField
                name="down_payment"
                placeholder="Down Payment"
                value={parseInt(planItem?.down_payment)}
                onChange={(e) => handlePlanChange(e, index)}
                type="number"
                label="Down Payment"
                validating={
                  planItem?.edited && planItem?.down_paymentValidation
                    ? planItem?.down_paymentValidation
                    : planItem?.down_paymentCheckValidation
                      ? planItem?.down_paymentCheckValidation
                      : null

                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={11.7}>
              <InputField
                name="description"
                placeholder="Description"
                value={planItem?.description || ""}
                onChange={(e) => handlePlanChange(e, index)}
                type="text"
                label="Description"
                validating={
                  planItem?.edited && planItem?.descriptionValidation
                    ? planItem?.descriptionValidation
                    : null
                }
              />
            </Grid>
            <IconButton sx={crossButton} component="label">
              {planItem?.deleted ? (
                <RestoreIcon
                  style={{ color: darkMode ? "#0ed864" : "#134696" }}
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => handlePlanOpen(index, false)}
                />
              ) : (
                <CancelIcon
                  style={{ color: darkMode ? "#0ed864" : "#134696" }}
                  onClick={() => handlePlanOpen(index, true)}
                />
              )}
            </IconButton>
          </>
        </Grid>
      ))}
      <div className={classes.divider} />
      <Grid item sx={{ padding: "2px", mt: 1 }}>
        <Typography
          component="div"
          className={classes.addNew}
          onClick={handleAddPlan}
        >
          Add (more) Installment Plans ?
        </Typography>
      </Grid>
      {deletePlanModal && (
        <ConfirmModal
          open={deletePlanModal}
          setOpen={setDeletePlanModal}
          title={planId?.status ? "Delete Installment Plan" : "Undo Delete"}
          handleConfirm={handleDeletePlan}
        />
      )}

    </div>
  );
};

export default InstallmentPlans;
