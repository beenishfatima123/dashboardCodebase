import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../customComponents/layout/Layout";
import { Box, Container, Grid } from "@mui/material";
import { AuctionProfileDetails } from "./AuctionProfileDetails";

const EditAuction = () => {
  const auctionParams = useParams();

  return (
    <Layout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container>
          <Grid container spacing={3}>

            <Grid item lg={12} md={12} xs={12}>
              <AuctionProfileDetails id={auctionParams.id} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

export default EditAuction;
