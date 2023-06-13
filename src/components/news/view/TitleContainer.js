import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import ShowIcon from "@mui/icons-material/Visibility";
import HideIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/CancelOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { deleteNews, updateNews } from "../../../features/newsSlice";
import { CircularProgress } from "@mui/material";
import ConfirmModal from "../../miscellaneousComponents/ConfirmModal";

const useStyles = makeStyles(() => ({
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 35,
    marginLeft: "3%",
    marginRight: "3%",
    borderBottom: "1px solid #C9C9C9",
    paddingBottom: 10,
  },
  categoryText: {
    fontSize: 18,
    color: "#0ED864",
    textTransform: "capitalize",
  },
  title: {
    fontSize: 40,
    color: "#134696",
    fontWeight: "bold",
    margin: 0,
  },
  iconsContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: 200,
  },
}));
const TitleContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const { newsDetail, updateNewsApiInfo } = useSelector((state) => state.news);
  const loggedInObject = useSelector((state) => state.auth.currentUser);

  const toggleView = () => {
    let formData = new FormData();
    formData.append("is_active", !newsDetail?.is_active);
    dispatch(
      updateNews({
        edit: false,
        newsID: newsDetail?.id,
        authToken: loggedInObject?.token,
        values: formData,
      })
    );
  };

  const removeNews = () => {
    setOpenConfirmModal(false);
    dispatch(
      deleteNews({
        authToken: loggedInObject?.token,
        newsID: newsDetail?.id,
        opened: true,
      })
    );
  };

  return (
    <div className={classes.titleContainer}>
      {openConfirmModal && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title="Are you sure you want to delete this news?"
          handleConfirm={removeNews}
        />
      )}
      <div>
        <span className={classes.categoryText}>
          {newsDetail?.category?.title}
        </span>
        <p className={classes.title}>{newsDetail?.title}</p>
      </div>
      <div className={classes.iconsContainer}>
        {updateNewsApiInfo?.loading ? (
          <CircularProgress
            size={45}
            sx={{
              color: "#134696",
            }}
          />
        ) : newsDetail?.is_active ? (
          <ShowIcon
            sx={{
              fontSize: 20,
              cursor: "pointer",
              height: "55px",
              width: "48px",
            }}
            onClick={toggleView}
          />
        ) : (
          <HideIcon
            sx={{
              fontSize: 20,
              cursor: "pointer",
              height: "55px",
              width: "48px",
            }}
            onClick={toggleView}
          />
        )}
        <EditIcon
          sx={{
            fontSize: 20,
            cursor: "pointer",
            height: "55px",
            width: "48px",
          }}
        />
        <DeleteIcon
          sx={{
            fontSize: 20,
            cursor: "pointer",
            color: "red",
            height: "55px",
            width: "48px",
          }}
          onClick={() => setOpenConfirmModal(true)}
        />{" "}
      </div>
    </div>
  );
};

export default TitleContainer;
