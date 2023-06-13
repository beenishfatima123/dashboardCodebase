import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid #c9c9c9",
    borderRadius: "13px",
    margin: "25px 50px",
  },
  title: {
    fontSize: 24,
    fontFamily: "heavy",
  },
  "@media (max-width: 500px)": {
    title: {
      fontSize: 28,
    },
  },
}));

const TopCard = () => {
  const classes = useStyles();
  let darkMode = false;

  return (
    <div
      className={classes.container}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      <span
        className={classes.title}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        Add Project
      </span>
    </div>
  );
};

export default TopCard;
