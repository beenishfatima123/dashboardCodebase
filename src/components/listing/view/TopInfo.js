import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
// eslint-disable-next-line
import {
  currencyFormatInitials,
  getConcatenatedPrice,
} from "../../../components/constants/helperFunctions";
import CustomTooltip from "../../../components/miscellaneousComponents/CustomTooltip";
import { CircularProgress } from "@mui/material";
import { Button } from "@mui/material";
import AcceptIcon from "@mui/icons-material/CheckCircleOutline";
import ShowIcon from "@mui/icons-material/Visibility";
import HideIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/CancelOutlined";
import EditIcon from "@mui/icons-material/Edit";
import {
  deleteProperty,
  resetPropertyViewToggleApiInfo,
  setListingVerificationDetail,
  toggleListingVisibility,
} from "../../../features/listingsSlice";
import { updateVerification } from "../../../features/verificationSlice";
import ConfirmModal from "../../miscellaneousComponents/ConfirmModal";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: "20px 5%",
  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    minWidth: 240,
    marginBottom: 10,
  },
  priceContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  location: {
    color: "#6B7B88",
    fontSize: 32,
    marginTop: 10,
    marginBottom: 0,
  },
  description: {
    color: "#1A2954",
    fontSize: 42,
    //fontFamily: 'heavy',
    fontFamily: "light",
    margin: 0,
    textTransform: "capitalize",
  },

  price: {
    color: "#134696",
    fontSize: 32,
    //fontFamily: 'heavy',
    fontFamily: "light",
    margin: 0,
  },
  propertyDetails: {
    color: "#6B7B88",
    fontSize: 16,
    fontWeight: "normal",
    marginTop: 20,
    marginBottom: 0,
  },
  iconsStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonsIconStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  reportContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "35px",
  },

  "@media (max-width: 600px)": {
    priceContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    price: {
      fontSize: 32,
    },
    description: {
      fontSize: 32,
    },
  },
  "@media (max-width: 650px)": {
    topContainer: {
      flexDirection: "column",
    },
    reportContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    location: {
      fontSize: 24,
      marginBottom: 10,
    },
  },
}));
const TopInfo = ({ property }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const darkMode = false;

  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const { propertyViewToggleApiInfo, verificationDetail } = useSelector(
    (state) => state.listings
  );
  const { updateRequestApiInfo } = useSelector((state) => state.verifications);

  useEffect(() => {
    if (updateRequestApiInfo?.response) {
      dispatch(
        setListingVerificationDetail({ isDirect: true, verificationID: null })
      );
      history.push(`/listing/${property?.id}`);
    }
  }, [updateRequestApiInfo?.response]);

  useEffect(() => {
    if (propertyViewToggleApiInfo?.response) {
      toast.success(
        propertyViewToggleApiInfo?.response?.is_active_listing ? "Listing is visible now." : "Listing is hidden now.",
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          progressStyle: { backgroundColor: "#014493" },
        }
      );
      dispatch(resetPropertyViewToggleApiInfo());
    }
    // eslint-disable-next-line
  }, [propertyViewToggleApiInfo]);

  const removeListing = () => {
    dispatch(
      deleteProperty({
        id: property?.id,
        authToken: loggedInObject?.token,
      })
    );
  };

  return (
    <div className={classes.container}>
      {openConfirmModal && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title="Are you sure you want to delete this listing?"
          handleConfirm={removeListing}
        />
      )}
      <div className={classes.topContainer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="480.212"
          height="42.839"
          viewBox="0 0 480.212 42.839"
          style={{ maxWidth: "100%" }}
        >
          <g
            id="Group_5633"
            data-name="Group 5633"
            transform="translate(0 1.107)"
          >
            <text
              id="_4"
              data-name="4"
              transform="translate(306.564 32.085)"
              fontSize="31"
              fontFamily="HelveticaNeueLTStd-Bd, Helvetica Neue LT Std !important"
              fill={darkMode ? "white" : "black"}
            >
              <tspan x="0" y="0">
                {property?.bedrooms}
              </tspan>
            </text>
            <text
              id="_1_Kanal"
              data-name="1 Kanal"
              transform="translate(48.306 32.085)"
              fontSize="31"
              fontFamily="HelveticaNeueLTStd-Bd, Helvetica Neue LT Std  !important"
              fill={darkMode ? "white" : "black"}
              fontWeight="heavy"
            >
              <tspan x="0" y="0">
                {`${parseInt(property?.size)} ${
                  property?.unit === "Square Feet" ? "Sq. ft." : property?.unit
                }`}
              </tspan>
            </text>
            <g id="area" transform="translate(0 3.892)">
              <path
                id="Shape"
                d="M34.121,35.019H28.734a.9.9,0,0,1-.9-.9v-1.8H7.184v1.8a.9.9,0,0,1-.9.9H.9a.9.9,0,0,1-.9-.9V28.733a.9.9,0,0,1,.9-.9h1.8V7.183H.9a.9.9,0,0,1-.9-.9V.9A.9.9,0,0,1,.9,0H6.286a.9.9,0,0,1,.9.9v1.8H27.836V.9a.9.9,0,0,1,.9-.9h5.387a.9.9,0,0,1,.9.9V6.285a.9.9,0,0,1-.9.9h-1.8V27.835h1.8a.9.9,0,0,1,.9.9v5.388A.9.9,0,0,1,34.121,35.019ZM6.286,27.835a.9.9,0,0,1,.9.9v1.8H27.836v-1.8a.9.9,0,0,1,.9-.9h1.795V7.183h-1.8a.9.9,0,0,1-.9-.9v-1.8H7.184v1.8a.9.9,0,0,1-.9.9H4.49V27.835Z"
                transform="translate(0 0)"
                fill={darkMode ? "white" : "black"}
              />
            </g>
            <text
              id="_2"
              data-name="2"
              transform="translate(463.212 31.893)"
              fontSize="31"
              fontFamily="HelveticaNeueLTStd-Bd, Helvetica Neue LT Std !important"
              fill={darkMode ? "white" : "black"}
            >
              <tspan x="0" y="0">
                {property?.bathrooms}
              </tspan>
            </text>
            <g id="batch" transform="translate(400.929)">
              <path
                id="Path"
                d="M986.785,712.7h-1.147V694.588c0-3.638-2.49-6.588-5.562-6.588H977.99a.768.768,0,0,0-.7.823v4.2a4.011,4.011,0,0,0-2.781,4.035.767.767,0,0,0,.7.823h5.562a.767.767,0,0,0,.695-.823,4.01,4.01,0,0,0-2.781-4.035v-3.376h1.391c2.3,0,4.172,2.212,4.172,4.94V712.7h-37.3a1.036,1.036,0,0,0-.939,1.112v1.07a1.036,1.036,0,0,0,.939,1.112h39.838a1.037,1.037,0,0,0,.939-1.112v-1.07A1.037,1.037,0,0,0,986.785,712.7Z"
                transform="translate(-946.008 -688)"
                fill={darkMode ? "white" : "black"}
              />
              <path
                id="Path-2"
                data-name="Path"
                d="M984.388,711.953h-36.01a.389.389,0,0,0-.348.42c0,.005,0,.011,0,.016.266,5.863,2.369,11.932,5.446,13.8a3.8,3.8,0,0,0,.127,4.656,2.4,2.4,0,0,0,3.848-.153,3.838,3.838,0,0,0,.361-3.918h17.12a3.8,3.8,0,0,0-.239,2.668c.48,1.724,2.024,2.651,3.449,2.071a3.66,3.66,0,0,0,1.125-5.365c3.1-1.869,5.2-7.938,5.446-13.8A.389.389,0,0,0,984.388,711.953Z"
                transform="translate(-945.527 -690.004)"
                fill={darkMode ? "white" : "black"}
              />
            </g>
            <g id="bed" transform="translate(241.876 6.17)">
              <path
                id="Shape-2"
                data-name="Shape"
                d="M40.827,22.122H0l4.512-7.144V1.837L6.348,0h28.13l1.837,1.837V14.978l4.511,7.142ZM20.414,11.476a49.2,49.2,0,0,1,12.228,1.368V3.674H8.185v9.17A49.219,49.219,0,0,1,20.414,11.476Z"
                fill={darkMode ? "white" : "black"}
                transform="translate(0.083 0)"
              />
              <path
                id="Path-3"
                data-name="Path"
                d="M823,715.707v3.673h4.28v5.059h3.673V719.38h25.085v5.059h3.673V719.38h4.28v-3.673Z"
                fill={darkMode ? "white" : "black"}
                transform="translate(-823 -691.324)"
              />
              <path
                id="Path-4"
                data-name="Path"
                d="M852.071,699.889s-11.35-4.44-13.624-4.44-4.117,1.03-4.117,2.3v3.212a34.555,34.555,0,0,1,4.1-.769C839.931,700.049,852.071,699.889,852.071,699.889Z"
                fill={darkMode ? "white" : "black"}
                transform="translate(-823.559 -690.324)"
              />
              <path
                id="Path-5"
                data-name="Path"
                d="M853.87,700.961v-3.212c0-1.27-1.844-2.3-4.118-2.3s-13.624,4.44-13.624,4.44,12.14.16,13.644.3A34.572,34.572,0,0,1,853.87,700.961Z"
                fill={darkMode ? "white" : "black"}
                transform="translate(-823.648 -690.324)"
              />
            </g>
          </g>
        </svg>

        <div className={classes.btnContainer}>
          {!verificationDetail?.isDirect &&
          property?.verification_status === "in_progress" ? (
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
              {propertyViewToggleApiInfo?.loading ? (
                <CircularProgress
                  size={50}
                  sx={{
                    color: "#134696",
                  }}
                />
              ) : property?.is_active_listing ? (
                <CustomTooltip title="Hide Listing" placement="left">
                  <ShowIcon
                    sx={{
                      fontSize: 20,
                      cursor: "pointer",
                      height: "55px",
                      width: "48px",
                    }}
                    onClick={() => {
                      let formData = new FormData();
                      formData.append("is_active_listing", false);
                      dispatch(
                        toggleListingVisibility({
                          id: property?.id,
                          authToken: loggedInObject?.token,
                          formData: formData,
                          edit: true,
                        })
                      );
                    }}
                  />
                </CustomTooltip>
              ) : (
                <CustomTooltip title="Show Listing" placement="left">
                  <HideIcon
                    sx={{
                      fontSize: 20,
                      cursor: "pointer",
                      height: "55px",
                      width: "48px",
                    }}
                    onClick={() => {
                      let formData = new FormData();
                      formData.append("is_active_listing", true);
                      dispatch(
                        toggleListingVisibility({
                          id: property?.id,
                          authToken: loggedInObject?.token,
                          formData: formData,
                          edit: true,
                        })
                      );
                    }}
                  />
                </CustomTooltip>
              )}
              <>
                <EditIcon
                  sx={{
                    fontSize: 20,
                    cursor: "pointer",
                    height: "55px",
                    width: "48px",
                  }}
                  onClick={() => {
                    history.push(`/edit-listing/${property?.id}`);
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
                />
              </>
            </>
          )}
        </div>
      </div>
      <div className={classes.reportContainer}>
        <p
          className={classes.location}
          style={{
            color: darkMode ? "white" : "#6B7B88",
          }}
        >
          {`${property?.address}`}
        </p>
      </div>
      <div className={classes.priceContainer}>
        <p
          className={classes.description}
          style={{
            color: darkMode ? "#0ed864" : "#134696",
            fontFamily: "heavy",
          }}
        >
          {`${property?.title}`}
        </p>
        <CustomTooltip
          title={`${currencyFormatInitials(
            property?.price,
            property?.currency
          )}`}
        >
          <p
            className={classes.price}
            style={{
              color: darkMode ? "#0ed864" : "#134696",
              fontFamily: "heavy",
            }}
          >
            {getConcatenatedPrice(
              `${currencyFormatInitials(property?.price, property?.currency)}`,
              14
            )}
          </p>
        </CustomTooltip>
      </div>

      <span
        className={classes.propertyDetails}
        style={{
          color: darkMode ? "white" : "#6B7B88",
        }}
      >
        {`${property?.description}`}
      </span>
    </div>
  );
};

export default TopInfo;
