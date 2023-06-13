import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import leftLines from "../../../assets/auctions/auctionLeft.png";
import rightLines from "../../../assets/auctions/auctionRight.png";

const useStyles = makeStyles(() => ({
  innerContainer: {
    lineHeight: 1.5,
  },
  label: {
    color: "#134696",
    fontFamily: "medium",
    fontSize: 20,
  },
  value: {
    color: "#134696",
    fontFamily: "heavy",
    fontSize: 24,
    textTransform: "uppercase",
  },
  location: {
    fontSize: 20,
    fontFamily: "medium",
    color: "#7b7b7b",
  },
  description: {
    fontSize: 14,
    fontFamily: "light",
    color: "#134696",
    margin: "20px 0",
  },
  auctionEndContainer: {
    height: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTop: "1px solid #0ed864",
  },
  auctionEndText: {
    fontFamily: "heavy",
    fontSize: 30,
    color: "#134696",
  },
}));

const TopInfo = () => {
  const classes = useStyles();

  const { auctionDetail } = useSelector((state) => state.auctions);

  return (
    <>
      <Grid
        container
        justifyContent={"center"}
        sx={{ maxWidth: "90%", margin: "auto", my: 1 }}
      >
        <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
          <div className={classes.innerContainer}>
            <div className={classes.label}>Listed By:</div>
            <div className={classes.value}>
              {auctionDetail?.result?.user_fk?.full_name}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={3.5} md={3.5} lg={3.5} xl={3.5}>
          <div className={classes.innerContainer}>
            <div className={classes.label}>Area Size:</div>
            <div className={classes.value}>
              {" "}
              {parseInt(auctionDetail?.result?.size)}{" "}
              {auctionDetail?.result?.unit === "Square Feet"
                ? "Sq Ft"
                : auctionDetail?.result?.unit}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={3.5} md={3.5} lg={3.5} xl={3.5}>
          <div className={classes.innerContainer}>
            <div className={classes.label}>Amount:</div>
            <div className={classes.value}>
              {auctionDetail?.result?.currency}{" "}
              {parseInt(auctionDetail?.result?.price)}
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent={"center"}
        sx={{ maxWidth: "90%", margin: "auto", my: 1 }}
      >
        <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
          <div className={classes.innerContainer}>
            <div className={classes.label}>Latest Bid:</div>
            {auctionDetail?.result?.bids[0]?.price ? (
              <div className={classes.value}>
                {auctionDetail?.result?.currency}
                {auctionDetail?.result?.bids[0]?.price}
              </div>
            ) : (
              <div className={classes.value}>NA</div>
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={3.5} md={3.5} lg={3.5} xl={3.5}>
          <div className={classes.innerContainer}>
            <div className={classes.label}>Total Bids:</div>
            <div className={classes.value}>
              {auctionDetail?.result?.bids.length}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={3.5} md={3.5} lg={3.5} xl={3.5}>
          <div className={classes.innerContainer}>
            <div className={classes.label}>Current Highest Bid:</div>
            {auctionDetail?.result?.highest_bid?.price ? (
              <div className={classes.value}>
                {auctionDetail?.result?.currency}{" "}
                {parseInt(auctionDetail?.result?.highest_bid?.price)}
              </div>
            ) : (
              <div className={classes.value}>NA</div>
            )}
          </div>
        </Grid>
      </Grid>
      {auctionDetail?.result?.auction_type === "bulk" && (
        <Grid
          container
          justifyContent={"flex-start"}
          sx={{ maxWidth: "90%", margin: "auto", my: 1 }}
        >
          <Grid item xs={12} sm={3.5} md={3.5} lg={3.5} xl={3.5}>
            <div className={classes.innerContainer}>
              <div className={classes.label}>No Of Files:</div>
              {auctionDetail?.result?.total_files ? (
                <div className={classes.value}>
                  {auctionDetail?.result?.total_files} Files
                </div>
              ) : (
                <div className={classes.value}>NA</div>
              )}
            </div>
          </Grid>
        </Grid>
      )}
      <Grid container sx={{ maxWidth: "90%", margin: "auto", my: 1 }}>
        <Grid item md={12} lg={12}>
          <div className={classes.label}>Description:</div>
          <div className={classes.description}>
            {auctionDetail?.result?.description}
          </div>
        </Grid>
      </Grid>

      <div className={classes.auctionEndContainer}>
        <img
          alt=""
          src={leftLines}
          style={{ position: "absolute", left: "20vw", maxWidth: "25%" }}
        />
        <div className={classes.auctionEndText}>
          <span style={{ color: "#0ed864" }}>AUCTION ENDS: </span>
          {auctionDetail?.result?.end_date}
        </div>
        <img
          alt=""
          src={rightLines}
          style={{ position: "absolute", right: 0, maxWidth: "25%" }}
        />
      </div>
    </>
  );
};

export default TopInfo;
