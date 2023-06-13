import React from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { ReactComponent as PersonIcon } from "../../../assets/icons/personIcon.svg";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import UserInputField from "../../miscellaneousComponents/UserInputField";
import CustomPhoneInput from "../../miscellaneousComponents/CustomPhoneInput";
import { setCreateAgencyData } from "../../../features/agencySlice";
import { validateInputs, validateEmail } from "../../constants/helperFunctions";
import { isValidPhoneNumber } from "react-phone-number-input";
import { COMPANY_INTERESTS } from "../../constants/global";
import "../edit/myListingStyles.css";

const useStyles = makeStyles(() => ({
  descriptionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "15px 10px",
    border: "1px solid #b2b2c9",
    borderRadius: 10,
    minWidth: "80%",
    marginTop: 10,
  },
  helperText: {
    fontSize: 12,
    color: "red",
    alignSelf: "flex-start",
    marginTop: 3,
  },
}));
const InformationForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { createAgencyData } = useSelector((state) => state.agency);

  const handleChange = (prop) => (event) => {
    if (prop === "company_email") {
      dispatch(
        setCreateAgencyData({
          ...createAgencyData,
          isCompanyEmailValid: !validateEmail(event.target.value)
            ? "Please enter a valid email address"
            : null,
          [prop]: event.target.value,
        })
      );
    } else {
      dispatch(
        setCreateAgencyData({
          ...createAgencyData,
          [prop]: event.target.value,
          [`${prop}Validation`]: validateInputs(prop, event.target.value),
        })
      );
    }
  };

  const handlePhoneInput = (company_phone) => {
    if (company_phone) {
      dispatch(
        setCreateAgencyData({
          ...createAgencyData,
          company_phone,
          isPhoneValid: isValidPhoneNumber(company_phone),
        })
      );
    } else {
      dispatch(
        setCreateAgencyData({
          ...createAgencyData,
          company_phone,
          isPhoneValid: false,
        })
      );
    }
  };

  const handleFaxInput = (company_fax) => {
    if (company_fax) {
      dispatch(
        setCreateAgencyData({
          ...createAgencyData,
          company_fax,
          isFaxValid: isValidPhoneNumber(company_fax),
        })
      );
    } else {
      dispatch(
        setCreateAgencyData({
          ...createAgencyData,
          company_fax,
          isFaxValid: false,
        })
      );
    }
  };

  return (
    <>
      <Grid
        container
        justifyContent="space-around"
        sx={{ width: "85%", margin: "auto" }}
      >
        <Grid item xs={11} sm={11} md={5} lg={5} xl={5}>
          <UserInputField
            name="company_name"
            value={createAgencyData?.company_name}
            onChange={handleChange("company_name")}
            validating={createAgencyData?.company_nameValidation}
            placeholder="Company's Name"
            startIcon={<PersonIcon style={{ marginRight: 10 }} />}
            helperText={createAgencyData?.company_nameValidation}
            type="text"
          />
        </Grid>
        <Grid item xs={11} sm={11} md={5} lg={5} xl={5}>
          <UserInputField
            name="company_email"
            value={createAgencyData?.company_email}
            onChange={handleChange("company_email")}
            placeholder="Company's Email"
            startIcon={<PersonIcon style={{ marginRight: 10 }} />}
            validating={createAgencyData?.isCompanyEmailValid}
            // validating={createAgencyData?.company_emailValidation}
            helperText="Please enter a valid email address"
            type="text"
          />
        </Grid>

        <Grid item xs={11} sm={11} md={5} lg={5} xl={5}>
          <CustomPhoneInput
            name="company_phone"
            placeholder="Phone Number"
            value={createAgencyData?.company_phone || ""}
            onChange={handlePhoneInput}
            validating={createAgencyData?.isPhoneValid}
            helperText="Please enter a valid phone number"
            startIcon={
              <PhoneAndroidOutlinedIcon
                style={{
                  marginRight: 10,
                  color: "#03014c",
                  height: 10,
                  width: 10,
                }}
              />
            }
          />
        </Grid>
        <Grid item xs={11} sm={11} md={5} lg={5} xl={5}>
          <CustomPhoneInput
            name="company_fax"
            placeholder="Fax Number"
            value={createAgencyData?.company_fax || ""}
            onChange={handleFaxInput}
            validating={createAgencyData?.isFaxValid}
            helperText="Please enter a valid fax number"
            startIcon={
              <PhoneAndroidOutlinedIcon
                style={{
                  marginRight: 10,
                  color: "#03014c",
                  height: 10,
                  width: 10,
                }}
              />
            }
          />
        </Grid>

        <Grid item xs={11} sm={11} md={5} lg={5} xl={5}>
          <UserInputField
            name="no_of_employees"
            placeholder="Number of Employees"
            value={createAgencyData?.no_of_employees}
            onChange={handleChange("no_of_employees")}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            validating={createAgencyData?.no_of_employeesValidation}
            helperText={createAgencyData?.no_of_employeesValidation}
            startIcon={<PersonIcon style={{ marginRight: 10 }} />}
            type="number"
          />
        </Grid>
        <Grid item xs={11} sm={11} md={5} lg={5} xl={5}>
          <div className="listingsSelectDiv">
            <select
              defaultValue={createAgencyData?.interests}
              onChange={handleChange("interests")}
            >
              {COMPANY_INTERESTS?.map((interest, index) => (
                <option key={index} value={interest?.code}>
                  {interest?.title}
                </option>
              ))}
            </select>
          </div>
        </Grid>

        <Grid item xs={11} sm={11} md={5} lg={5} xl={5}>
          <UserInputField
            name="company_city"
            placeholder="City"
            value={createAgencyData?.company_city || ""}
            onChange={handleChange("company_city")}
            validating={createAgencyData?.company_cityValidation}
            helperText={createAgencyData?.company_cityValidation}
            startIcon={<PersonIcon style={{ marginRight: 10 }} />}
            type="text"
          />
        </Grid>
        <Grid item xs={11} sm={11} md={5} lg={5} xl={5}>
          <UserInputField
            name="company_areas"
            placeholder="Area"
            value={createAgencyData?.company_areas || ""}
            onChange={handleChange("company_areas")}
            validating={createAgencyData?.company_areasValidation}
            helperText={createAgencyData?.company_areasValidation}
            startIcon={<PersonIcon style={{ marginRight: 10 }} />}
            type="text"
          />
        </Grid>
        <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
          <UserInputField
            name="company_address"
            placeholder="Address"
            value={createAgencyData?.company_address || ""}
            onChange={handleChange("company_address")}
            validating={createAgencyData?.company_addressValidation}
            helperText={createAgencyData?.company_addressValidation}
            startIcon={<PersonIcon style={{ marginRight: 10 }} />}
            type="text"
          />
        </Grid>

        <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
          <div
            className={classes.descriptionContainer}
            style={{
              border:
                typeof createAgencyData?.company_descriptionValidation ===
                  "string"
                  ? "1px solid #D83F50"
                  : "1px solid #b2b2c9",
            }}
          >
            <textarea
              name="company_description"
              className="login-input"
              rows="4"
              placeholder={"Brief Description"}
              value={createAgencyData?.company_description || ""}
              onChange={handleChange("company_description")}
            />
          </div>
          {createAgencyData?.company_descriptionValidation && (
            <span className={classes.helperText}>
              {createAgencyData?.company_descriptionValidation}
            </span>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default InformationForm;
