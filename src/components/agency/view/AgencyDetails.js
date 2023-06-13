import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import HeadingSvg from "./HeadingSvg";
import { Button } from "@mui/material";
import AcceptIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/CancelOutlined";
import EditIcon from "@mui/icons-material/Edit";
import {
  resetUpdateAgencyApiInfo,
  setAgencyToEdit,
  setAgencyUpdateInfo,
  setAgencyVerificationDetail,
  deleteAgency,
} from "../../../features/agencySlice";
import {
  resetCreateVerificationApi,
  updateVerification,
} from "../../../features/verificationSlice";
import { getSingleUnverifiedCompanyReset } from "../../../features/store/verificationRequestsSlice";
import ConfirmModal from "../../miscellaneousComponents/ConfirmModal";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    borderTop: "1px solid #707070",
    maxWidth: 1700,
    alignSelf: "center",
    width: "100%",
  },
  topContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    padding: "20px 0px",
    minHeight: 100,
    position: "relative",
  },
  contactContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "20px 0px",
    margin: "20px 5%",
  },
  subHeadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  heading: {
    fontFamily: "medium",
    color: "#1a2954",
    fontSize: 18,
  },
  values: {
    marginTop: "10px",
    fontFamily: "heavy",
    color: "#134696",
    fontSize: 20,
    maxWidth: 300,
  },
  bottomBorder: {
    height: 1,
    width: "98%",
    alignSelf: "center",
    backgroundColor: "#707070",
  },
  description: {
    color: "#7D7D7D",
    fontSize: 18,
    margin: "20px 5%",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
  },
  "@media (max-width: 700px)": {
    topContainer: {
      flexDirection: "column",
    },
  },
}));

const AgencyDetail = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const { agencyDetails, verificationDetail } = useSelector(
    (state) => state.agency
  );
  const { updateRequestApiInfo } = useSelector((state) => state.verifications);
  const darkMode = false;
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  useEffect(() => {
    if (updateRequestApiInfo?.response) {
      dispatch(
        setAgencyVerificationDetail({ isDirect: true, verificationID: null })
      );
      history.push(`/agency/${agencyDetails?.id}`);
    }
  }, [updateRequestApiInfo?.response]);

  const removeAgency = () => {
    dispatch(
      deleteAgency({ authToken: loggedInObject?.token, id: agencyDetails?.id })
    );
  };

  return (
    <div className={classes.container}>
      {openConfirmModal && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title="Are you sure you want to delete this project?"
          handleConfirm={removeAgency}
        />
      )}
      <div className={classes.topContainer}>
        <div
          style={{
            marginLeft: -80,
          }}
        >
          <HeadingSvg heading={"About the Agency"} />
        </div>
        <div></div>
        <div className={classes.btnContainer}>
          {!verificationDetail?.isDirect &&
          agencyDetails?.verification_status === "in_progress" ? (
            <>
              <Button
                startIcon={<AcceptIcon />}
                style={{
                  width: "166px",
                  height: "45px",
                  borderRadius: "10px",
                  color: "#FFFFFF",
                  background: "#0ed864",
                }}
                onClick={() => {
                  const sendVerificationData = {
                    status: "verified",
                  };
                  dispatch(
                    updateVerification({
                      id: verificationDetail?.verificationID,
                      token: loggedInObject?.token,
                      reqData: sendVerificationData,
                    })
                  );
                }}
              >
                Accept
              </Button>
              <Button
                startIcon={<DeleteIcon />}
                style={{
                  width: "166px",
                  height: "45px",
                  borderRadius: "10px",
                  color: "#FFFFFF",
                  background: "#ff6161",
                }}
                onClick={() => {
                  const sendVerificationData = {
                    status: "declined",
                  };
                  dispatch(
                    updateVerification({
                      id: verificationDetail?.verificationID,
                      token: loggedInObject?.token,
                      reqData: sendVerificationData,
                    })
                  );
                }}
              >
                Decline
              </Button>
            </>
          ) : (
            <>
              <EditIcon
                sx={{
                  fontSize: 20,
                  cursor: "pointer",
                  height: "55px",
                  width: "48px",
                }}
                onClick={() => {
                  dispatch(getSingleUnverifiedCompanyReset());
                  dispatch(resetCreateVerificationApi());
                  dispatch(resetUpdateAgencyApiInfo());
                  dispatch(setAgencyUpdateInfo(null));
                  dispatch(setAgencyToEdit(agencyDetails));
                  history.push(`/edit-agency/${agencyDetails?.id}`);
                }}
              />
              <DeleteIcon
                sx={{
                  fontSize: 20,
                  cursor: "pointer",
                  color: "red",
                  height: "55px",
                  width: "48px",
                }}
                onClick={() => setOpenConfirmModal(true)}
              />{" "}
            </>
          )}
        </div>
      </div>
      <div className={classes.bottomBorder} />
      <span
        className={classes.description}
        style={{
          color: darkMode ? "#fff" : "#7D7D7D",
        }}
      >
        {agencyDetails?.company_description}
      </span>
      <div className={classes.bottomBorder} />
      <div className={classes.contactContainer}>
        <div className={classes.subHeadingContainer}>
          <span className={classes.heading}>Address</span>
          <span className={classes.values}>
            {agencyDetails?.company_address}
          </span>
        </div>
        <div className={classes.subHeadingContainer}>
          <span className={classes.heading}>No. of Employees</span>
          <span className={classes.values}>
            {!agencyDetails?.no_of_employees ? "No Employee" : agencyDetails?.no_of_employees}
          </span>
        </div>
        <div className={classes.subHeadingContainer}>
          <span className={classes.heading}>Contact Number</span>
          <span className={classes.values}>{agencyDetails?.company_phone}</span>
        </div>
      </div>
      <div className={classes.bottomBorder} />
    </div>
  );
};

export default AgencyDetail;
