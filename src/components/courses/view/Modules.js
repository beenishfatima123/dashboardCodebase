import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { Divider, Grid } from "@mui/material";
import { toast } from "react-toastify";
import forwardArrow from "../../../assets/icons/forwardArrow.png";
import headingPattern from "../../../assets/courses/headingPattern.png";
import Loader from "../../../customComponents/Loader";
import { Button, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/CancelOutlined";
import ShowIcon from "@mui/icons-material/Visibility";
import HideIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import {
  deleteCourseContent,
  resetDeleteApi,
  setModuleDetail,
  toggleVisibility,
} from "../../../features/newCourseSlice";
import ConfirmModal from "../../miscellaneousComponents/ConfirmModal";

const useStyles = makeStyles(() => ({
  headingPattern: {
    position: "absolute",
    left: "9vw",
    marginTop: 20,
  },
  heading: {
    fontSize: 32,
    fontFamily: "heavy",
    color: "#134696",
    marginLeft: "3vw",
    marginTop: 50,
    marginBottom: -70,
  },
  main: {
    height: 200,
    backgroundColor: "#134696",
    position: "relative",
  },
  module: {
    padding: 10,
    fontSize: 11,
    fontFamily: "medium",
    color: "#0ed864",
  },
  name: {
    fontSize: 19,
    fontFamily: "medium",
    color: "#ffffff",
    padding: 10,
    width: "99%",
    height: 80,
  },
  bottomMain: {
    marginTop: 5,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 10px",
    position: "absolute",
    bottom: 5,
    width: "95%",
  },
  getStarted: {
    fontSize: 12,
    color: "#ffffff",
    fontFamily: "medium",
    background:
      "linear-gradient(90deg, rgba(14,216,100,1) 50%, rgba(0,0,0,0) 100%)",
    width: 110,
    padding: 5,
    marginBottom: 5,
    cursor: "pointer",
  },
  people: {
    fontSize: 9,
    letterSpacing: 1,
    color: "#0ed864",
    fontFamily: "medium",
  },
  instructorLabel: {
    fontSize: 11,
    letterSpacing: 1,
    color: "#0ed864",
    fontFamily: "medium",
    textAlign: "right",
    marginBottom: 5,
  },
  instructor: {
    fontSize: 13,
    fontFamily: "medium",
    color: "#ffffff",
  },
  iconStyle: {
    cursor: "pointer",
    color: "#FFFFFF",
  },
}));

const Modules = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selModule, setSelModule] = useState();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const {
    courseDetail,
    courseDetailApiInfo,
    visibilityApiInfo,
    deleteApiInfo,
  } = useSelector((state) => state.course);
  const loggedInObject = useSelector((state) => state.auth.currentUser);

  const toggleView = (id, status) => {
    setSelModule(id);
    let formData = new FormData();
    formData.append("is_active", !status);
    dispatch(
      toggleVisibility({
        type: "module",
        contentID: id,
        authToken: loggedInObject?.token,
        values: formData,
      })
    );
  };

  const removeModule = () => {
    setOpenConfirmModal(false);
    dispatch(
      deleteCourseContent({
        authToken: loggedInObject?.token,
        type: "module",
        contentID: selModule,
      })
    );
  };

  useEffect(() => {
    if (deleteApiInfo?.response) {
      setSelModule(null);
      toast.success("Module deleted successfully.", {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetDeleteApi());
    }
    // eslint-disable-next-line
  }, [deleteApiInfo?.response]);

  return (
    <>
      {courseDetailApiInfo?.loading ? (
        <Loader />
      ) : (
        <>
          {openConfirmModal && (
            <ConfirmModal
              open={openConfirmModal}
              setOpen={setOpenConfirmModal}
              title="Are you sure you want to delete this module?"
              handleConfirm={removeModule}
              setSelItem={setSelModule}
            />
          )}
          <div>
            <div className={classes.heading}>Modules</div>
            <img
              className={classes.headingPattern}
              alt=""
              src={headingPattern}
            />
          </div>
          <Grid
            container
            justifyContent="flex-start"
            spacing={1}
            sx={{ ml: 3, mt: 15 }}
          >
            {courseDetail?.modules?.map((module, index) => (
              <Grid key={index} item xs={11.5} sm={5.8} md={3.8} lg={3.8}>
                {selModule === module?.id && deleteApiInfo?.deleteModule ? (
                  <Loader
                    customContainerStyle={{ minHeight: "10vh" }}
                    customImageStyle={{ height: 200, width: 200 }}
                  />
                ) : (
                  <div className={classes.main}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <span className={classes.module}>
                        MODULE {module?.id}
                      </span>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          alignItems: "center",
                        }}
                      >
                        <Button>
                          {selModule === module?.id &&
                          visibilityApiInfo?.updatingModule ? (
                            <CircularProgress
                              size={25}
                              sx={{
                                color: "#FFFFFF",
                              }}
                            />
                          ) : module?.is_active ? (
                            <ShowIcon
                              className={classes.iconStyle}
                              onClick={() =>
                                toggleView(module?.id, module?.is_active)
                              }
                            />
                          ) : (
                            <HideIcon
                              className={classes.iconStyle}
                              onClick={() =>
                                toggleView(module?.id, module?.is_active)
                              }
                            />
                          )}
                        </Button>
                        <Button>
                          <EditIcon className={classes.iconStyle} />
                        </Button>
                        <Button>
                          <DeleteIcon
                            className={classes.iconStyle}
                            onClick={() => {
                              setSelModule(module?.id);
                              setOpenConfirmModal(true);
                            }}
                          />
                        </Button>
                      </div>
                    </div>
                    <Divider sx={{ mx: 1, backgroundColor: "#FFFFFF" }} />
                    <div className={classes.name}>{module?.title}</div>
                    <div className={classes.bottomMain}>
                      <div>
                        <div
                          className={classes.getStarted}
                          onClick={() => {
                            dispatch(
                              setModuleDetail({
                                moduleId: module?.id,
                              })
                            );
                          }}
                        >
                          Get Started
                          <img
                            alt="forward"
                            src={forwardArrow}
                            style={{ padding: "0 10px" }}
                          />
                        </div>
                        <div className={classes.people}>
                          {module.people} people already started
                        </div>
                      </div>
                      <div style={{}}>
                        <div className={classes.instructorLabel}>
                          Instructor
                        </div>
                        <div className={classes.instructor}>
                          {module.instructor}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default Modules;
