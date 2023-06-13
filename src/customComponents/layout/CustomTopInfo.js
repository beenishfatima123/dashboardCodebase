import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import moment from "moment/moment";
import ProfileMenu from "../profileMenu/ProfileMenu";
import { Button } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import AcceptIcon from "@mui/icons-material/CheckCircleOutline";
import HideIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/CancelOutlined";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmModal from "../../components/miscellaneousComponents/ConfirmModal";
import { deleteAuction } from "../../features/auctionSlice";
import { updateVerification } from "../../features/verificationSlice";

const useStyles = makeStyles(() => ({
  container: {
    padding: "0 40px",
    height: "15vh",
    borderBottom: "1px solid #7d7d7d",
    display: "flex",
    alignItems: "space-between",
    flexDirection: "column",
    justifyContent: "center",
  },
  innerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    color: "#134696",
    fontFamily: "heavy",
    fontSize: "2.5rem",
    textTransform: "capitalize",
  },
  date: {
    fontSize: "1.3rem",
    fontFamily: "light",
    color: "#ada7a7",
  },
}));

const CustomTopInfo = ({ backButton, heading, style, type, itemDetail }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const { verificationDetail } = useSelector((state) => state.auctions);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const removeAuction = () => {
    setOpenConfirmModal(false);
    dispatch(
      deleteAuction({ authToken: loggedInObject?.token, id: itemDetail?.id })
    );
  };

  return (
    <div className={classes.container} style={style}>
      {openConfirmModal && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title="Are you sure you want to delete this auction?"
          handleConfirm={removeAuction}
        />
      )}
      <div
        className={classes.innerContainer}
        style={{ marginTop: type === "auction" ? 50 : 0 }}
      >
        {backButton && (
          <Button
            sx={{
              background:
                "linear-gradient(90deg, rgba(14,216,100,1) 0%, rgba(255,255,255,1) 100%)",
              textTransform: "none",
              color: "#134696",
              width: 180,
              mt: 3,
              ml: 3,
              borderRadius: 0,
            }}
            startIcon={<ArrowBackIos style={{ color: "#134696" }} />}
            onClick={() => history.goBack()}
          >
            Back
          </Button>
        )}
        <div className={classes.heading}>{heading}</div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
          }}
        >
          {type ? (
            !verificationDetail?.isDirect &&
            itemDetail?.verification_status === "in_progress" ? (
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
                <HideIcon
                  sx={{
                    fontSize: 20,
                    color: "white",
                    cursor: "pointer",
                    height: "55px",
                    width: "48px",
                  }}
                />
                <EditIcon
                  sx={{
                    fontSize: 20,
                    color: "white",
                    cursor: "pointer",
                    height: "55px",
                    width: "48px",
                  }}
                  onClick={() => {
                    history.push(`/edit-${type}/${itemDetail?.id}`);
                  }}
                />
                <DeleteIcon
                  sx={{
                    fontSize: 20,
                    cursor: "pointer",
                    color: "white",
                    height: "55px",
                    width: "48px",
                  }}
                  onClick={() => setOpenConfirmModal(true)}
                />
              </>
            )
          ) : null}
          <ProfileMenu />
        </div>
      </div>
      {heading && (
        <div className={classes.date}>
          {moment().format("dddd, DD MMMM YYYY")}
        </div>
      )}
    </div>
  );
};

export default CustomTopInfo;
