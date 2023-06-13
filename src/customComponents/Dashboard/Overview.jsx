import React from "react";
import { Box, Typography, Card } from "@mui/material";
import Grid from "@mui/material/Grid";
import DescriptionIcon from "@mui/icons-material/Description";

const Overview = () => {
  return (
    <Box
      sx={{
        width: "95%",
        padding: "10px",
      }}
    >
      <Typography sx={{ fontSize: "20px", color: "#1d396b" }}>
        Overview
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 1, sm: 1, md: 12 }}
        >
          {Array.from(Array(6)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} lg={4} key={index}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "start",
                  height: 150,
                  borderRadius: 2,
                  boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                  p: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "83px",
                    height: "83px",
                    backgroundColor: "#134696",
                    borderRadius: "50px",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <DescriptionIcon
                    sx={{
                      width: "30px",
                      height: "35px",
                      color: "#FFFFFF",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "left",
                    paddingLeft: "15px",
                  }}
                >
                  <Typography sx={{ fontSize: "17px", color: "#9DB1BC" }}>
                    Total Properties
                  </Typography>
                  <Typography sx={{ fontSize: "26px", color: "#1D396B" }}>
                    678
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Overview;
