import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { baseUrl } from "../../components/constants/baseUrls";
import Loader from "../../customComponents/Loader";
import {
  getAuctionByID,
  resetAuctionsApi,
  setAuctionDetail,
  setAuctionVerificationDetail,
} from "../../features/auctionSlice";
import CustomTopInfo from "../../customComponents/layout/CustomTopInfo";
import Layout from "../../customComponents/layout/Layout";
import TopInfo from "../../components/auction/view/TopInfo";
import BidTable from "../../components/auction/view/BidTable";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 5,
  },
  thumbnail: {
    backgroundPosition: "center !important",
    backgroundRepeat: "no-repeat !important",
    backgroundSize: "cover !important",
    width: "79.9%",
    height: 465,
    position: "absolute",
    top: 0,
    zIndex: -1,
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));

const AuctionDetail = () => {
  const params = useParams();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    auctionDetail,
    auctionDetailApiInfo,
    allAuctionsApiInfo,
    verificationDetail,
  } = useSelector((state) => state.auctions);
  const { updateRequestApiInfo } = useSelector((state) => state.verifications);

  console.log({ auctionDetail, verificationDetail });

  useEffect(() => {
    if (updateRequestApiInfo?.response) {
      dispatch(
        setAuctionVerificationDetail({ isDirect: true, verificationID: null })
      );
      history.push(`/auction/${auctionDetail?.id}`);
    }
  }, [updateRequestApiInfo?.response]);

  useEffect(() => {
    dispatch(getAuctionByID({ id: params?.id }));
    // eslint-disable-next-line
  }, [params?.id]);

  useEffect(() => {
    if (allAuctionsApiInfo?.deleteResponse?.status) {
      toast.success("Auction deleted successfully.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
        hideProgressBar: true,
      });
      dispatch(resetAuctionsApi());
      dispatch(setAuctionDetail(null));
      history.push("/auctions");
    }
  }, [allAuctionsApiInfo?.deleteResponse]);

  return (
    <Layout>
      <CustomTopInfo
        backButton={true}
        type="auction"
        itemDetail={auctionDetail?.result}
        style={{ borderBottom: "none", backgroundColor: "transparent" }}
      />
      {auctionDetailApiInfo?.loading ? (
        <Loader />
      ) : (
        <div className={classes.container}>
          <div
            className={classes.thumbnail}
            style={{
              background: `url(${baseUrl}/${auctionDetail?.result?.photos[0]?.file_photo})`,
            }}
          ></div>
          <div style={{ marginTop: 370 }}>
            <TopInfo />
            <BidTable />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AuctionDetail;
