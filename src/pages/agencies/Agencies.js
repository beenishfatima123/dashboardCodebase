import React, { useEffect, useState, useMemo } from "react";
import { makeStyles } from "@mui/styles";
import Loader from "../../customComponents/Loader";
import Layout from "../../customComponents/layout/Layout";
import { USER_TYPES } from "../../components/constants/global";
import DataTable from "../../components/agency/DataTable";
import {
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { baseUrl } from "../../components/constants/baseUrls";
import AddIcon from "@mui/icons-material/Add";
import AgencySearchFilter from "../../components/agency/AgencySearchFilter";
import {
  fetchAgencies,
  paginate,
  queryAgencies,
  resetAllAgencyProjects,
} from "../../features/agencySlice";
import { debounce } from "lodash";
import { buildAgencySearchQuery } from "../../components/constants/helperFunctions";
import Pagination from "../../components/miscellaneousComponents/Pagination";
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

const Agencies = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const loggedInObject = useSelector((state) => state.auth.currentUser);

  const [searchQuery, setSearchQuery] = useState("");
  const [hovering, setHovering] = useState(false);

  const { allAgencies, searchedAgencies } = useSelector(
    (state) => state.agency
  );


  const delayedAgencySearch = useMemo(
    () => debounce((query) => searchAgencies(query), 500),
    // eslint-disable-next-line
    []
  );

  const agenciesToShow = useMemo(() => {
    dispatch(resetAllAgencyProjects());
    if (searchQuery?.searchText?.length >= 3 && searchedAgencies) {
      return searchedAgencies;
    } else if (searchQuery?.area && searchedAgencies) {
      return searchedAgencies;
    } else {
      return allAgencies;
    }
    // eslint-disable-next-line
  }, [searchedAgencies, allAgencies, searchQuery]);

  useEffect(() => {
    if (searchQuery?.searchText?.length >= 3 || searchQuery?.area?.length >= 3)
      delayedAgencySearch(buildAgencySearchQuery(searchQuery));
    // eslint-disable-next-line
  }, [searchQuery]);

  const searchAgencies = async (query) => {
    dispatch(
      queryAgencies({
        query,
      })
    );
  };

  useEffect(() => {
    {
      if (loggedInObject?.user_type === USER_TYPES.ADMIN) {
        dispatch(
          fetchAgencies({
            dataURL: baseUrl + `/users/company/`,
          })
        );
      } else {
        dispatch(
          fetchAgencies({
            dataURL: baseUrl + `/users/company?agent_id=${loggedInObject?.id}`,
          })
        );
      }
    }
    // eslint-disable-next-line
  }, []);

  const paginateAgencies = (url) => {
    dispatch(
      paginate({
        url,
      })
    );
  };
  const handlePageSelect = (pageNumber) => {
    let newLink,
      pageSplit = "";
    if (agenciesToShow?.result?.next)
      pageSplit = agenciesToShow?.result?.next?.split("page=");
    else pageSplit = agenciesToShow?.result?.previous?.split("page=");
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
    paginateAgencies(newLink.replace("http", "https"));
  };

  return (
    <Layout>
      <CustomTopInfo heading="Agencies" />
      {false ? (
        <Loader />
      ) : (
        <>
          <div className={classes.container}>
            <div className={classes.topSection}>
              <div
                style={{ fontSize: 22, fontFamily: "heavy", color: "#134696" }}
              >
                Be a part of an agency
              </div>
              <div
                className={classes.addBtn}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                style={{
                  padding: hovering ? "10px 40px" : 10,
                }}
                onClick={() => history.push("/add-agency")}
              >
                {hovering ? (
                  <span className={classes.btnText}>ADD Agency</span>
                ) : (
                  <AddIcon style={{ color: "white" }} />
                )}
              </div>
            </div>
            <Divider style={{ margin: "0 20px" }} />
            <div className={classes.topSection}>
              <AgencySearchFilter
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
              <DataTable agenciesToShow={agenciesToShow} />
            </React.Fragment>
          </div>
          {allAgencies?.result?.results?.length > 0 && (
            <Pagination
              data={allAgencies?.result}
              page={handlePageSelect}
              paginate={paginateAgencies}
            />
          )}
        </>
      )}
    </Layout>
  );
};

export default Agencies;
