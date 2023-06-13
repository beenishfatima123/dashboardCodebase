import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { baseUrl } from "../../constants/baseUrls";
import "../../agency/view/slider/customSlider.css";
import { Button, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/CancelOutlined";
import EditIcon from "@mui/icons-material/Edit";
import ShowIcon from "@mui/icons-material/Visibility";
import HideIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  resetVisibilityApi,
  toggleVisibility,
} from "../../../features/newsSlice";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 280,
    zIndex: 12000,
    margin: "10px 9%",
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    flex: 1,
    minHeight: 130,
  },
  btnContainer: {
    display: "flex",
    justifyContent: "flex-end",
    background: `linear-gradient(to top, rgba(0,0,0,0) 20%, rgba(0,0,0,1))`,
    width: "100%",
  },
  iconStyle: {
    cursor: "pointer",
    color: "#fff",
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
}));

const NewsSliderCard = ({ item, setOpenConfirmModal, selItem, setSelItem }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const darkMode = false;
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const { visibilityApiInfo } = useSelector((state) => state.news);

  // eslint-disable-next-line
  const getBackgroundImage = () => {
    let background = "";
    if (item?.feature_photo)
      background = `linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,1)),url(${baseUrl}/${item?.feature_photo})`;
    return background;
  };

  const toggleView = () => {
    setSelItem(item?.id);
    let formData = new FormData();
    formData.append("is_active", !item?.is_active);
    dispatch(
      toggleVisibility({
        newsID: item?.id,
        authToken: loggedInObject?.token,
        values: formData,
      })
    );
  };

  useEffect(() => {
    if (visibilityApiInfo?.response) {
      dispatch(resetVisibilityApi());
      setSelItem(null);
    }
  }, [visibilityApiInfo]);

  return (
    <div className={classes.container}>
      <div
        className="background-image"
        style={{
          backgroundImage: getBackgroundImage(),
          width: 280,
          height: 200,
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div className={classes.btnContainer}>
          <Button>
            {visibilityApiInfo?.loading && selItem === item?.id ? (
              <CircularProgress
                size={25}
                sx={{
                  color: "#134696",
                }}
              />
            ) : item?.is_active ? (
              <ShowIcon className={classes.iconStyle} onClick={toggleView} />
            ) : (
              <HideIcon className={classes.iconStyle} onClick={toggleView} />
            )}
          </Button>
          <Button
            onClick={(e) => {
              //   history.push(`/edit-news/${item?.id}`);
            }}
          >
            <EditIcon className={classes.iconStyle} />
          </Button>
          <Button>
            <DeleteIcon
              className={classes.iconStyle}
              onClick={() => {
                setSelItem(item?.id);
                setOpenConfirmModal(true);
              }}
            />
          </Button>
        </div>
      </div>
      <div
        className={classes.bottomContainer}
        style={{
          width: 280,
          alignSelf: "center",
        }}
      >
        <div className={classes.contentContainer}>
          <span className={classes.category}>{item?.category?.title}</span>
          <span className={classes.title}>{item?.title}</span>
          <div>
            <span className={classes.user}>{item?.author?.full_name}</span>
            <span className={classes.time}>
              {" "}
              {moment(item?.updated_at).format("DD MMMM HH:MM a")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSliderCard;
