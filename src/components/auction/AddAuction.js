import React, { useState } from "react";
import Layout from "../../customComponents/layout/Layout";
import { Grid } from "@mui/material";
import AuctionFormTabs from "./AuctionFormTabs";

const AddAuction = () => {
  const [addingAuction, setAddingAuction] = useState(true);
  return (
    <Layout>
      <Grid justifyContent={"center"} sx={{ width: "100%", padding: "50px" }}>
        <Grid item xs={10} sm={10} md={8} lg={8}>
          <AuctionFormTabs setAddingAuction={setAddingAuction} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default AddAuction;
