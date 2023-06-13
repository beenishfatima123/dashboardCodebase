import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import playIcon from "../../../../assets/courses/play2.png";
import ShowIcon from "@mui/icons-material/Visibility";
import HideIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/CancelOutlined";
import EditIcon from "@mui/icons-material/Edit";
import CustomTooltip from "../../../miscellaneousComponents/CustomTooltip";
import {
  deleteCourseContent,
  resetDeleteApi,
  toggleVisibility,
} from "../../../../features/newCourseSlice";
import ConfirmModal from "../../../miscellaneousComponents/ConfirmModal";

const useStyles = makeStyles(() => ({
  chapterName: {
    marginLeft: 20,
    fontSize: 17,
    fontFamily: "light",
    color: "##272727",
  },
  chapterDuration: {
    fontSize: 14,
    fontFamily: "medium",
    color: "#777F8A",
  },
  btnContainer: {
    display: "flex",
    gap: 10,
  },
}));

const Content = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { courseDetail, moduleDetail, visibilityApiInfo, deleteApiInfo } =
    useSelector((state) => state.course);
  const loggedInObject = useSelector((state) => state.auth.currentUser);

  const [selChapter, setSelChapter] = useState();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);

  useEffect(() => {}, [moduleDetail]);

  const toggleView = (id, status) => {
    setSelChapter(id);
    let formData = new FormData();
    formData.append("is_active", !status);
    dispatch(
      toggleVisibility({
        type: "chapter",
        contentID: id,
        authToken: loggedInObject?.token,
        values: formData,
      })
    );
  };

  const removeChapter = () => {
    setOpenConfirmModal(false);
    dispatch(
      deleteCourseContent({
        authToken: loggedInObject?.token,
        type: "chapter",
        contentID: selChapter,
      })
    );
  };

  useEffect(() => {
    if (deleteApiInfo?.response) {
      setSelChapter(null);
      toast.success("Chapter deleted successfully.", {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetDeleteApi());
    }
    // eslint-disable-next-line
  }, [deleteApiInfo?.response]);

  return (
    <>
      {openConfirmModal && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title="Are you sure you want to delete this chapter?"
          handleConfirm={removeChapter}
          setSelItem={setSelChapter}
        />
      )}
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {moduleDetail?.chapters.map((chapter, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "20px 0px",
                width: "95%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "40%",
                  height: 40,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 35,
                    backgroundColor: "#134696",
                    borderRadius: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img alt="icon" src={playIcon} />
                </div>
                <div className={classes.chapterName}>{chapter.title}</div>
              </div>
              <div className={classes.chapterDuration}>{chapter.duration}</div>
              <div className={classes.btnContainer}>
                {selChapter === chapter?.id &&
                visibilityApiInfo?.updatingChapter ? (
                  <CircularProgress
                    size={25}
                    sx={{
                      color: "#134696",
                    }}
                  />
                ) : chapter?.is_active ? (
                  <CustomTooltip title="Hide Chapter" placement="left">
                    <ShowIcon
                      sx={{
                        fontSize: 20,
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        toggleView(chapter?.id, chapter?.is_active)
                      }
                    />
                  </CustomTooltip>
                ) : (
                  <CustomTooltip title="Show Chapter" placement="left">
                    <HideIcon
                      sx={{
                        fontSize: 20,
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        toggleView(chapter?.id, chapter?.is_active)
                      }
                    />
                  </CustomTooltip>
                )}
                <EditIcon sx={{ fontSize: 20, cursor: "pointer" }} />
                {selChapter === chapter?.id && deleteApiInfo?.deleteChapter ? (
                  <CircularProgress
                    size={25}
                    sx={{
                      color: "#134696",
                    }}
                  />
                ) : (
                  <DeleteIcon
                    sx={{
                      fontSize: 20,
                      cursor: "pointer",
                      color: "red",
                    }}
                    onClick={() => {
                      setSelChapter(chapter?.id);
                      setOpenConfirmModal(true);
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Content;
