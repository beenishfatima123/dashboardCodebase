import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import verifiedBadge from "../../../assets/verifiedBadge.png";
import defaultImage from "../../../assets/DemoProfile.png";
import { Button, CircularProgress } from "@mui/material";
import { baseUrl } from "../../constants/baseUrls";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import MapModal from "../../miscellaneousComponents/MapModal";
import { ReactComponent as Call } from "../../../assets/icons/call.svg";
import { ReactComponent as Chat } from "../../../assets/icons/chat.svg";
import AcceptIcon from "@mui/icons-material/CheckCircleOutline";
import HideIcon from "@mui/icons-material/VisibilityOff";
import ShowIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/CancelOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { getUserTypeLabel } from "../../constants/helperFunctions";
import { updateVerification } from "../../../features/verificationSlice";
import {
  activateUser,
  deactivateUser,
  deleteUser,
  resetActivateUserApi,
  resetDeactivateUserApi,
  setVerificationDetail,
} from "../../../features/usersSlice";
import ConfirmModal from "../../miscellaneousComponents/ConfirmModal";
import CustomTooltip from "../../miscellaneousComponents/CustomTooltip";
import { USER_TYPES } from "../../constants/global";
import CallMenu from "./CallMenu";
import {
  deleteDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../../firebase/index';

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  top: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    zIndex: 10,
  },
  bottom: {
    backgroundColor: "#134696",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    padding: "10px 20px",
    justifyContent: "space-evenly",
  },
  agentPic: {
    width: 400,
    height: 447,
    objectFit: "cover",
    zIndex: 0,
    "-webkit-filter": "grayscale(100%)" /* Safari 6.0 - 9.0 */,
    filter: "grayscale(100%)",
  },
  badge: {
    position: "absolute",
    top: "5%",
    right: "5%",
  },
  name: {
    fontSize: 32,
    color: "white",
    fontFamily: "heavy",
    textTransform: "capitalize",
  },
  address: {
    fontSize: 16,
    color: "#0ED864",
    textTransform: "capitalize",
    width: "40%",
  },
  mapContainer: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  map: {
    fontSize: 11,
    color: "#FFFFFF",
    fontFamily: "light",
  },
  horizontal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
  },
  vertical: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    zIndex: 10,
  },
  listingsTotal: {
    fontSize: 45,
    color: "#FFFFFF",
    margin: "0px 0px",
  },
  listingsTitle: {
    fontSize: 16,
    color: "#0ED864",
  },
  info: {
    fontSize: 16,
    color: "#FFFFFF",
    margin: 0,
    fontFamily: "medium",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "80%",
    gap: "35px",
  },
  callToActionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
}));

const buttonSx = {
  background:
    "linear-gradient(90deg, rgba(14,216,100,0.9) 55%, rgba(0,0,0,0) 100%)",
  textTransform: "none",
  color: "#134696",
  width: 135,
  height: 35,
  position: "absolute",
  top: "6%",
  left: "3%",

  "&:hover": {
    backgroundColor: "transparent",
  },
};
const TopContainer = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [openMap, setOpenMap] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const [callAnchor, setCallAnchor] = useState(null);

  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const {
    selectedUser,
    verificationDetail,
    deactivateUserApiInfo,
    activateUserApiInfo,
  } = useSelector((state) => state.users);
  const { updateRequestApiInfo } = useSelector((state) => state.verifications);

  useEffect(() => {
    if (updateRequestApiInfo?.response) {
      dispatch(setVerificationDetail({ isDirect: true, verificationID: null }));
      history.push(`/user/${selectedUser?.id}`);
    }
  }, [updateRequestApiInfo?.response]);

  useEffect(() => {
    if (activateUserApiInfo?.response?.status === true) {
      toast.success(activateUserApiInfo?.response?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetActivateUserApi());
    }
    // eslint-disable-next-line
  }, [activateUserApiInfo?.response]);

  useEffect(() => {
    if (deactivateUserApiInfo?.response?.status === true) {
      toast.success(deactivateUserApiInfo?.response?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetDeactivateUserApi());
    }
    // eslint-disable-next-line
  }, [deactivateUserApiInfo?.response]);

  const removeUser = async () => {
    const docRef = doc(db, "users", selectedUser?.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await deleteDoc(doc(db, "users", selectedUser?.email))
    }
    dispatch(
      deleteUser({ authToken: loggedInObject?.token, id: selectedUser?.id })
    );
  };

  return (
    <div className={classes.container}>
      {openConfirmModal && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title="Are you sure you want to delete this user?"
          handleConfirm={removeUser}
        />
      )}
      <MapModal
        open={openMap}
        setOpen={setOpenMap}
        position={{
          lat: selectedUser?.lat || 31.5204,
          lng: selectedUser?.lng || 74.3587,
        }}
      />

      <div className={classes.top}>
        <img
          src={
            selectedUser?.photo
              ? `${baseUrl}/${selectedUser?.photo}`
              : defaultImage
          }
          alt=""
          className={classes.agentPic}
        />
        <Button
          sx={buttonSx}
          startIcon={
            <KeyboardBackspaceSharpIcon
              style={{ color: "#134696", marginLeft: -30 }}
            />
          }
          onClick={() => history.goBack()}
        >
          Back
        </Button>
        {selectedUser?.verification_status_by_admin === "verified" && (
          <img src={verifiedBadge} alt="" className={classes.badge} />
        )}
        <div className={classes.btnContainer}>
          {!verificationDetail?.isDirect &&
          selectedUser?.verification_status_by_admin === "in_progress" ? (
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
              {deactivateUserApiInfo?.loading ||
              activateUserApiInfo?.loading ? (
                <CircularProgress
                  size={25}
                  sx={{
                    color: "#134696",
                  }}
                />
              ) : selectedUser?.is_active ? (
                <CustomTooltip title="Deactivate User" placement="left">
                  <ShowIcon
                    onClick={() => {
                      let formData = new FormData();
                      formData.append("user_id", selectedUser?.id);
                      dispatch(
                        deactivateUser({
                          authToken: loggedInObject?.token,
                          data: formData,
                          userID: selectedUser?.id,
                          edit: true,
                        })
                      );
                    }}
                    sx={{
                      fontSize: 20,
                      cursor: "pointer",
                      height: "55px",
                      width: "48px",
                    }}
                  />
                </CustomTooltip>
              ) : (
                <CustomTooltip title="Activate User" placement="left">
                  <HideIcon
                    onClick={() => {
                      let formData = new FormData();
                      formData.append("user_id", selectedUser?.id);
                      dispatch(
                        activateUser({
                          authToken: loggedInObject?.token,
                          data: formData,
                          userID: selectedUser?.id,
                          edit: true,
                        })
                      );
                    }}
                    sx={{
                      fontSize: 20,
                      cursor: "pointer",
                      height: "55px",
                      width: "48px",
                    }}
                  />
                </CustomTooltip>
              )}
              <EditIcon
                sx={{
                  fontSize: 20,
                  cursor: "pointer",
                  height: "55px",
                  width: "48px",
                }}
                onClick={() => {
                  history.push(`/edit-user/${selectedUser?.id}`);
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
                onClick={() => {
                  setOpenConfirmModal(true);
                }}
              />
            </>
          )}
        </div>
      </div>
      <div className={classes.bottom}>
        <div className={classes.callToActionContainer}>
          <div
            style={{ paddingBottom: "15px", borderBottom: "1px solid #e1e1e1" }}
          >
            <Button
              sx={{
                border: "1px solid #ffffff",
                borderRadius: "17px",
                color: "#FFFFFF",
                width: 195,
                height: 53,
                m: 1,
              }}
              onClick={(event) => setCallAnchor(event.currentTarget)}
            >
              <Call
                style={{
                  height: 22,
                  width: 22,
                  fill: "#FFFFFF",
                }}
              />{" "}
              <span
                style={{
                  marginLeft: "5px",
                  fontFamily: "medium",
                  fontSize: 13,
                }}
              >
                Call
              </span>
            </Button>
            {/* <Button
              sx={{
                border: "1px solid #ffffff",
                borderRadius: "17px",
                color: "#FFFFFF",
                width: 195,
                height: 53,
                m: 1,
              }}
            >
              <Chat
                style={{
                  height: 22,
                  width: 22,
                  fill: "#FFFFFF",
                }}
              />{" "}
              <span style={{ marginLeft: "5px", fontFamily: "medium", fontSize: 13 }}>
                Appointment
              </span>
            </Button> */}
          </div>
          <CallMenu
            anchorEl={callAnchor}
            setAnchorEl={setCallAnchor}
            phone={selectedUser?.phone_number}
          />
        </div>

        <div>
          <span className={classes.name}>{`${selectedUser?.full_name}`}</span>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className={classes.address} style={{ margin: 0 }}>
              {!selectedUser?.address &&
              !selectedUser?.area &&
              !selectedUser?.country
                ? "No Location"
                : `${selectedUser?.address || ""}, ${
                    selectedUser?.area || ""
                  }, ${selectedUser?.city || ""}, ${
                    selectedUser?.country || ""
                  }`}
            </p>
            <p style={{ color: "#fff", marginRight: 5 }}> | </p>
            <p style={{ color: "#D5D5D5" }}>
              {getUserTypeLabel(selectedUser?.user_type)}
            </p>
          </div>
        </div>
        <div>
          <div className={classes.horizontal}>
            <div style={{ marginRight: 30 }}>
              <p className={classes.listingsTotal}>
                {selectedUser?.total_listings}
              </p>
              <span className={classes.listingsTitle}>Total Listings</span>
            </div>
            {/* <div>
              <p className={classes.listingsTotal}>5.0</p>
              <span className={classes.listingsTitle}>
                Ratings - {selectedUser?.total_ratings} Reviews
              </span>
            </div> */}
          </div>
          <div className={classes.horizontal} style={{ marginTop: 20 }}>
            <div style={{ marginRight: 30 }}>
              <span className={classes.info}>Email Address:</span>
              <p
                className={classes.info}
                style={{
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                {selectedUser?.email}
              </p>
            </div>
            <div style={{ margin: "10px 0px" }}>
              <p className={classes.info}>Contact Number:</p>
              <span
                className={classes.info}
                style={{
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                {selectedUser?.phone_number || "Not Provided"}
              </span>
            </div>
            <div style={{ marginLeft: "10px" }}>
              {selectedUser?.user_type !== USER_TYPES?.USER && (
                <Button
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    position: "relative",
                    textTransform: "none",
                    maxWidth: 120,
                    padding: "8px 0px",
                  }}
                  onClick={() => setOpenMap(true)}
                >
                  <LocationOnIcon
                    style={{ color: "white", fontSize: 20, marginRight: 10 }}
                  />
                  <span className={classes.map}>View on map</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopContainer;
