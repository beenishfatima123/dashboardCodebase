import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid } from "@mui/material";
import { validateInputs } from "../../constants/helperFunctions";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import RemoveIcon from "@mui/icons-material/Remove";
import InputField from "../../listing/edit/InputField";

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

const crossButton = {
  position: "absolute",
  top: -10,
  right: -10,
  p: 0,
};

const InstallmentPlans = ({ installmentPlans, setInstallmentPlans }) => {
  const classes = useStyles();
  const darkMode = false;

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
            [`${e}Validation`]: validateInputs(
              e,
              operation === "add"
                ? parseInt(elem?.[e]) + 1
                : parseInt(elem?.[e]) - 1
            ),
          };
        } else return elem;
      })
    );
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
              e.target.name === "amount" && e.target.value < elem?.down_payment
                ? "Price must be greater than down payment"
                : null,
            [`down_paymentCheckValidation`]:
              e.target.name === "down_payment" && e.target.value > elem?.amount
                ? "Down payment must be less than price"
                : null,
            edited: true,
          };
        } else return elem;
      })
    );
  };

  const handleRemovePlan = (index) => {
    const list = [...installmentPlans];
    list.splice(index, 1);
    setInstallmentPlans(list);
  };

  const isValid = useMemo(() => {
    for (const elem of installmentPlans) {
      if (
        elem?.durationValidation ||
        elem?.descriptionValidation ||
        elem?.amountValidation ||
        elem?.down_paymentValidation ||
        elem?.amount < elem?.down_payment
      ) {
        return false;
      }
    }
    return true;
    // eslint-disable-next-line
  }, [installmentPlans]);

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
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 2,
            // border: "1px solid red",
            borderBottom: "1px  solid #bbbbbb",
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
                      step="1"
                      min="12"
                      className="counter-input"
                      value={planItem?.duration}
                      onChange={(e) => handlePlanChange(e, index)}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
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
                      onClick={(e) =>
                        planItem?.duration <= 999 &&
                        handleCounter("duration", index, "add")
                      }
                    >
                      <AddIcon style={{ color: "#134696" }} />
                    </IconButton>
                  </div>
                  {planItem?.edited && planItem?.durationValidation ? (
                    <span className={classes.helperText}>
                      {planItem?.durationValidation}
                    </span>
                  ) : null}
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={3.9}>
              <InputField
                name="amount"
                placeholder="Total Price"
                value={planItem?.amount}
                onChange={(e) => handlePlanChange(e, index)}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                type="number"
                label="Total Price"
                validating={
                  planItem?.edited && planItem?.amountValidation
                    ? planItem?.amountValidation
                    : planItem?.amountCheckValidation
                    ? planItem?.amountCheckValidation
                    : null
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3.9}>
              <InputField
                name="down_payment"
                placeholder="Down Payment"
                value={planItem?.down_payment}
                onChange={(e) => handlePlanChange(e, index)}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
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
            <IconButton
              sx={crossButton}
              component="label"
              onClick={() => handleRemovePlan(index)}
            >
              <CancelIcon style={{ color: darkMode ? "#0ed864" : "#134696" }} />
            </IconButton>
          </>
        </Grid>
      ))}
      <div className={classes.divider} />
      <Grid item sx={{ padding: "2px", mt: 1 }}>
        <Button
          className={classes.addMore}
          onClick={handleAddPlan}
          disabled={!isValid}
          startIcon={<AddIcon />}
          sx={{
            color: "#134696",
            fontSize: 14,
            fontFamily: "medium",
            cursor: "pointer",
            display: "flex",
            justifyContent: "flex-end",
            margin: "10px 0px",
            textTransform: "none",
          }}
        >
          Add (more) Installment Plans ?
        </Button>
      </Grid>
    </div>
  );
};

export default InstallmentPlans;
