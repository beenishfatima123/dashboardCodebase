import React from "react";
import { makeStyles } from "@mui/styles";
// eslint-disable-next-line
import { baseUrl } from "../../../constants/baseUrls";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#134696",
    maxWidth: 580,
  },
  middleContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  postedBy: {
    color: "#6B7B88",
    fontSize: 16,
    textAlign: "right",
  },
  user: {
    color: "#134696",
    fontSize: 32,
    fontFamily: "heavy",
  },
  location: {
    color: "#6B7B88",
    fontSize: 20,
  },
  logo: {
    height: 190,
    width: 190,
    borderRadius: 10,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  "@media (max-width: 1024px)": {
    container: {
      marginTop: 20,
      flexDirection: "column",
    },
    middleContainer: {
      alignItems: "flex-start",
      margin: "20px 0px",
    },
    logo: {
      width: "100%",
    },
  },
}));
const AgentInfo = ({ property }) => {
  const classes = useStyles();
  const darkMode = false;
  const loggedInObject = useSelector((state) => state.auth.currentUser);

  return (
    <div className={classes.container}>
      {/* <VerificationBadge fill={darkMode ? "#0ed864" : "#134696"} /> */}
      <div className={classes.middleContainer}>
        <span
          className={classes.postedBy}
          style={{
            color: darkMode ? "#6B7B88" : "#fff",
          }}
        >
          Posted By:
        </span>
        <span
          className={classes.user}
          style={{
            color: darkMode ? "#0ed864" : "#fff",
          }}
        >
          {loggedInObject?.first_name} {loggedInObject?.last_name}
        </span>
        <span
          className={classes.location}
          style={{
            color: darkMode ? "#6B7B88" : "#fff",
          }}
        >
          {`${property?.street}, ${property?.area}, ${property?.city}`}
        </span>
        <div className={classes.btnContainer} style={{ marginTop: 5 }}>
          <Button
            sx={{
              textTransform: "none",
              color: darkMode ? "#0ed864" : "#fff",
              fontSize: 18,
              fontFamily: "medium",
            }}
          >
            Contact this agent
          </Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4"
            height="25"
            viewBox="0 0 4 25"
          >
            <rect
              id="Rectangle_5780"
              data-name="Rectangle 5780"
              width="4"
              height="25"
              fill="#0ed864"
            />
          </svg>

          <Button
            sx={{
              textTransform: "none",
              color: darkMode ? "#0ed864" : "#fff",
              fontSize: 18,
              fontFamily: "medium",
            }}
          >
            {"Request a tour"}
          </Button>
        </div>
      </div>

      <img
        src={`${baseUrl}/${loggedInObject?.photo}`}
        alt=""
        className={classes.logo}
      />
    </div>
  );
};

export default AgentInfo;
