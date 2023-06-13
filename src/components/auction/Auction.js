import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../../customComponents/layout/Layout";
import Loader from "../../customComponents/Loader";
import { getAllAuctions } from "../../features/auctionSlice";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddIcon from "@mui/icons-material/Add";
import { Container, Button, Grid, Badge } from "@mui/material";
import { baseUrl } from "../constants/baseUrls";
import { makeStyles } from "@mui/styles";
import AuctionCard from "./AuctionCard";

const useStyles = makeStyles(() => ({
  noResults: {
    color: "#014493",
    fontFamily: "Poopins-Bold",
    fontSize: 30,
    textAlign: "center",
    width: "100%",
    height: "50vh",
  },
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

const Auction = () => {
  let loggedInObject = JSON.parse(localStorage.getItem("logged_in"));
  let token = loggedInObject?.token;

  const classes = useStyles();
  const dispatch = useDispatch();

  const auctionState = useSelector((state) => state.auctions);
  const { allAuctions, isLoading } = auctionState;

  useEffect(() => {
    if (!allAuctions || !allAuctions?.length)
      dispatch(
        getAllAuctions({
          authToken: token,
          agentId: loggedInObject.id,
          dataURL: baseUrl + `/users/property-files?dashboard=true`,
        })
      );
  }, [dispatch]);

  useEffect(() => {
    // console.log({ allAuctions });
  }, [allAuctions]);

  const handlePrevClick = () => {
    dispatch(
      getAllAuctions({
        authToken: token,
        dataURL: allAuctions?.previous.replace("http://", "https://"),
      })
    );
  };

  const handleNextClick = () => {
    dispatch(
      getAllAuctions({
        authToken: token,
        dataURL: allAuctions?.next.replace("http://", "https://"),
      })
    );
  };

  return (
    <Layout>
      <div>
        <Link to="/add-auction">
          <button className={classes.btn}>
            Add Auction <AddIcon fontSize="sm" />
          </button>
        </Link>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Container sx={{ py: 10 }} maxWidth="md">
              <Grid container spacing={4}>
                {allAuctions ? (
                  allAuctions?.results?.map((item) => (
                    <Grid item key={item.id} xs={12} sm={6} md={4}>
                      <Badge badgeContent={item?.is_sold ? "Sold" : "Active"} color={item?.is_sold ? "error" : "primary"}>
                        <AuctionCard key={item.id} item={item} />
                      </Badge>
                    </Grid>
                  ))
                ) : (
                  <div className={classes.noResults}>No Results Found</div>
                )}
              </Grid>
            </Container>
            {allAuctions?.results && (
              <div className="pagination justify-content-center mt-4 mb-4">
                <Button
                  variant="contained"
                  startIcon={<ArrowBackIosNewIcon />}
                  onClick={handlePrevClick}
                  disabled={allAuctions?.previous !== null ? false : true}
                >
                  {" "}
                  Previous{" "}
                </Button>
                <div
                  style={{
                    width: "5px",
                    height: "auto",
                    display: "inline-block",
                  }}
                ></div>
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIosIcon />}
                  onClick={handleNextClick}
                  disabled={allAuctions?.next !== null ? false : true}
                >
                  {" "}
                  Next{" "}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Auction;
