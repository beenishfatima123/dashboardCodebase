import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import { Divider, Grid } from "@mui/material";
import { debounce } from "lodash";
import {
  VERIFICATION_FILTERS,
} from "../../components/constants/global";
import Loader from "../../customComponents/Loader";
import Layout from "../../customComponents/layout/Layout";
import CustomTopInfo from "../../customComponents/layout/CustomTopInfo";
import TypeFilters from "./TypeFilters";
import SearchFilter from "./SearchFilter";
import DataTable from "./DataTable";
import { baseUrl } from "../../components/constants/baseUrls";
import Pagination from "../../components/miscellaneousComponents/Pagination";
import { buildVerificationSearchQuery } from "../../components/constants/helperFunctions";
import {
  resetUpdateVerificationApi,
  getAllUnverifiedByType,
  paginate,
  queryVerifications,
} from "../../features/verificationSlice";
import PropertyCard from "../../components/listing/PropertyCard";
import AuctionCard from "../../components/auction/AuctionCard";

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
  notFoundSection: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "35px",
  },
  notFoundText: {
    color: "#134696",
    fontSize: 28,
    fontWeight: "bold",
  },
  addBtn: {
    borderRadius: 35,
    backgroundColor: "#134696",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "0.5s",
    zIndex: 1200,
  },
  btnText: {
    fontSize: 15,
    color: "white",
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  "@media (max-width: 1024px)": {
    topSection: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
}));

const userColumns = [
  { id: "photos", label: "Photo", minWidth: 40 },
  { id: "full_name", label: "Name", minWidth: 100, align: "left" },
  {
    id: "user_type",
    label: "Type",
    minWidth: 100,
    align: "left",
  },
  {
    id: "address",
    label: "Location",
    minWidth: 80,
    align: "center",
  },
  {
    id: "cnic",
    label: "CNIC",
    minWidth: 80,
    align: "center",
  },
  {
    id: "id",
    minWidth: 50,
    align: "center",
    format: (value) => value.toFixed(2),
  },
];
const agencyColumns = [
  { id: "company_logo", label: "", minWidth: 40 },
  { id: "company_name", label: "Name", minWidth: 100, align: "left" },
  {
    id: "company_address",
    label: "Location",
    minWidth: 100,
    align: "left",
  },
  {
    id: "no_of_employees",
    label: "Employees",
    minWidth: 80,
    align: "left",
  },
  {
    id: "total_listings",
    label: "Listings",
    minWidth: 80,
    align: "left",
  },
  {
    id: "id",
    minWidth: 50,
    align: "center",
  },
];

const Verification = () => {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();
  const [featureFilter, setFeatureFilter] = useState(VERIFICATION_FILTERS[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const {
    allRequests,
    allRequestsApiInfo,
    updateRequestApiInfo,
    searchedRequests,
    searchRequestsApiInfo,
  } = useSelector((state) => state.verifications);

  const delayedRequestSearch = useMemo(
    () => debounce((query) => searchRequests(query), 500),
    // eslint-disable-next-line
    []
  );

  const dataToShow = useMemo(() => {
    if (searchQuery?.searchText?.length >= 3 && searchedRequests) {
      return searchedRequests;
    } else if (searchQuery?.city?.length >=3 && searchedRequests) {
      return searchedRequests;
    } else if (searchQuery?.area?.length >= 3 && searchedRequests) {
      return searchedRequests;
    } else {
      return allRequests;
    }
    // eslint-disable-next-line
  }, [searchedRequests, allRequests, searchQuery]);

  useEffect(() => {
    if (
      searchQuery?.searchText?.length >= 3 ||
      searchQuery?.city?.length >= 3 ||
      searchQuery?.area?.length >= 3
    )
      delayedRequestSearch(
        buildVerificationSearchQuery(
          params?.type === "user" ? "uac" : params.type,
          searchQuery
        )
      );
    // eslint-disable-next-line
  }, [searchQuery]);

  const searchRequests = async (query) => {
    dispatch(
      queryVerifications({
        query: query,
        token: loggedInObject?.token,
      })
    );
  };

  const paginateVerifications = (url) => {
    dispatch(
      paginate({
        url,
      })
    );
  };

  const handlePageSelect = (pageNumber) => {
    let newLink,
      pageSplit = "";
    if (dataToShow?.result?.next)
      pageSplit = dataToShow?.result?.next?.split("page=");
    else pageSplit = dataToShow?.result?.previous?.split("page=");
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
    paginateVerifications(newLink.replace("http", "https"));
  };

  useEffect(() => {
    if (!allRequests)
      dispatch(
        getAllUnverifiedByType({
          dataURL:
            baseUrl +
            `/users/verification/?type=${
              params?.type === "user" ? "uac" : params?.type
            }&status=${featureFilter?.value}`,
        })
      );
  }, [featureFilter, params?.type]);

  useEffect(() => {
    if (updateRequestApiInfo?.response?.status) {
      let message = `${params?.type} request ${updateRequestApiInfo?.response?.result?.status} successfully.`;
      toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#134696" },
      });
      dispatch(resetUpdateVerificationApi());
    }
    // eslint-disable-next-line
  }, [updateRequestApiInfo?.response]);

  return (
    <Layout>
      <CustomTopInfo heading={params?.type === "property_file" ? "Auction Requests" : `${params?.type} Requests`} />
      <div className={classes.container}>
        <div className={classes.topSection}>
          <div
            style={{
              fontSize: 22,
              fontFamily: "heavy",
              color: "#134696",
              textTransform: "capitalize",
            }}
          >
            All {params?.type === "property_file" ? "Auctions" : params?.type}
          </div>
          <TypeFilters
            selectedFilter={featureFilter}
            setSelectedFilter={setFeatureFilter}
          />
        </div>
        <Divider style={{ margin: "0 20px" }} />
        {(params?.type === "user" || params?.type === "agency") && (
          <div className={classes.topSection}>
            <SearchFilter
              type={params?.type}
              searchQuery={searchQuery?.searchText || ""}
              setSearchQuery={(val) =>
                setSearchQuery((prev) => ({ ...prev, searchText: val }))
              }
              location={searchQuery}
              setLocation={setSearchQuery}
            />
          </div>
        )}
        <Divider style={{ margin: "0 20px" }} />
        {
          allRequestsApiInfo?.loading || searchRequestsApiInfo?.loading || !dataToShow ? (
            <Loader />
          ) : params?.type === "user" || params?.type === "agency" ? (
            <>
              <React.Fragment>
                <DataTable
                  type={params?.type}
                  columns={
                    params?.type === "user" ? userColumns : agencyColumns
                  }
                  dataToShow={dataToShow}
                />
              </React.Fragment>
            </>
          ) : params?.type === "property" ? (
            <>
              <Grid
                container
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
                sx={{
                  margin: 1,
                }}
              >
                {dataToShow?.result?.count > 0 ? (
                  dataToShow?.result?.results?.map((elem, index) => {
                    return (
                      <Grid item key={index} xs={12} md={6} lg={4} xl={4}>
                        <PropertyCard
                          key={index}
                          verificationID={elem?.id}
                          property={elem?.property}
                        />
                      </Grid>
                    );
                  })
                ) : (
                  <div className={classes.notFoundSection}>
                    <p className={classes.notFoundText}>No Result Found</p>
                  </div>
                )}
              </Grid>
            </>
          ) : (
            <>
              <Grid
                container
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
              >
                {dataToShow?.result?.count > 0 ? (
                  dataToShow?.result?.results?.map((elem, index) => {
                    return (
                      <Grid item key={index} xs={12} md={6} lg={4} xl={4}>
                        <AuctionCard
                          key={index}
                          verificationID={elem?.id}
                          auction={elem?.property_file}
                        />
                      </Grid>
                    );
                  })
                ) : (
                  <div className={classes.notFoundSection}>
                    <p className={classes.notFoundText}>No Result Found</p>
                  </div>
                )}
              </Grid>
            </>
          )
        }
      </div>
      {dataToShow?.result?.results?.length > 0 && (
        <Pagination
          data={dataToShow?.result}
          page={handlePageSelect}
          paginate={paginateVerifications}
        />
      )}
    </Layout>
  );
};

export default Verification;
