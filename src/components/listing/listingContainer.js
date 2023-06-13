import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { useHistory } from "react-router";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  Divider,
  Button,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import { baseUrl } from "../constants/baseUrls";
import { CONTENT_WIDTH } from "../constants/global";
import { LISTINGS_FILTERS, USER_TYPES } from "../constants/global";
import ShowIcon from "@mui/icons-material/Visibility";
import HideIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/CancelOutlined";
import EditIcon from "@mui/icons-material/Edit";
import BoxIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import BedroomIcon from "@mui/icons-material/BedroomParent";
import BathtubIcon from "@mui/icons-material/Bathtub";
import Loader from "../../customComponents/Loader";
import Pagination from "../miscellaneousComponents/Pagination";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ListingTypeFilters from "./ListingTypeFilters";
import {
  getAllListings,
  toggleListingVisibility,
  resetPropertyViewToggleApiInfo,
  deleteProperty,
  setListingVerificationDetail,
  resetDeletePropertyApiInfo,
  queryListings,
} from "../../features/listingsSlice";
import CustomTopInfo from "../../customComponents/layout/CustomTopInfo";
import ListingSearchFilter from "./ListingSearchFilter";
import { buildListingSearchQuery } from "../constants/helperFunctions";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "25px 20px",
    border: "1px solid #c9c9c9",
    borderRadius: "10px",
  },
  topSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // width: CONTENT_WIDTH,
    maxWidth: "100%",
    // alignSelf: "center",
    margin: "20px 35px",
    // backgroundColor: "pink",
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
    minHeight: 130,
    padding: "10px",
  },
  text: {
    color: "#1A2954",
    fontSize: 18,
    margin: 0,
  },
  currencyText: {
    color: "#134696",
    fontSize: 27,
    margin: 0,
  },
  addBtn: {
    borderRadius: "35px",
    backgroundColor: "#134696",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "0.5s",
    zIndex: 1200,
    marginRight: "20px",
  },
  btnText: {
    borderRadius: "50%",
    fontSize: 15,
    color: "white",
  },

  mycontainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    cursor: "pointer",
    padding: "0px 20px",
  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
    color: "#1A2954",
    fontSize: 18,
    margin: 0,
  },
  description: {
    color: "#1A2954",
    fontSize: 24,
    fontWeight: 500,
    margin: 0,
  },
  divider: {
    height: 1,
    backgroundColor: "rgb(201 201 201)",
    width: "100%",
    margin: "10px 0px",
  },
  listedBy: {
    color: "#7D7D7D",
    fontSize: 14,
    fontFamily: "light",
    margin: 0,
  },
  price: {
    color: "#134696",
    fontSize: 26,
    fontFamily: "heavy",
    margin: 0,
    textTransform: "uppercase",
  },
  userDetails: {
    color: "#1A2954",
    fontSize: 18,
    fontWeight: "normal",
    margin: 0,
  },
  "@media (max-width: 600px)": {
    priceContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  "@media (max-width: 1024px)": {
    container: {
      width: "100%",
      marginBottom: 10,
      padding: 0,
    },
  },
}));

const ListingContainer = () => {
  let history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [featureFilter, setFeatureFilter] = useState(LISTINGS_FILTERS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const loggedInObject = useSelector((state) => state.auth.currentUser);

  const {
    propertyViewToggleApiInfo,
    allListings,
    allListingsApiInfo,
    searchedListings,
    searchListingApiInfo,
    deletePropertyApiInfo,
  } = useSelector((state) => state.listings);

  const delayedListingSearch = useMemo(
    () => debounce((query) => searchListings(query), 500),
    // eslint-disable-next-line
    []
  );

  const listingsToShow = useMemo(() => {
    if (searchQuery?.searchTitle?.length >= 3 && searchedListings) {
      return searchedListings;
    } else if (searchQuery?.searchAgent?.length >= 3 && searchedListings) {
      return searchedListings;
    } else if (searchQuery?.searchLocation?.length >= 3 && searchedListings) {
      return searchedListings;
    } else {
      return allListings;
    }
    // eslint-disable-next-line
  }, [searchedListings, allListings, searchQuery]);

  useEffect(() => {
    if (searchQuery?.searchTitle?.length >= 3  || searchQuery?.searchAgent?.length >= 3 || searchQuery?.searchLocation?.length >= 3)
      delayedListingSearch(buildListingSearchQuery(searchQuery));
    // eslint-disable-next-line
  }, [searchQuery]);

  const searchListings = async (query) => {
    dispatch(
      queryListings({
        query,
      })
    );
  };

  const [selID, setSelID] = useState(84);
  const [openDialog, setOpenDialog] = React.useState(false);
  const handlekOpenClick = (propertyID) => {
    setOpenDialog(true);
    setSelID(propertyID);
  };
  const handleCloseClick = () => {
    setSelID(null);
    setOpenDialog(false);
  };

  const paginationUrl = useMemo(() => {
    if (allListings?.next)
      return `${
        allListings?.next?.replace("http", "https").split("page=")[0]
      }page=`;
    else
      return `${
        allListings?.previous?.replace("http", "https").split("page=")[0]
      }page=`;
  }, [allListings]);

  const paginateProperties = (url) => {
    dispatch(
      getAllListings({
        authToken: loggedInObject?.token,
        dataURL: url,
      })
    );
  };

  const handlePageSelect = (pageNumber) => {
    paginateProperties(`${paginationUrl}${pageNumber}`);
  };

  useEffect(() => {
    if (loggedInObject) {
      if (loggedInObject.user_type === USER_TYPES.ADMIN) {
        dispatch(
          getAllListings({
            authToken: loggedInObject?.token,
            dataURL:
              baseUrl +
              `/users/property/?dashboard=true&purpose=${featureFilter?.value}`,
          })
        );
      } else {
        dispatch(
          getAllListings({
            authToken: loggedInObject?.token,
            dataURL:
              baseUrl +
              `/users/property/?user_id=${loggedInObject.id}&purpose=${featureFilter?.value}`,
          })
        );
      }
    }
  }, []);

  useEffect(() => {
    if (propertyViewToggleApiInfo?.response) {
      toast.success(
        propertyViewToggleApiInfo?.response?.is_active_listing
          ? "Listing is visible now."
          : "Listing is hidden now.",
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          progressStyle: { backgroundColor: "#014493" },
        }
      );
      dispatch(resetPropertyViewToggleApiInfo());
    }
    // eslint-disable-next-line
  }, [propertyViewToggleApiInfo]);

  useEffect(() => {
    if (deletePropertyApiInfo?.response?.status) {
      toast.success(deletePropertyApiInfo?.response?.result, {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
      });
      setSelID(null);
      dispatch(resetDeletePropertyApiInfo());
    } else {
      toast.error(deletePropertyApiInfo?.response?.result, {
        position: toast.POSITION.BOTTOM_RIGHT,
        // progressStyle: { backgroundColor: "#014493" },
      });
      setSelID(null);
      dispatch(resetDeletePropertyApiInfo());
    }
    // eslint-disable-next-line
  }, [deletePropertyApiInfo?.response?.status]);

  const toggleVisibility = async (listingId, value) => {
    setSelID(listingId);
    let formData = new FormData();
    formData.append("is_active_listing", value);
    dispatch(
      toggleListingVisibility({
        id: listingId,
        authToken: loggedInObject?.token,
        formData: formData,
        edit: false,
      })
    );
  };

  const deleteListing = () => {
    setSelID(null);
    setOpenDialog(false);
    dispatch(
      deleteProperty({
        id: selID,
        authToken: loggedInObject?.token,
      })
    );
  };

  useEffect(() => {
    if (loggedInObject) {
      if (loggedInObject.user_type === USER_TYPES.ADMIN) {
        dispatch(
          getAllListings({
            authToken: loggedInObject?.token,
            dataURL:
              baseUrl +
              `/users/property/?dashboard=true&purpose=${featureFilter?.value}`,
          })
        );
      } else {
        dispatch(
          getAllListings({
            authToken: loggedInObject?.token,
            dataURL:
              baseUrl +
              `/users/property/?user_id=${loggedInObject.id}&purpose=${featureFilter?.value}`,
          })
        );
      }
    }
  }, [featureFilter]);

  return (
    <>
      <CustomTopInfo heading="Listings" />
      <div className={classes.container}>
        <div className={classes.topSection}>
          <div style={{ fontSize: 22, fontFamily: "heavy", color: "#134696" }}>
            All Listings
          </div>
          <ListingTypeFilters
            selectedFilter={featureFilter}
            setSelectedFilter={setFeatureFilter}
          />
        </div>
        <Divider style={{ margin: "0 20px" }} />
        <div className={classes.topSection}>
          <ListingSearchFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <Divider style={{ margin: "0 20px" }} />
        <div style={{ marginTop: "20px", width: "96%", margin: "auto" }}>
          {allListingsApiInfo?.loading || searchListingApiInfo?.loading || deletePropertyApiInfo?.loading ? (
            <Loader />
          ) : (
            <>
              <Grid
                container
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
                marginTop="10px"
              >
                {listingsToShow?.results && listingsToShow?.results?.length > 0 ? (
                  listingsToShow?.results.map((property, index) => (
                    <Grid item key={index} xs={12} lg={4} xl={3}>
                      {selID === property?.id &&
                      propertyViewToggleApiInfo?.loading ? (
                        <div
                          style={{
                            display: "flex",
                            margin: "auto",
                          }}
                        >
                          <CircularProgress
                            size={75}
                            sx={{
                              margin: "auto",
                              color: "#134696",
                            }}
                          />
                        </div>
                      ) : (
                        <>
                          <div
                            onClick={() => {
                              dispatch(
                                setListingVerificationDetail({
                                  isDirect: true,
                                  verificationID: null,
                                })
                              );
                              history.push(`/listing/${property?.id}`);
                            }}
                            style={{
                              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 80%, rgba(0,0,0,1)),url(${baseUrl}/${property?.image[0]?.image})`,
                              width: "100%",
                              height: "200px",
                              cursor: "pointer",
                              borderRadius: 5,
                              position: "relative",
                              backgroundSize: "cover",
                              backgroundColor: "grey",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                marginTop: 170,
                                bottom: "8px",
                                fontSize: "18px",
                                color: "white",
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-around",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  color: "white",
                                  alignItems: "center",
                                }}
                              >
                                <div>
                                  <BoxIcon />
                                </div>
                                &nbsp;
                                <div>{`${parseInt(property?.size)} ${
                                  property?.unit
                                }`}</div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  color: "white",
                                  alignItems: "center",
                                }}
                              >
                                <div>
                                  <BedroomIcon />
                                </div>
                                &nbsp;
                                <div>{property?.bedrooms}</div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  color: "white",
                                  alignItems: "center",
                                }}
                              >
                                <div>
                                  <BathtubIcon />
                                </div>
                                &nbsp;
                                <div>{property?.bathrooms}</div>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                              marginTop: 10,
                            }}
                          >
                            <div className={classes.contentContainer}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <p
                                  className={classes.text}
                                  style={{
                                    color: "#134696",
                                    fontFamily: "heavy",
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {`${parseInt(property?.size)} ${
                                    property?.unit
                                  }, ${property?.categories}`}
                                </p>
                                <p>
                                  {property?.is_active_listing ? (
                                    <Tooltip
                                      title="Hide Listing"
                                      placement="left"
                                      PopperProps={{
                                        sx: {
                                          "& .MuiTooltip-tooltip": {
                                            backgroundColor: "#134696",
                                            color: "#fff",
                                            fontSize: 12,
                                            fontFamily: "medium",
                                          },
                                        },
                                      }}
                                    >
                                      <ShowIcon
                                        sx={{ fontSize: 20, cursor: "pointer" }}
                                        onClick={() =>
                                          toggleVisibility(
                                            property?.id,
                                            !property?.is_active_listing
                                          )
                                        }
                                      />
                                    </Tooltip>
                                  ) : (
                                    <Tooltip
                                      title="Show Listing"
                                      placement="left"
                                      PopperProps={{
                                        sx: {
                                          "& .MuiTooltip-tooltip": {
                                            backgroundColor: "#134696",
                                            color: "#fff",
                                            fontSize: 12,
                                            fontFamily: "medium",
                                          },
                                        },
                                      }}
                                    >
                                      <HideIcon
                                        sx={{ fontSize: 20, cursor: "pointer" }}
                                        onClick={() =>
                                          toggleVisibility(
                                            property?.id,
                                            !property?.is_active_listing
                                          )
                                        }
                                      />
                                    </Tooltip>
                                  )}
                                </p>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <p
                                  className={classes.text}
                                  style={{
                                    color: "#134696",
                                  }}
                                >
                                  {`${property?.area}, ${property?.city}`}
                                </p>
                                <EditIcon
                                  sx={{ fontSize: 20, cursor: "pointer" }}
                                  onClick={() => {
                                    history.push(
                                      `/edit-listing/${property?.id}`
                                    );
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  borderBottom: "1px solid #707070",
                                }}
                              >
                                <p
                                  className={classes.currencyText}
                                  style={{
                                    color: "#134696",
                                    fontFamily: "heavy",
                                  }}
                                >
                                  {property?.currency} {property?.price}
                                </p>
                                <DeleteIcon
                                  onClick={() => {
                                    handlekOpenClick(property?.id);
                                  }}
                                  sx={{
                                    fontSize: 20,
                                    cursor: "pointer",
                                    color: "red",
                                  }}
                                />
                              </div>
                              <p
                                className={classes.text}
                                style={{
                                  color: "#134696",
                                  fontSize: 14,
                                }}
                              >
                                Listed By:{" "}
                                <span
                                  style={{ fontFamily: "heavy", fontSize: 18 }}
                                >
                                  {`${
                                    property?.user?.full_name || "Anonymous"
                                  }`}{" "}
                                </span>
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </Grid>
                  ))
                ) : (
                  <>
                    <div>No Results Found</div>
                  </>
                )}
              </Grid>
              {listingsToShow?.results?.length > 0 && (
                <Pagination
                  data={listingsToShow}
                  page={handlePageSelect}
                  paginate={paginateProperties}
                />
              )}
            </>
          )}
        </div>
        <Dialog
          open={openDialog}
          onClose={handleCloseClick}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Lisitng"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure to delete this listing?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseClick} autoFocus>
              No
            </Button>
            <Button onClick={() => deleteListing()}>Yes</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default ListingContainer;
