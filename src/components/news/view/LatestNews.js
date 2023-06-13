import React from "react";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { baseUrl } from "../../constants/baseUrls";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { CONTENT_WIDTH } from "../../constants/global";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "0px 0px",
    margin: "10px 3%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    maxWidth: 285,
    borderBottom: "1px solid #C9C9C9",
    margin: "10px 0px",
    paddingBottom: "10px",
    cursor: "pointer",
  },
  image: {
    height: 170,
    width: 255,
  },
  category: {
    fontSize: 11,
    color: "#0ED864",
    textTransform: "capitalize",
    marginTop: 3,
  },
  title: {
    fontSize: 20,
    color: "#134696",
    fontWeight: "bold",
    margin: "2px 0px",
  },
  user: {
    fontSize: 14,
    color: "#171725",
  },
  time: {
    fontSize: 12,
    color: "#92929D",
  },
  heading: {
    fontSize: 25,
    color: "#134696",
    fontWeight: "bold",
  },
  newsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
    newsContainer: {
      flexDirection: "row",
      overflowX: "scroll",
      "&::-webkit-scrollbar": {
        height: "0.1em",
      },
      "&::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.1)",
        borderRadius: "5px",
      },
      scrollBehavior: "smooth !important",
    },
    card: {
      margin: "0px 10px",
    },
  },
}));

const LatestNews = ({ news }) => {
  const classes = useStyles();
  const width = CONTENT_WIDTH;
  const history = useHistory();

  const [hovering, setHovering] = useState(false);

  return (
    <div className={classes.container}>
      <p className={classes.heading}>Latest News</p>
      <div
        className={classes.newsContainer}
        style={{
          width: width > 1024 ? "100%" : width * 0.9 || 500,
        }}
      >
        {news?.map((elem, index) => (
          <div
            className={classes.card}
            key={index}
            onMouseOver={() => setHovering(index)}
            onMouseOut={() => setHovering(null)}
            onClick={() => history.push(`/news/${elem?.id}`)}
          >
            <img
              src={`${baseUrl}/${elem?.feature_photo}`}
              alt=""
              className={classes.image}
              style={{
                WebkitFilter: hovering === index ? "none" : "grayscale(100%)",
                filter: hovering === index ? "none" : "grayscale(100%)",
              }}
            />
            <span className={classes.category}>{elem?.category?.title}</span>
            <span className={classes.title}>{elem?.title}</span>
            <div>
              <span className={classes.user}>{elem?.author?.full_name}</span>
              <span className={classes.time}>
                {" "}
                {moment(elem?.updated_at).format("DD MMMM HH:MM a")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
