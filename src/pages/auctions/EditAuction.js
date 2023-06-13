import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Layout from "../../customComponents/layout/Layout";
import Loader from "../../customComponents/Loader";
import CustomTopInfo from "../../customComponents/layout/CustomTopInfo";
import TopCard from "../../components/auction/edit/TopCard";
import MainImage from "../../components/auction/edit/MainImage";
import Information from "../../components/auction/edit/Information";
import { getAuctionByID, setAuctionToEdit } from "../../features/auctionSlice";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.1em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "5px",
    },
    scrollBehavior: "smooth !important",
    height: "95vh",
    margin: 10,
  },
}));

const EditAuction = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();

  const { auctionDetail, allAuctionsApiInfo } = useSelector(
    (state) => state.auctions
  );

  useEffect(() => {
    dispatch(getAuctionByID({ id: params.id }));
    // eslint-disable-next-line
  }, [params]);

  useEffect(() => {
    if (auctionDetail?.result?.id === parseInt(params?.id))
      dispatch(setAuctionToEdit(auctionDetail?.result));
    // eslint-disable-next-line
  }, [auctionDetail?.result]);

  return (
    <Layout>
      <CustomTopInfo heading="Edit Auction" />
      <div className={classes.container}>
        {allAuctionsApiInfo?.loading ? (
          <Loader />
        ) : (
          <>
            <TopCard />
            <MainImage />
            <Information />
          </>
        )}
      </div>
    </Layout>
  );
};

export default EditAuction;
