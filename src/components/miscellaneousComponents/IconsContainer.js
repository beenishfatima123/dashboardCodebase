import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ApproveIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/CancelOutlined";
import CustomTooltip from "./CustomTooltip";
import { updateVerification } from "../../features/verificationSlice";

const IconsContainer = ({
  type,
  customStyle,
  propertyActions,
  requestActions,
  setPropertyActions,
  customColor,
  property,
  verificationID,
  setSelId
}) => {
  const dispatch = useDispatch();
  const loggedInObject = useSelector((state) => state.auth.currentUser);

  return (
    <div className={customStyle}>
      {requestActions ? (
        <>
          <CustomTooltip title={`Verify ${type}`} placement="left">
            <ApproveIcon
              onClick={() => {
                setSelId(property?.id);
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
                setSelId(property?.id);
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
      ) : null}
    </div>
  );
};

export default IconsContainer;
