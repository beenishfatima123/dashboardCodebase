import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Loader from "../../customComponents/Loader";
import Layout from "../../customComponents/layout/Layout";
import { USER_TYPES_FILTERS } from "../../components/constants/global";
import UserTypeFilters from "../../components/users/UserTypeFilters";
import DataTable from "../../components/users/DataTable";
import { fetchAgents } from "../../features/agentSlice";
import {

  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../components/constants/baseUrls";
import UserSearchFilter from "../../components/users/UserSearchFilter";
import CustomTopInfo from "../../customComponents/layout/CustomTopInfo";

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

const Users = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const loggedInObject = useSelector((state) => state.auth.currentUser);

  const [featureFilter, setFeatureFilter] = useState(USER_TYPES_FILTERS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const { data } = useSelector((state) => state.agent);

  useEffect(() => {
    if (data?.data?.result?.count) {
      setShowData(data?.data?.result?.results);
    }
  }, [data]);

  const loadInitialData = async () => {
    dispatch(
      fetchAgents({
        authToken: loggedInObject?.token,
        dataURL: baseUrl + `/users/user`,
      })
    );
  };

  useEffect(() => {
    loadInitialData();
  }, [dispatch]);

  return (
    <Layout>
      <CustomTopInfo heading="Users" />
      {false ? (
        <Loader />
      ) : (
        <>
          <div className={classes.container}>
            <div className={classes.topSection}>
              <div
                style={{ fontSize: 22, fontFamily: "heavy", color: "#134696" }}
              >
                All Users
              </div>
              <UserTypeFilters
                from={"users"}
                selectedFilter={featureFilter}
                setSelectedFilter={setFeatureFilter}
              />
            </div>
            <Divider style={{ margin: "0 20px" }} />
            <div className={classes.topSection}>
              <UserSearchFilter
                searchQuery={searchQuery?.searchText || ""}
                setSearchQuery={(val) =>
                  setSearchQuery((prev) => ({ ...prev, searchText: val }))
                }
                location={searchQuery}
                setLocation={setSearchQuery}
              />
            </div>
            <Divider style={{ margin: "0 20px" }} />
            <React.Fragment>
              <DataTable type={featureFilter} searchQuery={searchQuery} />
            </React.Fragment>

          </div>
        </>
      )}
    </Layout>
  );
};

export default Users;
