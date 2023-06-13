import React, { useState, useRef } from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import playIcon from "../../../../assets/courses/play.png";
import Loader from "../../../../customComponents/Loader";
import { CircularProgress } from "@mui/material";
import ShowIcon from "@mui/icons-material/Visibility";
import HideIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/CancelOutlined";
import EditIcon from "@mui/icons-material/Edit";
import CustomTooltip from "../../../miscellaneousComponents/CustomTooltip";

const useStyles = makeStyles(() => ({
  privacyLabel: {
    fontSize: 30,
    fontFamily: "medium",
    color: "#3D3E41",
    marginBottom: 10,
  },
  privacyDescription: {
    fontSize: 14,
    fontFamily: "medium",
    color: "#1B1B29",
  },
  chapterName: {
    marginLeft: 20,
    fontSize: 15,
    width: "70%",
    fontFamily: "medium",
    color: "#777F8A",
  },
  chapterDuration: {
    fontSize: 15,
    fontFamily: "medium",
    color: "#777F8A",
  },
  completeIcon: {
    width: 55,
    height: 57,
    borderRadius: "50%",
    backgroundColor: "#0ED864",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    width: 55,
    height: 57,
    borderRadius: "50%",
    backgroundColor: "#dbe3ef",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const ChapterVideos = () => {
  const classes = useStyles();
  const videoEl = useRef(null);

  const { moduleDetail } = useSelector((state) => state.course);
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <>
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        {false ? (
          <Loader />
        ) : (
          <Grid
            item
            xs={10}
            sm={10}
            md={4}
            lg={4}
            xl={4}
            sx={{ overflow: "hidden", mt: 2 }}
          >
            {moduleDetail?.chapters?.map((chapter, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 5,
                    margin: "0px 0px 10px 60px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setActiveVideo(chapter);
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div className={classes.playIcon}>
                      <img alt="icon" src={playIcon} />
                    </div>
                    <div className={classes.chapterName}>
                      {chapter?.description}
                    </div>
                  </div>
                  <div className={classes.chapterDuration}>
                    {chapter?.duration}
                  </div>
                </div>
              );
            })}
          </Grid>
        )}
        <Grid item xs={10} sm={10} md={7} lg={8} xl={8}>
          <Grid container justifyContent="center">
            {activeVideo && (
              <>
                <Grid
                  item
                  lg={11.5}
                  xl={11.5}
                  sx={{ height: 450, position: "relative" }}
                >
                  <div
                    style={{
                      position: "absolute",
                      zIndex: 10,
                      right: 35,
                      top: 20,
                      height: 100,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    {false ? (
                      <CircularProgress
                        size={25}
                        sx={{
                          color: "#134696",
                        }}
                      />
                    ) : activeVideo?.is_active ? (
                      <CustomTooltip title="Hide Chapter" placement="left">
                        <ShowIcon
                          sx={{
                            fontSize: 20,
                            cursor: "pointer",
                            color: "#FFFFFF",
                          }}
                        />
                      </CustomTooltip>
                    ) : (
                      <CustomTooltip title="Show Chapter" placement="left">
                        <HideIcon
                          sx={{
                            fontSize: 20,
                            cursor: "pointer",
                            color: "#FFFFFF",
                          }}
                        />
                      </CustomTooltip>
                    )}
                    <EditIcon
                      sx={{ fontSize: 20, cursor: "pointer", color: "#FFFFFF" }}
                    />
                    <DeleteIcon
                      sx={{
                        fontSize: 20,
                        cursor: "pointer",
                        color: "#FFFFFF",
                      }}
                    />
                  </div>
                  <video
                    controls
                    id="videoPlayer"
                    name="videoPlayer"
                    // src={baseUrl + "/" + activeVideo?.video}
                    src={activeVideo?.link}
                    width="100%"
                    height="100%"
                    ref={videoEl}
                  />
                </Grid>
                <Grid item lg={11.5} xl={11.5} sx={{ my: 2 }}>
                  <div className={classes.privacyLabel}>
                    {activeVideo?.title}
                  </div>
                  <div className={classes.privacyDescription}>
                    {activeVideo?.description}
                  </div>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ChapterVideos;
