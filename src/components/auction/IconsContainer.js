import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApproveIcon from "@mui/icons-material/CheckCircleOutline";
import CustomTooltip from "../miscellaneousComponents/CustomTooltip";
import { updateVerification } from "../../features/verificationSlice";
import DeleteIcon from "@mui/icons-material/CancelOutlined";
import ShowIcon from "@mui/icons-material/Visibility";
import HideIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import { CircularProgress } from "@mui/material";
import ConfirmModal from "../miscellaneousComponents/ConfirmModal";
import { deleteAuction } from "../../features/auctionSlice";
import { useHistory } from "react-router";

const IconsContainer = ({
  type,
  customStyle,
  requestActions,
  customColor,
  auction,
  verificationID,
  setSelId,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const removeAuction = () => {
    dispatch(
      deleteAuction({ authToken: loggedInObject?.token, id: auction?.id })
    );
  };

  return (
    <div
      className={customStyle}
      style={{ display: "grid", alignItems: "center", marginRight: 5 }}
    >
      {openConfirmModal && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title="Are you sure you want to delete this auction?"
          handleConfirm={removeAuction}
        />
      )}
      {requestActions ? (
        <>
          <CustomTooltip title={`Verify ${type}`} placement="left">
            <ApproveIcon
              onClick={() => {
                setSelId(auction?.id);
                const sendVerificationData = {
                  status: "verified",
                };
                dispatch(
                  updateVerification({
                    id: verificationID,
                    token: loggedInObject?.token,
                    reqData: sendVerificationData,
                  })
                );
              }}
              sx={{
                fontSize: 20,
                cursor: "pointer",
                width: "25px",
                height: "25px",
                color: "#0ed864",
              }}
            />
          </CustomTooltip>
          <CustomTooltip title={`Decline ${type}`} placement="left">
            <DeleteIcon
              onClick={() => {
                setSelId(auction?.id);
                const sendVerificationData = {
                  status: "declined",
                };
                dispatch(
                  updateVerification({
                    id: verificationID,
                    token: loggedInObject?.token,
                    reqData: sendVerificationData,
                  })
                );
              }}
              sx={{
                fontSize: 20,
                cursor: "pointer",
                color: "red",
                width: "25px",
                height: "25px",
              }}
            />
          </CustomTooltip>
        </>
      ) : (
        <>
          <DeleteIcon
            sx={{
              fontSize: 20,
              cursor: "pointer",
              color: "red",
            }}
            onClick={() => setOpenConfirmModal(true)}
          />
          <EditIcon
            sx={{ fontSize: 20, cursor: "pointer" }}
            onClick={() => {
              history.push(`/edit-auction/${auction?.id}`);
            }}
          />

          {false ? (
            <CircularProgress
              size={25}
              sx={{
                color: "#134696",
              }}
            />
          ) : true ? (
            <CustomTooltip title="Hide Auction" placement="left">
              <ShowIcon

                sx={{
                  fontSize: 20,
                  cursor: "pointer",
                }}
              />
            </CustomTooltip>
          ) : (
            <CustomTooltip title="Show Auction" placement="left">
              <HideIcon
                onClick={() => {
                }}
                sx={{
                  fontSize: 20,
                  cursor: "pointer",
                }}
              />
            </CustomTooltip>
          )}
        </>
      )}
    </div>
  );
};

export default IconsContainer;
