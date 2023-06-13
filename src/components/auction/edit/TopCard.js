import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import { Button, Grid } from "@mui/material";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import CancelIcon from "@mui/icons-material/Cancel";
import { setAuctionToEdit, setAuctionUpdateInfo, updateAuction, resetUpdateAuctionApiInfo } from "../../../features/auctionSlice";
import { getAuctionUpdateFormData } from "../../constants/helperFunctions";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
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

const TopCard = () => {
  const classes = useStyles();
  const containerRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();

  const darkMode = false;
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const { auctionToEdit, auctionUpdateInfo, updateAuctionApiInfo } =
    useSelector((state) => state.auctions);

  const [containerWidth, setContainerWidth] = useState();

  useEffect(() => {
    if (containerRef)
      setContainerWidth(containerRef?.current?.parentElement?.offsetWidth);
  }, [containerRef]);

  const isFormValid = (data) => {
    if (
      data?.priceValidation ||
      data?.sizeValidation ||
      data?.sub_unit_share_percentageValidation ||
      data?.totalBiddersValidation ||
      data?.total_filesValidation
    ) {
      return false;
    }
    return true;
  };

  const handleUpdate = () => {
    let inValid = isFormValid(auctionUpdateInfo);
    if (!inValid) {
      toast.error(
        "Invalid form. Please fill information correctly and submit again.",
        {
          position: toast.POSITION.TOP_CENTER,
          progressStyle: { backgroundColor: "#014493" },
        }
      );
    } else {
      dispatch(
        updateAuction({
          id: auctionToEdit?.id,
          authToken: loggedInObject?.token,
          formData: getAuctionUpdateFormData(auctionUpdateInfo),
        })
      );
    }
  };

  const resetStoreData = () => {
    dispatch(resetUpdateAuctionApiInfo());
    dispatch(setAuctionUpdateInfo(null));
    dispatch(setAuctionToEdit(null));
  };

  useEffect(() => {
    if (updateAuctionApiInfo?.response?.status) {
      toast.success("Auction updated successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      resetStoreData();
      history.push(`/auctions/`);
    } else if (updateAuctionApiInfo?.response?.status === false) {
      toast.error(updateAuctionApiInfo?.response?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      resetStoreData();
      history.push(`/auctions/`);
    }
    // eslint-disable-next-line
  }, [updateAuctionApiInfo?.response]);

  useEffect(() => {
    if (updateAuctionApiInfo?.error) {
      toast.error("Something went wrong", {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      resetStoreData();
      history.push(`/auctions/`);
    }
    // eslint-disable-next-line
  }, [updateAuctionApiInfo?.error]);

  return (
    <div
      className={classes.container}
      ref={containerRef}
      style={{
        flexDirection: containerWidth > 650 ? "row" : "column",
        alignItems: containerWidth > 650 ? "center" : "flex-start",
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      <Grid
        container
        sx={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
        spacing={2}
      >
        <Grid item xs={6} md={4} sm={6} lg={2}>
          <Button
            fullWidth
            sx={{
              backgroundColor: darkMode ? "#0ed864" : "#134696",
              color: "#fff",
              fontFamily: "heavy",
              borderRadius: 25,
              fontSize: containerWidth > 500 ? 15 : 10,
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
        <Grid item xs={6} md={4} sm={6} lg={2}>
          <Button
            fullWidth
            sx={{
              backgroundColor: "#fff",
              color: "#134696",
              fontFamily: "heavy",
              borderRadius: 25,
              fontSize: containerWidth > 500 ? 15 : 10,
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              "&:hover": {
                backgroundColor: "#fff",
              },
            }}
            onClick={() => {
              resetStoreData()
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
