import React from "react";
import { makeStyles } from "@mui/styles";
import { baseUrl } from "../../constants/baseUrls";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { ArrowBackIos } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import ProfileMenu from "../../../customComponents/profileMenu/ProfileMenu";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    width: "100%",
    position: "relative",
  },
  inner: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 35,
  },
  image: {
    height: 400,
    width: "100%",
    WebkitFilter: "grayscale(100%)",
    filter: "grayscale(100%)",
    "&:hover": {
      WebkitFilter: "none",
      filter: "none",
    },
  },
}));
const TopSection = () => {
  const classes = useStyles();
  const history = useHistory();

  const { newsDetail } = useSelector((state) => state.news);

  return (
    <div className={classes.container}>
      <img
        src={`${baseUrl}/${newsDetail?.feature_photo}`}
        className={classes.image}
        alt=""
      />
      <div className={classes.inner}>
        <Button
          sx={{
            background:
              "linear-gradient(90deg, rgba(14,216,100,1) 0%, rgba(255,255,255,1) 100%)",
            textTransform: "none",
            color: "#134696",
            width: 180,
            height: 45,
          }}
          startIcon={<ArrowBackIos style={{ color: "#134696" }} />}
          onClick={() => history.push("/News")}
        >
          Back
        </Button>
        <ProfileMenu />
      </div>
    </div>
  );
};

export default TopSection;
