import React, { useEffect, useState, useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import Loader from "../../customComponents/Loader";
import Layout from "../../customComponents/layout/Layout";
import {
  AUCTION_FILTERS,
} from "../../components/constants/global";
import { Box, Grid, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { baseUrl } from "../../components/constants/baseUrls";
import { debounce } from "lodash";
import CustomTopInfo from "../../customComponents/layout/CustomTopInfo";
import {
  getAllAuctions,
  paginate,
  queryAuctions,
  resetAuctionsApi,
  resetSearchedAuctions,
} from "../../features/auctionSlice";
import AuctionCard from "../../components/auction/AuctionCard";
import AuctionSearchFilter from "../../components/auction/AuctionSearchFilter";
import AuctionTypeFilters from "../../components/auction/AuctionTypeFilters";
import Pagination from "../../components/miscellaneousComponents/Pagination";

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
    maxWidth: "100%",
    margin: "20px 35px",
  },
  "@media (max-width: 1024px)": {
    topSection: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
}));

const Auctions = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const loggedInObject = useSelector((state) => state.auth.currentUser);

  const [selectedFilter, setSelectedFilter] = useState(AUCTION_FILTERS[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    allAuctions,
    allAuctionsApiInfo,
    searchedAuctions,
    searchAuctionsApiInfo,
  } = useSelector((state) => state.auctions);

  const auctionsToShow = useMemo(() => {
    if (searchQuery?.length === 0) {
      return allAuctions;
    } else if (searchQuery?.length >= 3 && searchedAuctions) {
      return searchedAuctions;
    } else {
      return allAuctions;
    }
    // eslint-disable-next-line
  }, [searchedAuctions, allAuctions]);

  useEffect(() => {
    if (!allAuctions) {
      dispatch(
        getAllAuctions({
          authToken: loggedInObject?.token,
          dataURL:
            baseUrl +
            `/users/property-files?dashboard=true&auction_type=${selectedFilter?.value}`,
        })
      );
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (searchQuery?.length === 0) dispatch(resetSearchedAuctions());
    if (searchQuery?.length >= 3) delayedSearch(searchQuery);
    // eslint-disable-next-line
  }, [searchQuery, selectedFilter]);

  const delayedSearch = useMemo(
    () => debounce((query) => searchAuctions(query), 500),
    // eslint-disable-next-line
    [selectedFilter]
  );

  useEffect(() => {
    dispatch(
      getAllAuctions({
        authToken: loggedInObject?.token,
        dataURL:
          baseUrl +
          `/users/property-files?dashboard=true&auction_type=${selectedFilter?.value}`,
      })
    );
  }, [selectedFilter]);

  const searchAuctions = async (query) => {
    dispatch(
      queryAuctions({
        query,
        auction_type: selectedFilter?.value,
      })
    );
  };

  useEffect(() => {
    if (allAuctionsApiInfo?.deleteResponse?.status) {
      toast.success("Auction deleted successfully.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
        hideProgressBar: true,
      });
      dispatch(resetAuctionsApi());
    }
  }, [allAuctionsApiInfo?.deleteResponse]);

  const paginateAuctions = (url) => {
    dispatch(
      paginate({
        url : `${url}&user_type=${loggedInObject?.user_type}`,
        authToken: loggedInObject?.token
      })
    );
  };
  const handlePageSelect = (pageNumber) => {
    let newLink,
      pageSplit = "";
    if (auctionsToShow?.result?.next)
      pageSplit = auctionsToShow?.result?.next?.split("page=");
    else pageSplit = auctionsToShow?.result?.previous?.split("page=");
    if (pageSplit?.length > 2) {
      newLink = `${pageSplit[0]}page=${pageNumber}${pageSplit[1]?.substring(
        pageSplit[1]?.indexOf("&"),
        pageSplit[1]?.length
      )}`;
    } else if (pageSplit[0].includes("?")) {
      newLink = `${pageSplit[0]}page=${pageNumber}`;
    } else {
      newLink = `${pageSplit[0]}?page=${pageNumber}`;
    }
    paginateAuctions(newLink.replace("http", "https"));
  };

  return (
    <Layout>
      <CustomTopInfo heading="Auctions" />
      <div className={classes.container}>
        <div className={classes.topSection}>
          <div style={{ fontSize: 22, fontFamily: "heavy", color: "#134696" }}>
            Explore the Auction Trading
          </div>
          <AuctionTypeFilters
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        </div>
        <Divider style={{ margin: "0 20px" }} />
        <AuctionSearchFilter
          searchQuery={searchQuery || ""}
          setSearchQuery={setSearchQuery}
        />
        <Box
          sx={{
            marginTop: "-30px",
          }}
        >
          {allAuctionsApiInfo?.loading || searchAuctionsApiInfo?.loading ? (
            <Loader />
          ) : (
            <>
              <Grid
                container
                justifyContent="flex-start"
                alignItems="center"
                marginTop="40px"
              >
                {auctionsToShow && auctionsToShow?.result?.count > 0 ? (
                  auctionsToShow?.result?.results?.map((auction, index) => (
                    <Grid item key={index} xs={12} md={4} lg={4} xl={3}>
                      <AuctionCard
                        key={auction.id}
                        auction={auction}
                        verificationID={null}
                      />
                    </Grid>
                  ))
                ) : (
                  <>
                    <div>No Results Found</div>
                  </>
                )}
              </Grid>
            </>
          )}
        </Box>
      </div>
      {auctionsToShow?.result?.results?.length > 0 && (
        <Pagination
          data={auctionsToShow?.result}
          page={handlePageSelect}
          paginate={paginateAuctions}
        />
      )}
    </Layout>
  );
};

export default Auctions;
