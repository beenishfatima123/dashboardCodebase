import React from "react";
import { makeStyles } from "@mui/styles";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: "20px",
  },
  input: {
    display: "flex",
    flex: 1,
    border: "none",
    fontSize: 16,
    "&:focus": {
      outline: "none",
    },
    color: "#000",
    background: "none",
  },
  searchContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "pink",
  },
  searchInputContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    paddingLeft: 20,
    borderRadius: 30,
    border: "1px solid #9DAFBD",
    position: "relative",
    height: 50,
    // margin: "0px 30px",
  },
  heading: {
    fontFamily: "medium",
    fontSize: 18,
    color: "#134696",
  },
}));

const SearchFilters = ({ searchQuery, setSearchQuery }) => {
  const classes = useStyles();
  const darkMode = false;

  return (
    <Grid
      container
      spacing={2}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: "5px",
      }}
    >
      <Grid
        item
        xs={11}
        sm={11}
        md={6}
        lg={5}
        xl={6}
        style={{
          padding: "20px",
          alignItems: "flex-start",
        }}
      >
        <div className={classes.heading} style={{ marginTop: 0 }}>
          Post ID
        </div>
        <div
          className={classes.searchInputContainer}
          style={{
            backgroundColor: darkMode ? "#2F2F33" : "",
            border: darkMode ? "none" : "1px solid #000",
          }}
        >
          <input
            type="text"
            className={classes.input}
            placeholder="Search"
            value={searchQuery?.postID || ""}
            onChange={(e) => setSearchQuery && setSearchQuery((prev) => ({ ...prev, postID: e?.target?.value }))}
          />
          <IconButton
            sx={{
              p: 0,
              position: "absolute",
              right: -1,
              border: darkMode ? "1px solid #0ED864" : "1px solid #000",
              height: 50,
              width: 50,
            }}
          >
            <SearchIcon
              style={{
                color: darkMode ? "#0ED864" : "#000",
                height: 35,
                width: 35,
              }}
            />
          </IconButton>
        </div>
      </Grid>
      <Grid
        item
        xs={11}
        sm={11}
        md={6}
        lg={5}
        xl={6}
        style={{
          padding: "20px",
        }}
      >
        <div className={classes.heading} style={{ marginTop: 0 }}>
          Post Title
        </div>
        <div
          className={classes.searchInputContainer}
          style={{
            backgroundColor: darkMode ? "#2F2F33" : "",
            border: darkMode ? "none" : "1px solid #000",
          }}
        >
          <input
            type="text"
            className={classes.input}
            placeholder="Search"
            value={searchQuery?.searchText || ""}
            onChange={(e) => setSearchQuery && setSearchQuery((prev) => ({ ...prev, searchText: e?.target?.value }))}
          />
          <IconButton
            sx={{
              p: 0,
              position: "absolute",
              right: -1,
              border: darkMode ? "1px solid #0ED864" : "1px solid #000",
              height: 50,
              width: 50,
            }}
          >
            <SearchIcon
              style={{
                color: darkMode ? "#0ED864" : "#000",
                height: 35,
                width: 35,
              }}
            />
          </IconButton>
        </div>
      </Grid>
    </Grid>
  );
};

export default SearchFilters;
