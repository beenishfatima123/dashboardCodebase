import React from "react";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  setAgencyToEdit,
  setAgencyUpdateInfo,
  updateAgency,
} from "../../../features/agencySlice";
import { toast } from "react-toastify";
import {
  getCompanyPostData,
  getUpdateVerificationData,
  getVerificationData,
} from "../../constants/helperFunctions";
import {
  createVerificationRequest,
  updateVerification,
} from "../../../features/verificationSlice";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flex: 1,
    padding: 20,
    marginTop: "3%",
    width: "80%",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#ffffff",
    margin: "auto",
    // border: "1px solid green",
  },
  btnContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
  },
  updateButton: {
    fontSize: 16,
    fontFamily: "medium",
    color: "#ffffff",
    backgroundColor: "#134696",
    width: 130,
    height: 35,
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
    width: 130,
    height: 35,
    borderRadius: 29,
    cursor: "pointer",
    border: "1px solid #707070",
    marginLeft: 20,
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
}));

const TopBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const darkMode = false;

  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const { agencyToEdit, agencyUpdateInfo } = useSelector(
    (state) => state.agency
  );

  const isFormValid = (data) => {
    if (
      !data?.company_name ||
      data?.company_nameValidation ||
      data?.isCompanyEmailValid ||
      data?.isPhoneValid === false ||
      data?.isFaxValid === false ||
      data?.no_of_employeesValidation ||
      data?.company_cityValidation ||
      data?.company_areasValidation ||
      data?.company_addressValidation ||
      data?.company_descriptionValidation ||
      data?.company_logoValidation
    ) {
      return false;
    }
    return true;
  };

  const handleUpdate = () => {
    let inValid = isFormValid(agencyToEdit);
    if (!inValid) {
      toast.error(
        "Invalid form. Please fill information correctly and submit again.",
        {
          position: toast.POSITION.TOP_CENTER,
          progressStyle: { backgroundColor: "#014493" },
        }
      );
    } else {
      if (
        agencyUpdateInfo?.verification_id &&
        agencyUpdateInfo?.verificated_edited
      ) {
        // console.log("PUT verification");
        dispatch(
          updateVerification({
            id: agencyUpdateInfo?.verification_id,
            token: loggedInObject?.token,
            reqData: getUpdateVerificationData(agencyUpdateInfo),
          })
        );
      } else if (
        agencyUpdateInfo?.verification_files &&
        agencyUpdateInfo?.verification_files?.length > 0
      ) {
        dispatch(
          createVerificationRequest({
            values: getVerificationData(
              "agency",
              agencyToEdit?.id,
              agencyUpdateInfo
            ),
            token: loggedInObject?.token,
          })
        );
      }
      dispatch(
        updateAgency({
          id: agencyToEdit?.id,
          authToken: loggedInObject?.token,
          data: getCompanyPostData(agencyUpdateInfo, loggedInObject?.id, false),
        })
      );
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.btnContainer}>
        <Button
          fullWidth
          className={classes.updateButton}
          onClick={handleUpdate}
        >
          Proceed
        </Button>
        <Button
          fullWidth
          className={classes.cancelButton}
          onClick={() => {
            dispatch(setAgencyToEdit(null));
            dispatch(setAgencyUpdateInfo(null));
            history.goBack();
            // history.push("/agencies");
          }}
          endIcon={
            <CancelIcon style={{ color: darkMode ? "#0ed864" : "#134696" }} />
          }
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default TopBar;
