import React, { useEffect, useMemo } from "react";
import { useHistory, useLocation } from "react-router";
import { makeStyles } from "@mui/styles";
import { Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CancelIcon from "@mui/icons-material/Cancel";
import { toast } from "react-toastify";
import { getPostFormData } from "../../constants/helperFunctions";
import {
  resetCreatePropertiesApi,
  resetCreateProperties,
  createProperty,
} from "../../../features/createPropertySlice";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flex: 1,
    padding: "10px 20px",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    margin: "10px 20px",
    maxWidth: "95%",
    height: "calc(100vh - 33vh)",
    overflow: "scroll",
  },
  title: {
    fontSize: 35,
    fontFamily: "heavy",
    textTransform: "uppercase",
  },
  btnContainer: {
    display: "flex",
  },
  "@media (max-width: 500px)": {
    title: {
      fontSize: 28,
    },
  },
}));
const TopCard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();
  const location = useLocation();

  let darkMode = false;
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const { propertyData, selectedTab, inValidCategory, createPropertyApiInfo } =
    useSelector((state) => state.createProperty);

  const { adminIdforAgencyAddListing } = useSelector((state) => state.users);

  const inValid = useMemo(() => {
    // // console.log({ inValidCategory });
    let _temp = false;
    for (const property in inValidCategory) {
      if (!inValidCategory[property]?.isValid) {
        _temp = `Some information in ${property} are missing`;
      }
    }
    return _temp;
  }, [inValidCategory]);

  useEffect(() => {
    if (createPropertyApiInfo?.error) {
      // // console.log({ error: createPropertyApiInfo?.error });
      toast.error(createPropertyApiInfo?.error, {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetCreatePropertiesApi());
    }
    // eslint-disable-next-line
  }, [createPropertyApiInfo?.error]);
  useEffect(() => {
    if (createPropertyApiInfo?.response) {
      // // console.log({ response: createPropertyApiInfo?.response });
      toast.success("Listing posted successfully", {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#134696" },
      });
      dispatch(resetCreateProperties());
      if (location?.state?.from === "agency") {
        history.push(`/agency/${location?.state?.agencyID}`);
      } else {
        history.push(`/listings`);
      }
    }
    // eslint-disable-next-line
  }, [createPropertyApiInfo?.response]);

  const postListing = () => {
    // console.log({ adminIdforAgencyAddListing, location });
    if (location?.state?.from === "agency")
      console.log("agency User id: ", adminIdforAgencyAddListing);
    else if (location?.state?.from === "listing")
      console.log("listing User id: ", loggedInObject?.id);
    else
      console.log("else listing User id: ", loggedInObject?.id);
     
    if (inValid) {
      toast.error(inValid, {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
    } else {
      console.log({propertyData});
      dispatch(
        createProperty({
          values: getPostFormData(propertyData, 
            location?.state?.from === "agency" ? adminIdforAgencyAddListing : loggedInObject?.id),
          token: loggedInObject?.token,
        })
      );
    }
  };

  return (
    <div
      className={classes.container}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      <span
        className={classes.title}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        {selectedTab}
      </span>
      <Grid
        container
        sx={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
        spacing={2}
      >
        <Grid item xs={6} md={4} sm={6} lg={3}>
          {selectedTab === "Preview" && (
            <Button
              fullWidth
              sx={{
                backgroundColor: darkMode ? "#0ed864" : "#134696",
                color: "#fff",
                fontFamily: "heavy",
                borderRadius: 25,
                fontSize: 13,
                mr: 1,
                "&:hover": {
                  backgroundColor: darkMode ? "#0ed864" : "#134696",
                },
              }}
              onClick={postListing}
            >
              Save
            </Button>
          )}
        </Grid>
        <Grid item xs={6} md={4} sm={6} lg={3}>
          <Button
            fullWidth
            sx={{
              backgroundColor: "#fff",
              color: "#134696",
              fontFamily: "heavy",
              borderRadius: 25,
              fontSize: 15,
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              "&:hover": {
                backgroundColor: "#fff",
              },
            }}
            endIcon={
              <CancelIcon style={{ color: darkMode ? "#0ed864" : "#134696" }} />
            }
            onClick={() => {
              dispatch(resetCreateProperties());
              history.push("/listings");
            }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default TopCard;
