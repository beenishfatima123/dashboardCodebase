import React from "react";
import ProfileCard from "./ProfileCard";
import ProfileDetail from "./ProfileDetail";
import { Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import Loader from "../../customComponents/Loader";

const Profile = () => {

  const { selectedAgentApiInfo, dataDetail } = useSelector(
    (state) => state.agent
  );


  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Grid
        container
        spacing={3}
        sx={{ display: "flex", flexDirection: "row-reverse" }}
      >
        {selectedAgentApiInfo?.loading ? (
          <Loader />
        ) : (
          <>
            <Grid item lg={4} md={4} xs={12}>
              <ProfileCard agentData={dataDetail?.agent} />
            </Grid>
            <Grid item lg={8} md={8} xs={12}>
              <ProfileDetail agentData={dataDetail?.agent} />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default Profile;
