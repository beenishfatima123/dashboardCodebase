import React, { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Stepper, Step, StepLabel } from "@mui/material";
// eslint-disable-next-line
import {
  currencyFormatInitials,
  getConcatenatedPrice,
} from "../../constants/helperFunctions";
// eslint-disable-next-line
import { USER_TYPES } from "../../constants/global";
import {
  agentListings,
  deleteListing,
  resetUpdateListingApi,
  updateListingVisibility,
} from "../../../features/agentSlice";
import Loader from "../../../customComponents/Loader";
import ShowIcon from "@mui/icons-material/Visibility";
import HideIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/CancelOutlined";
import EditIcon from "@mui/icons-material/Edit";
import VerificationDocuments from "./VerificationDocuments";
import CustomTooltip from "../../miscellaneousComponents/CustomTooltip";
import { CircularProgress } from "@mui/material";
import ConfirmModal from "../../miscellaneousComponents/ConfirmModal";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 5%",
    borderBottom: "1px solid #707070",
  },
  headings: {
    fontSize: 16,
    color: "#134696",
    fontFamily: "heavy",
  },
  description: {
    fontSize: 18,
    color: "#7D7D7D",
    maxWidth: "100%",
    maxHeight: 120,
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "5px",
    },
    scrollBehavior: "smooth !important",
  },
  divider: {
    width: "100%",
    height: 3,
    backgroundColor: "#000000",
    margin: "20px 0px",
  },
  stepperSecondary: {
    fontSize: 11,
    color: "#134696",
    fontWeight: "light",
  },
  stepperPrimary: {
    fontSize: 16,
    color: "#134696",
    fontFamily: "heavy",
  },
  horizontal: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  listingsTable: {
    height: 200,
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "5px",
    },
    scrollBehavior: "smooth !important",
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #e3e3e3",
    padding: "20px 0px",
    cursor: "pointer",
  },
  tablePrimary: {
    fontSize: 17,
    color: "#000000",
    fontFamily: "heavy",
  },
  tableSecondary: {
    fontSize: 17,
    color: "#8B8B8B",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconsStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  "@media (max-width:1000px)": {
    row: {
      overflowX: "scroll",
      "&::-webkit-scrollbar": {
        width: "0.4em",
      },
      "&::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.1)",
        borderRadius: "5px",
      },
      scrollBehavior: "smooth !important",
    },
  },
  "@media (max-width: 550px)": {
    horizontal: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    footer: {
      flexDirection: "column",
      //   alignItems: "flex-start",
    },
  },
}));
// eslint-disable-next-line
const buttonSx = {
  border: "1px solid lightgrey",
  borderRadius: 20,
  width: "215px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textTransform: "none",
};
const DetailsContainer = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  //   const { width } = useWindowDims();
  const [agentActions, setAgentActions] = useState();
  const [selID, setSelID] = useState(null);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const { selectedUser, selectedUserApiInfo, verificationDetail } = useSelector(
    (state) => state.users
  );
  //   const { darkMode } = useSelector((state) => state.global);
  const darkMode = false;
  const loggedInObject = useSelector((state) => state.auth.currentUser);

  const experienceArray = useMemo(() => {
    if (selectedUser?.experience?.length) return selectedUser?.experience;
  }, [selectedUser]);
  // eslint-disable-next-line
  const getDuration = (start, end) => {
    return `${moment(start).year()} - ${moment(end).year() || moment().year()}`;
  };

  const { agent_Listings, selectedAgentApiInfo, updateListingApiInfo } =
    useSelector((state) => state.agent);

  useEffect(() => {
    if (selectedUser) {
      dispatch(agentListings(selectedUser?.id));
    }
    // eslint-disable-next-line
  }, [selectedUser]);

  useEffect(() => {
    if (updateListingApiInfo?.response?.status === true) {
      dispatch(resetUpdateListingApi());
    }
    // eslint-disable-next-line
  }, [updateListingApiInfo?.response]);

  const removeListing = () => {
    setOpenConfirmModal(false);
    dispatch(
      deleteListing({
        id: selID,
        authToken: loggedInObject?.token,
      })
    );
  };

  return (
    <>
      {selectedUserApiInfo?.loading || selectedAgentApiInfo?.listingLoading ? (
        <Loader />
      ) : (
        <div className={classes.container}>
          {openConfirmModal && (
            <ConfirmModal
              open={openConfirmModal}
              setOpen={setOpenConfirmModal}
              title="Are you sure you want to delete this listing?"
              handleConfirm={removeListing}
            />
          )}
          <p
            className={classes.headings}
            style={{
              color: darkMode ? "#0ed864" : "#134696",
            }}
          >
            Personal Details
          </p>
          {/* <div style={{ position: "absolute", right: 0, marginTop: 30 }}>
        <RightContainerLines />
      </div> */}
          <span
            className={classes.description}
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              color: darkMode ? "#fff" : "#7D7D7D",
            }}
          >
            {selectedUser?.personal_description || " No description"}
          </span>
          <div className={classes.divider} />
          <div className={classes.horizontal}>
            <p
              className={classes.headings}
              style={{
                color: darkMode ? "#0ed864" : "#134696",
              }}
            >
              Experience
            </p>
            {experienceArray?.length > 0 ? (
              <Stepper
                activeStep={experienceArray?.length || 0}
                alternativeLabel
                sx={{ width: "100%" }}
              >
                {experienceArray?.map((elem, index) => (
                  <Step key={index}>
                    <StepLabel>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          className={classes.stepperSecondary}
                          style={{
                            color: darkMode ? "#0ed864" : "#134696",
                          }}
                        >
                          {getDuration(elem?.start_date, elem?.end_date)}
                        </span>
                        <span
                          className={classes.stepperPrimary}
                          style={{
                            color: darkMode ? "#0ed864" : "#134696",
                          }}
                        >
                          {elem?.company_name}
                        </span>
                        <span
                          className={classes.stepperSecondary}
                          style={{
                            color: darkMode ? "#0ed864" : "#134696",
                          }}
                        >
                          {`${elem?.city}, ${elem?.country}`}
                        </span>
                      </div>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            ) : (
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: darkMode ? "#0ed864" : "#134696",
                  }}
                >
                  No Experience
                </p>
              </div>
            )}
          </div>
          <div className={classes.divider} />
          <p
            className={classes.headings}
            style={{
              color: darkMode ? "#0ed864" : "#134696",
              margin: 0,
            }}
          >
            Listings
          </p>
          {agent_Listings?.result?.count > 0 ? (
            <>
              <div className={classes.listingsTable}>
                {agent_Listings?.result?.results?.map((elem, index) => (
                  <div
                    className={classes.row}
                    key={index}
                    // onClick={() => history.push(`/listing/${elem?.id}`)}
                  >
                    <span
                      className={classes.tablePrimary}
                      style={{
                        color: darkMode ? "#fff" : "#000000",
                      }}
                    >
                      {`${elem?.size} ${elem?.unit} ${elem?.bedrooms} Bedrooms ${elem?.bathrooms} Bathrooms`}
                    </span>
                    <span
                      className={classes.tableSecondary}
                      style={{ align: "left" }}
                    >{`${elem?.area}`}</span>
                    <span className={classes.tableSecondary}>
                      {getConcatenatedPrice(
                        currencyFormatInitials(elem?.price, elem?.currency),
                        14
                      )}
                    </span>
                    <span className={classes.tableSecondary}>
                      {`${elem?.city}, ${elem?.country}`}
                    </span>
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "20px",
                      }}
                    >
                      <>
                        {updateListingApiInfo?.updateLoading && selID === elem?.id ? (
                          <CircularProgress
                            size={25}
                            sx={{
                              color: "#134696",
                            }}
                          />
                        ) : elem?.is_active_listing ? (
                          <CustomTooltip title="Hide Listing" placement="left">
                            <ShowIcon
                              sx={{
                                fontSize: 20,
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setSelID(elem?.id);
                                let formData = new FormData();
                                formData.append("is_active_listing", false);
                                dispatch(
                                  updateListingVisibility({
                                    id: elem?.id,
                                    authToken: loggedInObject?.token,
                                    formData: formData,
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
                              }}
                              onClick={() => {
                                setSelID(elem?.id);
                                let formData = new FormData();
                                formData.append("is_active_listing", true);
                                dispatch(
                                  updateListingVisibility({
                                    id: elem?.id,
                                    authToken: loggedInObject?.token,
                                    formData: formData,
                                  })
                                );
                              }}
                            />
                          </CustomTooltip>
                        )}
                      </>
                      <EditIcon
                        sx={{ fontSize: 20, cursor: "pointer" }}
                        onClick={() => {
                          history.push(`/edit-listing/${elem?.id}`);
                        }}
                      />
                      <DeleteIcon
                        sx={{
                          fontSize: 20,
                          cursor: "pointer",
                          color: "red",
                        }}
                        onClick={() => {
                          setSelID(elem?.id);
                          setOpenConfirmModal(true);
                        }}
                      />
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: darkMode ? "#0ed864" : "#134696",
                }}
              >
                No Listing
              </p>
            </div>
          )}
          <div className={classes.divider} />
          {!verificationDetail?.isDirect && (
            <VerificationDocuments type="user" />
          )}
        </div>
      )}
    </>
  );
};

export default DetailsContainer;
