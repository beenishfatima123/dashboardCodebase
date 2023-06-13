import React, { useEffect, useState } from "react";
import { Grid, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { isValidPhoneNumber } from "react-phone-number-input";
import UserInputField from "../miscellaneousComponents/UserInputField";
import CustomPhoneInput from "../miscellaneousComponents/CustomPhoneInput";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import { ReactComponent as PersonIcon } from "../../assets/icons/personIcon.svg";
import {
  validateInputs,
  validateEmail,
  getWordCount,
} from "../constants/helperFunctions";
import UserAutoCompleteInput from "../miscellaneousComponents/UserAutoCompleteInput";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";

const gridSx = {
  display: "flex",
  flexDirection: "row",
  gap: 2,
  alignItems: "center",
  justifyContent: "center",
  minHeight: 200,
  transition: "0.5s",
};
const buttonSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
  borderRadius: "10px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "white",
  },
};
const crossButton = {
  position: "absolute",
  top: -10,
  right: -10,
  p: 0,
};

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid  #c9c9c9",
    borderRadius: 13,
    background: "#ffffff",
    margin: "25px 50px",
  },
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: "#C9C9C9",
    marginTop: 20,
    objectFit: "cover",
  },
  fileUpload: {
    position: "absolute",
    marginTop: 30,
    color: "#fff",
    backgroundColor: "#014493",
    borderRadius: "50%",
    cursor: "pointer",
    padding: 1,
  },
  title: {
    fontSize: 35,
    fontFamily: "heavy",
    textTransform: "uppercase",
  },
  sectionHeading: {
    fontSize: 20,
    color: "#134696",
    fontFamily: "heavy",
  },
  btnContainer: {
    display: "flex",
  },
  "@media (max-width: 500px)": {
    title: {
      fontSize: 28,
    },
  },
  updateButton: {
    fontSize: 16,
    fontFamily: "medium",
    color: "#ffffff",
    backgroundColor: "#134696",
    width: 150,
    height: 50,
    borderRadius: 29,
    cursor: "pointer",
    border: "1px solid #707070",
    "&:hover": {
      color: "#ffffff",
      backgroundColor: "#134696",
    },
  },
  cancelButton: {
    fontSize: 16,
    fontFamily: "medium",
    color: "#134696",
    backgroundColor: "#ffffff",
    width: 150,
    height: 50,
    borderRadius: 29,
    cursor: "pointer",
    border: "1px solid #707070",
    marginLeft: 20,
  },
  toAgentButton: {
    fontSize: 14,
    fontFamily: "medium",
    color: "#ffffff",
    backgroundColor: "#134696",
    width: 180,
    height: 35,
    borderRadius: 29,
    cursor: "pointer",
    border: "1px solid #707070",
    "&:hover": {
      color: "#ffffff",
      backgroundColor: "#134696",
    },
  },
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
  containerDisabled: {
    pointerEvents: "none",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    margin: "10px 40px",
  },
  logoTitle: {
    marginTop: "23px",
    fontSize: 16,
    fontFamily: "light",
    color: "#7d7d7d",
  },
  logoImage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px",
    boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
    borderRadius: "10px",
    height: 150,
    width: 150,
    objectFit: "cover",
  },
}));

const RegisterCompany = ({ registerCompanyData, setRegisterCompanyData }) => {
  const classes = useStyles();
  const darkMode = false;

  const [location, setLocation] = useState();

  const handleCompanyInputChange = (prop) => (e) => {
    const validationError = validateInputs(prop, e.target.value);
    if (prop === "companyEmail") {
      setRegisterCompanyData({
        ...registerCompanyData,
        edited: true,
        [prop]: e.target.value,
        [`${prop}Validation`]: validateEmail(e.target.value)
          ? null
          : "Please enter a valid email address",
      });
    } else if (prop === "company_description") {
      setRegisterCompanyData({
        ...registerCompanyData,
        edited: true,
        [prop]: e.target.value,
        [`${prop}Validation`]:
          getWordCount(e.target.value) > 10 &&
          getWordCount(e.target.value) < 100
            ? true
            : false,
      });
    } else {
      setRegisterCompanyData({
        ...registerCompanyData,
        [e.target.name]: e.target.value,
        [`${prop}Validation`]: validationError,
      });
    }
  };
  const handleCompanyPhoneInput = (company_phone) => {
    if (company_phone)
      setRegisterCompanyData({
        ...registerCompanyData,
        company_phone,
        isCompanyPhoneValid: isValidPhoneNumber(company_phone),
      });
  };
  const handleCompanyFaxInput = (company_fax) => {
    if (company_fax)
      setRegisterCompanyData({
        ...registerCompanyData,
        company_fax,
        isCompanyFaxValid: isValidPhoneNumber(company_fax),
      });
  };
  const handleAutocompleteChange = (prop) => (event) => {
    setLocation((prev) => ({
      ...prev,
      [prop]: event?.name,
    }));
  };
  const handleImagePicker = (prop) => (event) => {
    const validationError = validateInputs("image", event.target.files[0]);
    setRegisterCompanyData({
      ...registerCompanyData,
      [prop]: event?.target?.files[0],
      [`${prop}Validation`]: validationError,
    });
  };

  const handleRemoveImage = (prop) => {
    setRegisterCompanyData({
      ...registerCompanyData,
      [prop]: null,
      [`${prop}Validation`]: "Please select logo for agency.",
    });
  };

  useEffect(() => {
    if (location)
      setRegisterCompanyData({ ...registerCompanyData, ...location });
    // eslint-disable-next-line
  }, [location]);

  return (
    <>
      <div className={classes.logoContainer}>
        <span className={classes.logoTitle}>
          Please attach the agency's logo for the profile view.
        </span>
        <Grid item xs={12} sm={4} md={3} lg={2} sx={gridSx}>
          {registerCompanyData?.company_logo && (
            <div style={{ position: "relative" }}>
              <img
                src={URL.createObjectURL(registerCompanyData?.company_logo)}
                alt=""
                className={classes.logoImage}
              />
              <IconButton
                sx={crossButton}
                component="label"
                onClick={() => handleRemoveImage("company_logo")}
              >
                <CancelIcon
                  style={{ color: darkMode ? "#0ed864" : "#134696" }}
                />
              </IconButton>
            </div>
          )}
          {!registerCompanyData?.company_logo && (
            <div>
              <IconButton
                sx={{
                  ...buttonSx,
                  backgroundColor: darkMode ? "#212124" : "#fff",
                  width: 150,
                  height: 150,
                }}
                component="label"
              >
                <input
                  hidden
                  accept="image/png, image/jpeg"
                  type="file"
                  onInput={handleImagePicker("company_logo")}
                />
                <AddIcon style={{ color: darkMode ? "#0ed864" : "#134696" }} />
              </IconButton>
            </div>
          )}
        </Grid>
        {registerCompanyData?.company_logoValidation && (
          <span className={classes.helperText}>
            {registerCompanyData?.company_logoValidation}
          </span>
        )}
      </div>
      <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5}>
        <UserInputField
          name="companyName"
          placeholder="Company Name"
          value={registerCompanyData?.companyName || ""}
          onChange={handleCompanyInputChange("companyName")}
          startIcon={<PersonIcon style={{ marginRight: 10 }} />}
          type="text"
          validating={registerCompanyData?.companyNameValidation}
          helperText="company name must be between 3-30 characters"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5}>
        <UserInputField
          name="companyEmail"
          placeholder="Company Email"
          value={registerCompanyData?.companyEmail || ""}
          onChange={handleCompanyInputChange("companyEmail")}
          startIcon={<PersonIcon style={{ marginRight: 10 }} />}
          type="text"
          validating={registerCompanyData?.companyEmailValidation}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5}>
        <CustomPhoneInput
          placeholder="Phone Number"
          name="company_phone"
          value={registerCompanyData?.company_phone || ""}
          onChange={handleCompanyPhoneInput}
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
          validating={registerCompanyData?.isCompanyPhoneValid}
          helperText="Please enter a valid phone number"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5}>
        <CustomPhoneInput
          placeholder="Fax"
          name="company_fax"
          value={registerCompanyData?.company_fax || ""}
          onChange={handleCompanyFaxInput}
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
          validating={registerCompanyData?.isCompanyFaxValid}
          helperText="Please enter a valid fax number"
        />
      </Grid>
      <Grid item xs={12} sm={12} lg={11.5}>
        <UserAutoCompleteInput
          name="company_address"
          placeholder="Company Address"
          startIcon={<PersonIcon style={{ marginRight: 10 }} />}
          onPlaceSelected={handleAutocompleteChange("company_address")}
          label="Company Address"
          options={{
            types: ["address"],
            fields: ["name"],
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} lg={11.5}>
        <div
          className={classes.descriptionContainer}
          style={{
            border:
              typeof registerCompanyData?.descriptionValidation === "string"
                ? "1px solid #D83F50"
                : "1px solid #b2b2c9",
          }}
        >
          <textarea
            name="company_description"
            className="login-input"
            rows="4"
            placeholder={"Brief Description"}
            value={registerCompanyData?.company_description || ""}
            onChange={handleCompanyInputChange("company_description")}
          />
        </div>
        {registerCompanyData?.edited &&
          registerCompanyData?.company_descriptionValidation === false && (
            <span className={classes.helperText}>
              Description must be between 10 - 100 words.
            </span>
          )}
      </Grid>
    </>
  );
};

export default RegisterCompany;
