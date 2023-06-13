import React from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { resetSearchListing } from "../../features/listingsSlice";

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    border: "2px solid #e3e3e3",
    borderRadius: 5,
    marginTop: 20,
  },
  section: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "20px 0px 20px 0px",
    flexWrap: "wrap",
    gap: "20px",
  },
  subSection: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "30%",
    justifyContent: "center",
  },
  heading: {
    fontFamily: "medium",
    fontSize: 14,
    color: "#134696",
  },
  input: {
    border: "none",
    borderBottom: "2px solid #e3e3e3",
    color: "#134696",
    fontSize: 18,
    marginTop: 5,
    fontFamily: "medium",
    "&:focus": {
      outline: "none",
    },
  },
  selectContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottom: "1px solid #c9c9c9",
    margin: "10px 0px",
  },
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#134696",
    border: "none",
    color: "#fff",
    fontFamily: "medium",
    width: 80,
    height: 30,
    borderRadius: 20,
    cursor: "pointer",
  },
  "@media (max-width: 600px)": {
    section: {
      display: "flex",
      flexDirection: "column",
      padding: 10,
      justifyContent: "center",
      alignItems: "flex-start",
    },
    subSection: {
      width: "100%",
    },
    heading: {
      marginTop: 20,
    },
  },
}));

const ListingSearchFilter = ({ searchQuery, setSearchQuery }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div className={classes.container}>
      <div className={classes.section}>
        <div className={classes.subSection}>
          <div className={classes.heading} style={{ marginTop: -5 }}>
            Listing Title
          </div>
          <input
            type="text"
            className={classes.input}
            value={searchQuery?.searchTitle || ""}
            onChange={(e) =>
              setSearchQuery((prev) => ({ ...prev, searchTitle: e.target.value }))
            }
            placeholder="Listing Title"
          />
        </div>
        <div className={classes.subSection}>
          <div className={classes.heading} style={{ marginTop: -5 }}>
            Agent Name
          </div>
          <input
            type="text"
            className={classes.input}
            value={searchQuery?.searchAgent || ""}
            onChange={(e) =>
              setSearchQuery((prev) => ({ ...prev, searchAgent: e.target.value }))
            }
            placeholder="Agent Name"
          />
        </div>
        <div className={classes.subSection}>
          <div className={classes.heading} style={{ marginTop: -5 }}>
            Listing Address/Area/City
          </div>
          <input
            type="text"
            className={classes.input}
            value={searchQuery?.searchLocation || ""}
            onChange={(e) =>
              setSearchQuery((prev) => ({ ...prev, searchLocation: e.target.value }))
            }
            placeholder="Address"
          />
        </div>
        <div style={{ display: "flex" }}>
          <button
            className={classes.btn}
            onClick={() => {
              setSearchQuery(null);
              dispatch(resetSearchListing());
            }}
          >
            CLEAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingSearchFilter;
