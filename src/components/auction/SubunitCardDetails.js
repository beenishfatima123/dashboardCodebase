import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  valueContainer: {
    display: "flex",
    margin: "5px 0px",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #0ED864",
    paddingBottom: 10,
  },
  value: {
    fontSize: 18,
    color: "#134696",
    marginTop: 0,
    fontFamily: "medium",
    fontWeight: "bold",
  },
  auctionEnd: {
    fontSize: 18,
    color: "#D0021B ",
    marginTop: 0,
    fontFamily: "medium",
  },
  verticalContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "0px 10px",
    width: 200,
  },
  title: {
    fontSize: 13,
    color: "#707070",
    fontFamily: "medium",
    margin: "5px 0px",
  },
}));
const SubunitCardDetails = ({ auction }) => {
  const classes = useStyles();

  return (
    <div className={classes.valueContainer}>
      <div className={classes.verticalContainer}>
        <p className={classes.title}>Price value</p>
        <span className={classes.value}>
          {`${auction?.currency} ${auction?.sub_unit_value}`}
        </span>
      </div>
      <div className={classes.verticalContainer}>
        <p className={classes.title}>Shares available</p>
        <span className={classes.value}>
          {parseInt(auction?.sub_unit_share_percentage)}%
        </span>
      </div>
    </div>
  );
};

export default SubunitCardDetails;
