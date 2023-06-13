import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAuctionByID } from "../../features/auctionSlice";
import Layout from "../../customComponents/layout/Layout";
import Loader from "../../customComponents/Loader";
import { makeStyles } from "@mui/styles";
import { Grid, ImageList, ImageListItem, Typography } from "@mui/material";
import { Container } from "react-bootstrap";
import { baseUrl } from "../constants/baseUrls";
import { formatCurrency } from "../constants/helperFunctions";
import AuctionBids from "./AuctionBids";

const useStyles = makeStyles(() => ({
  btn: {
    backgroundColor: "#fff",
    color: "#014493",
    border: "5px solid #014493",
    height: 55,
    width: 55,
    borderRadius: "50%",
    fontFamily: "Poopins-Regular",
    fontSize: 11,
    fontWeight: "bolder",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    marginTop: "0",
    top: 70,
    right: 20,
    position: "fixed",
  },
}));

const AuctionDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const loggedInObject = useSelector((state) => state.auth.currentUser);

  const auctionState = useSelector((state) => state.auctions);
  const { auctionDetail, auctionBids, isLoading } = auctionState;
  console.log({ auctionDetail })

  useEffect(() => {
    dispatch(getAuctionByID({ id: params.id, authToken: loggedInObject?.token }));
  }, [params]);


  return (
    <Layout>
      <div>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h1
              style={{
                textAlign: "center",
                paddingTop: "14px",
                fontWeight: 400,
              }}
            >
              Auction Detail
            </h1>
            <div
              className="container"
              style={{
                padding: "2rem",
                borderRadius: 10,
                marginTop: "1rem",
              }}
            >
              <Grid
                container
                spacing={3}
                style={{
                  backgroundColor: "#eceff6",
                  borderRadius: 10,
                }}
              >
                <Grid item xs={12} sm={8}>
                  <Grid container sx={{ my: 1 }}>
                    <Grid item xs={4}>
                      <b>Unit: </b>
                    </Grid>
                    <Grid item xs={8}>
                      {auctionDetail?.unit}
                    </Grid>
                  </Grid>
                  <Grid container sx={{ my: 1 }}>
                    <Grid item xs={4}>
                      <b>Size: </b>
                    </Grid>
                    <Grid item xs={8}>
                      {auctionDetail?.size}
                    </Grid>
                  </Grid>
                  <Grid container sx={{ my: 1 }}>
                    <Grid item xs={4}>
                      <b>Price: </b>
                    </Grid>
                    <Grid item xs={8}>
                      {auctionDetail?.currency} {formatCurrency(auctionDetail?.price)}
                    </Grid>
                  </Grid>
                  <Grid container sx={{ my: 1 }}>
                    <Grid item xs={4}>
                      <b>Type: </b>
                    </Grid>
                    <Grid item xs={8}>
                      {auctionDetail?.auction_type}
                    </Grid>
                  </Grid>
                  {auctionDetail?.auction_type !== "sub_unit" ? (
                    <><Grid container sx={{ my: 1 }}>
                      <Grid item xs={4}>
                        <b>Total File(s): </b>
                      </Grid>
                      <Grid item xs={8}>
                        {auctionDetail?.total_files}
                      </Grid>
                    </Grid>
                      <Grid container sx={{ my: 1 }}>
                        <Grid item xs={4}>
                          <b>Sold File(s): </b>
                        </Grid>
                        <Grid item xs={8}>
                          {auctionDetail?.sold_files}
                        </Grid>
                      </Grid></>) : ""}
                  {auctionDetail?.auction_type === "sub_unit" ? (
                    <>
                      <Grid container sx={{ my: 1 }}>
                        <Grid item xs={4}>
                          <b>Sub-unit share percentage:</b>
                        </Grid>
                        <Grid item xs={8}>
                          {auctionDetail?.sub_unit_share_percentage}
                        </Grid>
                      </Grid>
                      <Grid container sx={{ my: 1 }}>
                        <Grid item xs={4}>
                          <b>Sub-unit price value:</b>
                        </Grid>
                        <Grid item xs={8}>
                          {auctionDetail?.sub_unit_value}
                        </Grid>
                      </Grid>
                    </>
                  ) : (
                    ""
                  )}
                  <Grid container sx={{ my: 1 }}>
                    <Grid item xs={4}>
                      <b>Start Date:</b>
                    </Grid>
                    <Grid item xs={8}>
                      {auctionDetail?.start_date}
                    </Grid>
                  </Grid>
                  <Grid container sx={{ my: 1 }}>
                    <Grid item xs={4}>
                      <b>End Date:</b>
                    </Grid>
                    <Grid item xs={8}>
                      {auctionDetail?.end_date}
                    </Grid>
                  </Grid>
                  <Grid container sx={{ my: 1 }}>
                    <Grid item xs={4}>
                      <b>Area: </b>
                    </Grid>
                    <Grid item xs={8}>
                      {auctionDetail?.area}
                    </Grid>
                  </Grid>
                  <Grid container sx={{ my: 1 }}>
                    <Grid item xs={4}>
                      <b>City: </b>
                    </Grid>
                    <Grid item xs={8}>
                      {auctionDetail?.city}
                    </Grid>
                  </Grid>
                  <Grid container sx={{ my: 1 }}>
                    <Grid item xs={4}>
                      <b>Country: </b>
                    </Grid>
                    <Grid item xs={8}>
                      {auctionDetail?.country}
                    </Grid>
                  </Grid>
                  <Grid container sx={{ my: 1 }}>
                    <Grid item xs={4}>
                      <b>Status: </b>
                    </Grid>
                    <Grid item>
                      <Typography sx={{ backgroundColor: auctionDetail?.is_sold ? "red" : "green", color: "white", borderRadius: "5px" }}>
                        {auctionDetail?.is_sold ? "Sold" : "Active"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {
                auctionDetail?.photos?.length > 0 ? (
                  <Container>
                    <div style={{ marginTop: 20 }}>
                      <ImageList
                        sx={{ width: "fit-content", height: 150 }}
                        cols={5}
                        rowHeight={150}
                      >
                        {auctionDetail?.photos?.map((item, index) => (
                          <ImageListItem key={index}>
                            <img
                              src={`${baseUrl}/${item.file_photo}`}
                              alt="Auction images"
                              loading="lazy"
                            />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    </div>
                  </Container>
                ) : null
              }
              {
                auctionDetail?.bids?.length > 0 ? <AuctionBids /> : null
              }
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default AuctionDetail;
