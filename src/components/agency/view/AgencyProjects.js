import React, { useEffect, useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import HeadingSvg from "./HeadingSvg";
import Loader from "../../../customComponents/Loader";
import { getAgencyProjects } from "../../../features/agencySlice";
import { Grid } from "@mui/material";
import ProjectCard from "./ProjectCard";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 1700,
    alignSelf: "center",
    width: "100%",
    alignItems: "center",
  },
  topContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    padding: "20px 0px",
    minHeight: 100,
    position: "relative",
    width: "100%",
    left: -80,
  },

  bottomBorder: {
    height: 1,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#707070",
  },
  description: {
    color: "#7D7D7D",
    fontSize: 18,
    margin: "20px 5%",
  },
  projectsGrid: {
    display: "flex",
    flex: 1,
  },
  sideGrid: {
    display: "flex",
    flexDirection: "column",
  },
  "@media (max-width: 900px)": {
    sideGrid: {
      flexDirection: "column",
    },
  },
  "@media (max-width: 700px)": {
    topContainer: {
      flexDirection: "column",
    },
    iconsStyle: {
      maxWidth: "90%",
      marginRight: 0,
      alignSelf: "flex-end",
      marginTop: 50,
    },
    about: {
      marginLeft: 100,
      fontSize: 28,
    },
  },
}));
const AgencyProjects = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { agencyDetails, allAgencyProjects, allAgencyProjectsApiInfo } =
    useSelector((state) => state.agency);

  const showcaseProjects = useMemo(() => {
    if (allAgencyProjects?.projects?.length >= 3)
      return allAgencyProjects?.projects?.slice(0, 3);
    else return allAgencyProjects?.projects;
  }, [allAgencyProjects]);

  useEffect(() => {
    if (!allAgencyProjects && agencyDetails) {
      dispatch(getAgencyProjects({ id: agencyDetails?.id }));
    }
    // eslint-disable-next-line
  }, [allAgencyProjects, agencyDetails]);

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>
        <HeadingSvg
          heading={`All Projects by ${agencyDetails?.company_name}`}
        />
      </div>
      {allAgencyProjectsApiInfo?.loading ? (
        <Loader />
      ) : (
        <Grid
          container
          sx={{
            padding: "20px 5%",
          }}
        >
          <Grid item xs={12} sm={12} md={12} lg={8} columnSpacing={2}>
            {showcaseProjects?.length >= 1 && (
              <ProjectCard project={showcaseProjects[0]} large />
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4}>
            <div className={classes.sideGrid}>
              {showcaseProjects?.length >= 2 && (
                <ProjectCard project={showcaseProjects[1]} />
              )}
              {showcaseProjects?.length >= 3 && (
                <>
                  <ProjectCard project={showcaseProjects[2]} />
                </>
              )}
            </div>
          </Grid>
        </Grid>
      )}
      {allAgencyProjects?.projects?.length > 0 ? (
        <Grid
          container
          sx={{
            padding: "20px 5%",
          }}
        >
          {allAgencyProjects?.projects?.map((elem, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ProjectCard project={elem} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              color: "#134696",
              fontSize: 28,
              fontWeight: "bold",
            }}
          >
            Not found
          </p>
        </div>
      )}
      <div className={classes.bottomBorder} />
    </div>
  );
};

export default AgencyProjects;
