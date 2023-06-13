import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress } from "@mui/material";
import { baseUrl } from "../constants/baseUrls";
import DeleteIcon from "@mui/icons-material/CancelOutlined";
import ShowIcon from "@mui/icons-material/Visibility";
import HideIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { updateNews } from "../../features/newsSlice";
import CustomTooltip from "../miscellaneousComponents/CustomTooltip";

const buttonSx = {
  background:
    "linear-gradient(90deg, rgba(14,216,100,1) 0%, rgba(255,255,255,1) 100%)",
  textTransform: "none",
  color: "#134696",
  width: 125,
  height: 25,
  fontSize: 12,
};

const useStyles = makeStyles(() => ({
  card: {
    display: "flex",
    flex: 1,
    margin: "25px 5px",
  },
  image: {
    height: "100%",
    width: 300,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
    marginLeft: 20,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    color: "#134696",
    fontWeight: "bold",
    margin: "5px 0px",
  },
  description: {
    fontSize: 12,
    color: "#6B7B88",
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    margin: "0px 15px",
  },
  "@media (max-width: 575px)": {
    card: {
      flexDirection: "column",
    },
    details: {
      marginLeft: 0,
    },
    image: {
      width: "100%",
    },
  },
}));

const NewsCard = ({ news, selId, setSelId, setOpenConfirmModal }) => {
  const classes = useStyles();
  const [hovering, setHovering] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const { id, feature_photo, title, description } = news;

  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const {
    updateNewsApiInfo,
  } = useSelector((state) => state.news);

  return (
    <div
      className={classes.card}
      onMouseOver={() => setHovering(id)}
      onMouseOut={() => setHovering(null)}
    >
      <img
        src={`${baseUrl}/${feature_photo}`}
        alt=""
        className={classes.image}
        style={{
          WebkitFilter: hovering === id ? "none" : "grayscale(100%)",
          filter: hovering === id ? "none" : "grayscale(100%)",
        }}
      />
      <div className={classes.details}>
        <span className={classes.title}>{title?.slice(0, 45)}</span>
        <p className={classes.description}>{description}</p>
        <Button
          sx={buttonSx}
          endIcon={<ArrowRightAltIcon style={{ color: "#134696" }} />}
          onClick={() => history.push(`/news/${news?.id}`)}
        >
          Read More
        </Button>
      </div>
      <div className={classes.iconContainer}>
        <DeleteIcon
          sx={{
            fontSize: 20,
            width: 26,
            height: 26,
            cursor: "pointer",
            color: "red",
          }}
          onClick={() => {
            setSelId(id);
            setOpenConfirmModal(true);
          }}
        />
        <EditIcon
          sx={{
            fontSize: 20,
            width: 26,
            height: 26,
            cursor: "pointer",
          }}
          onClick={() => {
            history.push(`/edit-news/${news?.id}`);
          }}
        />
        {selId === news?.id && updateNewsApiInfo?.loading ? (
          <CircularProgress
            size={25}
            sx={{
              color: "#134696",
            }}
          />
        ) : news?.is_active ? (
          <CustomTooltip title="Hide News" placement="left">
            <ShowIcon
              onClick={() => {
                setSelId(news?.id);
                let formData = new FormData();
                formData.append("is_active", false);
                dispatch(
                  updateNews({
                    edit: false,
                    newsID: news?.id,
                    authToken: loggedInObject?.token,
                    values: formData,
                  })
                );
              }}
              sx={{
                fontSize: 20,
                width: 26,
                height: 26,
                cursor: "pointer",
              }}
            />
          </CustomTooltip>
        ) : (
          <CustomTooltip title="Show News" placement="left">
            <HideIcon
              onClick={() => {
                setSelId(news?.id);
                let formData = new FormData();
                formData.append("is_active", true);
                dispatch(
                  updateNews({
                    edit: false,
                    newsID: news?.id,
                    authToken: loggedInObject?.token,
                    values: formData,
                  })
                );
              }}
              sx={{
                fontSize: 20,
                width: 26,
                height: 26,
                cursor: "pointer",
              }}
            />
          </CustomTooltip>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
