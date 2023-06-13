import React from "react";
import { makeStyles } from "@mui/styles";
import { IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

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
    flex: 1,
    alignItems: "center",
    paddingLeft: 20,
    borderRadius: 30,
    border: "1px solid #9DAFBD",
    position: "relative",
    height: 50,
  },
}));

const AuctionSearchFilter = ({ style, searchQuery, setSearchQuery, placeholder }) => {
  const classes = useStyles();
  const darkMode = false;

  return (
    <>
      <div className={classes.container} style={style}>
        <div
          className={classes.searchContainer}
          style={{
            backgroundColor: darkMode ? "#2F2F33" : "",
            border: darkMode ? "none" : "1px solid #000",
          }}
        >
          <input
            type="text"
            className={classes.input}
            placeholder="Search"
            value={searchQuery || ""}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
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
      </div>
    </>
  );
};

export default AuctionSearchFilter;
