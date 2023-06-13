import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import HeadingSvg from "./HeadingSvg";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Loader from "../../../customComponents/Loader";
import { getAgencyListings } from "../../../features/agencySlice";
import { setAdminIdforAgencyAddListing } from "../../../features/usersSlice";
import ListingSlider from "./ListingSlider";
import { setSelectedTab } from "../../../features/authSlice";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 1200,
    alignSelf: "center",
    width: "100%",
    margin: "20px 0px",
  },
  topContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    padding: "20px 0px",
    minHeight: 100,
    position: "relative",
    width: "100%",
    left: -80,
  },
  horizontal: {
    display: "flex",
    alignSelf: "flex-end",
    minWidth: 250,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bottomBorder: {
    height: 1,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "lightGray",
    marginTop: 20,
  },
  addBtn: {
    borderRadius: 35,
    backgroundColor: "#134696",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "0.5s",
    height: 44,
    minWidth: "max-content",
    marginRight: 20,
  },
  btnText: {
    fontSize: 15,
    color: "white",
    fontFamily: "medium",
  },
  "@media (max-width: 700px)": {
    topContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
}));
const AgencyListings = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [hovering, setHovering] = useState(false);

  const { agencyDetails, allAgencyListings, allAgencyListingsApiInfo } =
    useSelector((state) => state.agency);

  const { adminIdforAgencyAddListing } = useSelector((state) => state.users);

  useEffect(() => {
    if (agencyDetails) {
      dispatch(getAgencyListings({ id: agencyDetails?.id }));
    }
    // eslint-disable-next-line
  }, [agencyDetails]);

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>
        <HeadingSvg
          heading={`All Listings by ${agencyDetails?.company_name}`}
        />
        <div className={classes.horizontal}>
          <Button
            sx={{
              background:
                "linear-gradient(90deg, rgba(14,216,100,1) 0%, rgba(255,255,255,1) 100%)",
              textTransform: "none",
              color: "#134696",
              width: 180,
              margin: "10px 5%",
              alignSelf: "flex-end",
              borderRadius: 0,
            }}
            endIcon={<ArrowForwardIcon style={{ color: "#134696" }} />}
            onClick={() => {
              history.push("/listings")
              dispatch(setSelectedTab("Listings"));
            }}
          >
            View All
          </Button>
          <div
            className={classes.addBtn}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onClick={() => {
              dispatch(setAdminIdforAgencyAddListing(agencyDetails?.admin));
              // history.push("/add-listing");
              history.push({
                pathname: "/add-listing",
                state: { from: "agency", agencyID: agencyDetails?.id },
              });
            }}
            style={{
              padding: hovering ? "0px 20px" : "0px 10px",
            }}
          >
            {hovering ? (
              <span className={classes.btnText}>ADD LISTING</span>
            ) : (
              <AddIcon style={{ color: "white" }} />
            )}
          </div>
        </div>
      </div>
      {allAgencyListings?.results?.length > 0 ? (
        <>
          {allAgencyListingsApiInfo?.loading ? (
            <Loader />
          ) : (
            <ListingSlider properties={allAgencyListings?.results} />
          )}
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
              color: "#134696",
              fontSize: 28,
              fontWeight: "bold",
            }}
          >
            No Listing added by agency.
          </p>
        </div>
      )}

      <div className={classes.bottomBorder} />
    </div>
  );
};

export default AgencyListings;
