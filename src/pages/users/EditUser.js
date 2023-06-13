import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import moment from "moment";
import { Grid, Button, IconButton } from "@mui/material";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import { isValidPhoneNumber } from "react-phone-number-input";
import UserInputField from "../../components/miscellaneousComponents/UserInputField";
import CustomPhoneInput from "../../components/miscellaneousComponents/CustomPhoneInput";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import { ReactComponent as PersonIcon } from "../../assets/icons/personIcon.svg";
import {
  getWordCount,
  validateInputs,
} from "../../components/constants/helperFunctions";
import Layout from "../../customComponents/layout/Layout";
import Loader from "../../customComponents/Loader";
import CancelIcon from "@mui/icons-material/Cancel";
import UserAutoCompleteInput from "../../components/miscellaneousComponents/UserAutoCompleteInput";
import Experience from "../../components/users/Experience";
import {
  becomeAgent,
  getUserByID,
  resetBecomeAnAgentApi,
  resetSelectedUser,
  resetUpdatedUserExperienceApi,
  resetUpdateUserApi,
  setUserUpdateFormData,
  updatedUserExperience,
  updateUser,
} from "../../features/usersSlice";
import { USER_TYPES } from "../../components/constants/global";
import AddIcon from "@mui/icons-material/Add";
import { baseUrl } from "../../components/constants/baseUrls";
import RegisterCompany from "../../components/users/RegisterCompany";
import CustomTopInfo from "../../customComponents/layout/CustomTopInfo";

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
    marginTop: 22,
    color: "#fff",
    // backgroundColor: "#014493",
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
}));

const EditUser = () => {
  const classes = useStyles();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const {
    userUpdateFormData,
    selectedUser,
    selectedUserApiInfo,
    updateUserApiInfo,
    becomeAgentDetailApiInfo,
    updateUserExperienceDetailApiInfo,
  } = useSelector((state) => state.users);
  const darkMode = false;

  const [isBecomeAgent, setIsBecomeAgent] = useState(false);

  const [isRegisterCompany, setIsRegisterCompany] = useState(false);
  const [registerCompanyData, setRegisterCompanyData] = useState({});

  const [location, setLocation] = useState();
  const [experienceList, setExperienceList] = useState([]);

  const handleInputChange = (prop) => (e) => {
    const validationError = validateInputs(prop, e.target.value);
    if (prop === "cnic") {
      dispatch(
        setUserUpdateFormData({
          ...userUpdateFormData,
          edited: true,
          [prop]: e.target.value,
          [`${prop}Validation`]:
            e?.target?.value?.indexOf("*") > 0
              ? "Please enter a valid CNIC number"
              : null,
        })
      );
    } else {
      dispatch(
        setUserUpdateFormData({
          ...userUpdateFormData,
          edited: true,
          [`${prop}Validation`]:
            e.target.name === "personal_description"
              ? getWordCount(e.target.value) > 10 &&
                getWordCount(e.target.value) < 100
                ? true
                : false
              : validationError,
          [e.target.name]:
            e.target.name === "date_of_birth"
              ? moment(e.target.value).format("YYYY-MM-DD")
              : e.target.value,
        })
      );
    }
  };

  const handlePhoneInput = (phone_number) => {
    if (phone_number) {
      dispatch(
        setUserUpdateFormData({
          ...userUpdateFormData,
          edited: true,
          phone_number,
          isPhoneValid: isValidPhoneNumber(phone_number),
        })
      );
    } else {
      dispatch(
        setUserUpdateFormData({
          ...userUpdateFormData,
          edited: true,
          phone_number,
          isPhoneValid: false,
        })
      );
    }
  };

  const handleImagePicker = (event) => {
    dispatch(
      setUserUpdateFormData({
        ...userUpdateFormData,
        profile_pic: event?.target?.files[0],
      })
    );
  };

  useEffect(() => {
    dispatch(getUserByID({ id: params?.id }));
    // eslint-disable-next-line
  }, [params]);

  useEffect(() => {
    if (selectedUser) {
      dispatch(setUserUpdateFormData(selectedUser));
      setIsBecomeAgent(
        selectedUser?.user_type === USER_TYPES?.USER ? false : true
      );
      if (selectedUser?.experience?.length > 0)
        setExperienceList(selectedUser?.experience);
    }
    // eslint-disable-next-line
  }, [selectedUser]);



  const handleAutocompleteChange = (prop) => (event) => {
    setLocation((prev) => ({
      ...prev,
      [prop]: event?.name,
    }));
  };

  const isProfileFormValid = (data) => {
    // console.log("checking profile");
    if (!data?.first_name || data?.first_nameValidation)
      return "Invalid first name for user";
    if (!data?.last_name || data?.last_nameValidation)
      return "Invalid last name for user";
    if (data?.isPhoneValid === false) return "Invalid phone number";

  };
  const isAgentFormValid = (data) => {

    if (data?.date_of_birthValidation) return "Invalid date of birth";
    if (!data?.cnic || data?.cnicValidation) return "Invalid CNIC for user";
    if (data?.personal_descriptionValidation === false)
      return "Invalid personal description";
  };
  const isAgencyFormValid = (data) => {

    if (!data?.company_logo) return "Company logo not selected";
    if (data?.company_logoValidation) return data?.company_logoValidation;
    if (!data?.companyName || data?.companyNameValidation)
      return "Invalid company's name";
    if (!data?.companyEmail || data?.companyEmailValidation)
      return "Invalid company's email address";
    if (
      !data?.company_description ||
      data?.company_descriptionValidation === false
    )
      return "Invalid company's description";
    if (!data?.company_phone || data?.isCompanyPhoneValid === false)
      return "Invalid company's phone number";
    if (data?.company_fax && data?.isCompanyFaxValid === false)
      return "Invalid company's fax number";
  };
  const validate = () => {
    if (isRegisterCompany) {
      if (isProfileFormValid(userUpdateFormData))
        return isProfileFormValid(userUpdateFormData);
      else if (isAgentFormValid(userUpdateFormData))
        return isAgentFormValid(userUpdateFormData);
      else if (isAgencyFormValid(registerCompanyData))
        return isAgencyFormValid(registerCompanyData);
    } else if (isBecomeAgent) {
      if (isProfileFormValid(userUpdateFormData))
        return isProfileFormValid(userUpdateFormData);
      else if (isAgentFormValid(userUpdateFormData))
        return isAgentFormValid(userUpdateFormData);
    } else {
      return isProfileFormValid(userUpdateFormData);
    }
  };

  function isListValid() {
    if (experienceList.length > 0) {
      let isValid = true;
      experienceList?.forEach((elem) => {
        if (!elem?.deleted)
          if (
            elem?.company_name === "" ||
            elem?.company_name?.length > 30 ||
            elem?.company_name?.length < 3 ||
            elem?.designation === "" ||
            elem?.designation?.length > 30 ||
            elem?.designation?.length < 3 ||
            elem?.city === "" ||
            elem?.country === "" ||
            elem?.start_date === ""
          )
            isValid = false;
      });
      return isValid;
    }
    return true;
  }
  const handleUpdate = () => {
    let inValid = validate();
    if (inValid || isListValid() === false) {
      toast.error(!isListValid() ? "Invalid details for experience" : inValid, {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
    } else {
      let formData = new FormData();
      userUpdateFormData?.profile_pic &&
        formData.append("photo", userUpdateFormData?.profile_pic);
      userUpdateFormData?.first_name &&
        formData.append("first_name", userUpdateFormData?.first_name);
      userUpdateFormData?.last_name &&
        formData.append("last_name", userUpdateFormData?.last_name);
      userUpdateFormData?.phone_number &&
        formData.append("phone_number", userUpdateFormData?.phone_number);
      if (isBecomeAgent) {
        formData.append("user_id", selectedUser?.id);
        userUpdateFormData?.date_of_birth &&
          formData.append(
            "date_of_birth",
            moment(userUpdateFormData?.date_of_birth).format("YYYY-MM-DD")
          );
        if (selectedUser?.user_type === USER_TYPES?.USER)
          userUpdateFormData?.cnic &&
            formData.append("cnic", userUpdateFormData?.cnic);
        userUpdateFormData?.personal_description &&
          formData.append(
            "personal_description",
            userUpdateFormData?.personal_description
          );
        location?.city && formData.append("city", location?.city);
        location?.area && formData.append("area", location?.area);
        userUpdateFormData?.address &&
          formData.append("address", userUpdateFormData?.address);
      }
      if (isRegisterCompany) {
        registerCompanyData?.company_logo &&
          formData.append("company_logo", registerCompanyData?.company_logo);
        registerCompanyData?.companyName &&
          formData.append("company_name", registerCompanyData?.companyName);
        registerCompanyData?.companyEmail &&
          formData.append("company_email", registerCompanyData?.companyEmail);
        registerCompanyData?.company_phone &&
          formData.append("company_phone", registerCompanyData?.company_phone);
        registerCompanyData?.company_fax &&
          formData.append("company_fax", registerCompanyData?.company_fax);
        registerCompanyData?.company_description &&
          formData.append(
            "company_description",
            registerCompanyData?.company_description
          );
        registerCompanyData?.company_address &&
          formData.append(
            "company_address",
            registerCompanyData?.company_address
          );
        registerCompanyData?.company_address &&
          formData.append("company_city", registerCompanyData?.company_address);
        formData.append("is_company", true);
        formData.append("admin", selectedUser?.id);
      }
      if (selectedUser?.user_type === USER_TYPES?.AGENT) {
        if (experienceList?.length > 0) {
          const _exp = experienceList?.map((elem) => {
            return {
              ...elem,
              start_date: moment(elem?.start_date).format("YYYY-MM-DD"),
              end_date: elem?.currently_working
                ? null
                : moment(elem?.end_date).format("YYYY-MM-DD"),
            };
          });
          let experienceFormData = new FormData();
          experienceFormData.append("experiences", JSON.stringify(_exp));
          dispatch(
            updatedUserExperience({
              token: loggedInObject?.token,
              userID: selectedUser?.id,
              formData: experienceFormData,
            })
          );
        }
      }
      if (
        (selectedUser?.user_type === USER_TYPES?.USER &&
          isBecomeAgent === true) ||
        (selectedUser?.user_type === USER_TYPES?.AGENT &&
          selectedUser?.company === "Private Agent" &&
          isRegisterCompany === true)
      ) {
        dispatch(
          becomeAgent({
            token: loggedInObject?.token,
            formData,
          })
        );
      } else {
        dispatch(
          updateUser({
            id: selectedUser?.id,
            authToken: loggedInObject?.token,
            data: formData,
          })
        );
      }
    }
  };

  useEffect(() => {
    if (updateUserApiInfo?.response?.status) {
      toast.success("User Updated Successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      dispatch(resetUpdateUserApi());
      dispatch(resetUpdatedUserExperienceApi());
      history.goBack();
    } else if (updateUserApiInfo?.response?.status === false) {
      toast.error(updateUserApiInfo?.response?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch(resetUpdateUserApi());
      dispatch(resetUpdatedUserExperienceApi());
    }
    // eslint-disable-next-line
  }, [updateUserApiInfo?.response]);

  useEffect(() => {
    if (updateUserApiInfo?.error) {
      toast.error("something went wrong", {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      dispatch(resetUpdateUserApi());
      dispatch(resetUpdatedUserExperienceApi());
    }
    // eslint-disable-next-line
  }, [updateUserApiInfo?.error]);

  useEffect(() => {
    if (becomeAgentDetailApiInfo?.response?.status) {
      toast.success("Agent profile updated successfully.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      dispatch(resetBecomeAnAgentApi());
      dispatch(resetUpdatedUserExperienceApi());
      history.push("/users/");
    }
    // eslint-disable-next-line
  }, [becomeAgentDetailApiInfo?.response]);

  useEffect(() => {
    if (becomeAgentDetailApiInfo?.error) {
      toast.error("Something went wrong", {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      dispatch(resetBecomeAnAgentApi());
      dispatch(resetUpdatedUserExperienceApi());
    }
    // eslint-disable-next-line
  }, [becomeAgentDetailApiInfo?.error]);

  return (
    <Layout>
      {selectedUserApiInfo?.loading || updateUserApiInfo?.loading ? (
        <Loader />
      ) : (
        <>
          <CustomTopInfo heading="User" />
          <div
            className={classes.container}
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              backgroundColor: darkMode ? "#2f2f33" : "#fff",
            }}
          >
            <span
              className={classes.title}
              style={{
                color: darkMode ? "#0ed864" : "#134696",
              }}
            >
              Edit User
            </span>
            <Grid
              container
              sx={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
              spacing={2}
            >
              <Grid item xs={6} md={4} sm={6} lg={3}>
                <Button
                  fullWidth
                  className={classes.updateButton}
                  onClick={handleUpdate}
                >
                  Save Changes
                </Button>
              </Grid>
              <Grid item xs={6} md={4} sm={6} lg={3}>
                <Button
                  fullWidth
                  className={classes.cancelButton}
                  onClick={() => {
                    dispatch(resetSelectedUser());
                    dispatch(resetUpdateUserApi());
                    dispatch(resetUpdatedUserExperienceApi());
                    history.push("/users/");
                  }}
                  endIcon={
                    <CancelIcon
                      style={{ color: darkMode ? "#0ed864" : "#134696" }}
                    />
                  }
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </div>
          <div
            className={classes.container}
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              backgroundColor: darkMode ? "#2f2f33" : "#fff",
            }}
          >
            {becomeAgentDetailApiInfo?.loading ||
              updateUserExperienceDetailApiInfo?.loading ? (
              <Loader />
            ) : (
              <form>
                <Grid
                  container
                  justifyContent="space-around"
                  spacing={2}
                  sx={{ my: 2 }}
                >
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    sx={{ marginLeft: 3 }}
                  >
                    <label
                      className={classes.sectionHeading}
                      style={{ color: darkMode ? "" : "#134696" }}
                    >
                      Details
                    </label>
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <div className={classes.profileContainer}>
                      {!userUpdateFormData?.profile_pic &&
                        (selectedUser?.photo === "" ||
                          selectedUser?.photo === null) ? (
                        <div className={classes.image} />
                      ) : (
                        <img
                          src={
                            userUpdateFormData?.profile_pic
                              ? URL.createObjectURL(
                                userUpdateFormData?.profile_pic
                              )
                              : `${baseUrl}/${selectedUser?.photo}`
                          }
                          alt=""
                          className={classes.image}
                        />
                      )}
                      <IconButton
                        sx={{
                          width: 130,
                          height: 130,
                          fontSize: 18,
                        }}
                        className={classes.fileUpload}
                        component="label"
                      >
                        <input
                          hidden
                          accept="image/png, image/jpeg"
                          type="file"
                          onInput={handleImagePicker}
                        />
                        <AddIcon
                          style={{ color: darkMode ? "#0ed864" : "#134696" }}
                        />
                      </IconButton>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5}>
                    <UserInputField
                      name="first_name"
                      value={userUpdateFormData?.first_name || ""}
                      onChange={handleInputChange("first_name")}
                      validating={userUpdateFormData?.first_nameValidation}
                      placeholder="First Name"
                      startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                      type="text"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5}>
                    <UserInputField
                      name="last_name"
                      value={userUpdateFormData?.last_name || ""}
                      onChange={handleInputChange("last_name")}
                      validating={userUpdateFormData?.last_nameValidation}
                      placeholder="Last Name"
                      startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                      type="text"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5}>
                    <UserInputField
                      name="email"
                      value={userUpdateFormData?.email || ""}
                      startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                      placeholder="Email"
                      readOnly={true}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5}>
                    <CustomPhoneInput
                      name="phone_number"
                      placeholder="Phone Number"
                      value={userUpdateFormData?.phone_number || ""}
                      onChange={handlePhoneInput}
                      validating={userUpdateFormData?.isPhoneValid}
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
                  {selectedUser?.user_type === USER_TYPES?.USER ? (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        fullWidth
                        className={classes.toAgentButton}
                        onClick={() => setIsBecomeAgent((prev) => !prev)}
                      >
                        Upgrade to Agent
                      </Button>
                    </Grid>
                  ) : null}
                  <Grid
                    container
                    justifyContent="space-around"
                    sx={{ marginLeft: 2, opacity: isBecomeAgent ? 1 : 0.5 }}
                  >
                    <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5}>
                      <UserInputField
                        placeholder="CNIC"
                        name="cnic"
                        value={userUpdateFormData?.cnic}
                        startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                        onChange={handleInputChange("cnic")}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        mask="*****-*******-*"
                        validating={userUpdateFormData?.cnicValidation}
                        helperText="Please enter a valid cnic number"
                        readOnly={
                          selectedUser?.user_type !== USER_TYPES.USER
                            ? true
                            : !isBecomeAgent
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5}>
                      <UserInputField
                        inputRef={inputRef}
                        name="date_of_birth"
                        placeholder="DOB"
                        value={userUpdateFormData?.date_of_birth}
                        onChange={handleInputChange("date_of_birth")}
                        startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                        type="text"
                        onFocus={() => (inputRef.current.type = "date")}
                        onBlur={() => (inputRef.current.type = "text")}
                        max={new Date().toISOString().split("T")[0]}
                        readOnly={!isBecomeAgent}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={11.5} lg={11.5} xl={11.5}>
                      <div
                        className={classes.descriptionContainer}
                        style={{
                          border:
                            typeof userUpdateFormData?.descriptionValidation ===
                              "string"
                              ? "1px solid #D83F50"
                              : "1px solid #b2b2c9",
                        }}
                      >
                        <textarea
                          name="personal_description"
                          className="login-input"
                          rows="4"
                          placeholder={"Brief Description"}
                          value={userUpdateFormData?.personal_description || ""}
                          onChange={handleInputChange("personal_description")}
                          readOnly={!isBecomeAgent}
                        />
                      </div>
                      {userUpdateFormData?.edited &&
                        userUpdateFormData?.personal_descriptionValidation ===
                        false && (
                          <span className={classes.helperText}>
                            Biography must be between 10-100 words.
                          </span>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5}>
                      <UserAutoCompleteInput
                        placeholder="City"
                        defaultValue={userUpdateFormData?.city || ""}
                        startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                        onPlaceSelected={handleAutocompleteChange("city")}
                        label="City"
                        options={{
                          types: ["(cities)"],
                          fields: ["name"],
                        }}
                        readOnly={!isBecomeAgent}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5}>
                      <UserAutoCompleteInput
                        placeholder="Area"
                        defaultValue={userUpdateFormData?.area || ""}
                        startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                        onPlaceSelected={handleAutocompleteChange("area")}
                        label="Area"
                        options={{
                          types: ["address"],
                          fields: ["name"],
                        }}
                        readOnly={!isBecomeAgent}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={11.5} lg={11.5} xl={11.5}>

                      <UserInputField
                        name="address"
                        value={userUpdateFormData?.address || ""}
                        onChange={handleInputChange("address")}
                        validating={userUpdateFormData?.addressValidation}
                        placeholder="Address"
                        startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                        type="text"
                        readOnly={!isBecomeAgent}
                      />
                    </Grid>
                  </Grid>

                  {selectedUser?.user_type === USER_TYPES?.AGENT &&
                    selectedUser?.company === "Private Agent" ? (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        fullWidth
                        className={classes.toAgentButton}
                        onClick={() => setIsRegisterCompany((prev) => !prev)}
                      >
                        Register Company
                      </Button>
                    </Grid>
                  ) : null}
                  {isRegisterCompany ? (
                    <>
                      <RegisterCompany
                        registerCompanyData={registerCompanyData}
                        setRegisterCompanyData={setRegisterCompanyData}
                      />
                    </>
                  ) : null}
                </Grid>
                {selectedUser?.user_type === USER_TYPES?.AGENT ? (
                  <Grid
                    container
                    justifyContent="space-around"
                    spacing={2}
                    sx={{ my: 2 }}
                  >
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      sx={{ marginLeft: 3 }}
                    >
                      <label
                        className={classes.sectionHeading}
                        style={{ color: darkMode ? "" : "#134696" }}
                      >
                        Experience
                      </label>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      sx={{ marginLeft: 3 }}
                    >
                      <Experience
                        experienceList={experienceList}
                        setExperienceList={setExperienceList}
                        isListValid={isListValid}
                      />
                    </Grid>
                  </Grid>
                ) : null}
              </form>
            )}
          </div>
        </>
      )}
    </Layout>
  );
};

export default EditUser;
