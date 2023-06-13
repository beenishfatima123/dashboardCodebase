import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { makeStyles } from "@mui/styles";
import { Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  setListingToEdit,
  resetUpdate,
  updateListing,
  setListingUpdateInfo,
} from "../../../features/listingsSlice";
import { toast } from "react-toastify";
import { getPostUpdateFormData } from "../../constants/helperFunctions";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    margin: "10px 3px",
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

const TopCard = ({ validation }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();

  let darkMode = false;
  const { listingUpdateInfo, listingToEdit, updateApiInfo } = useSelector(
    (state) => state.listings
  );
  const loggedInObject = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    if (updateApiInfo?.error) {
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetUpdate());
    }
    // eslint-disable-next-line
  }, [updateApiInfo?.error]);
  useEffect(() => {
    if (updateApiInfo?.success) {
      toast.success("Listing updated successfully", {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetUpdate());
      dispatch(setListingUpdateInfo(null));
      dispatch(setListingToEdit(null));
      history.push(`/listing/${listingToEdit?.id}`)
    }
    // eslint-disable-next-line
  }, [updateApiInfo?.success]);

  const handleUpdate = () => {
    if (listingUpdateInfo) {
      const invalid = checkValidation();
      if (invalid) {
        toast.error(invalid, {
          position: toast.POSITION.TOP_CENTER,
          progressStyle: { backgroundColor: "#014493" },
        });
      } else {
        dispatch(
          updateListing({
            id: listingToEdit?.id,
            authToken: loggedInObject?.token,
            formData: getPostUpdateFormData(listingUpdateInfo),
          })
        );
      }
    } else
      toast.info("No changes made", {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
  };

  const checkValidation = () => {
    let invalid = false;
    Object.keys(validation).forEach((element) => {
      if (validation?.[element]) invalid = validation?.[element];
    });
    return invalid;
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
        Edit property
      </span>
      <Grid
        container
        sx={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
        spacing={2}
      >
        <Grid item xs={6} md={4} sm={6} lg={3}>
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
            onClick={handleUpdate}
          >
            Save Changes
          </Button>
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
            onClick={() => {
              dispatch(setListingToEdit(null));
              history.goBack();
            }}
            endIcon={
              <CancelIcon style={{ color: darkMode ? "#0ed864" : "#134696" }} />
            }
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default TopCard;
