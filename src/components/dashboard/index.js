import { useSelector } from "react-redux";
import { Grid, Box } from "@mui/material";
import Layout from "../../customComponents/layout/Layout";
import Overview from "../../customComponents/Dashboard/Overview";
import CustomTopInfo from "../../customComponents/layout/CustomTopInfo";

const Dashboard = () => {
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const gridSpacing = 3;

  return (
    <Layout>
      <CustomTopInfo
        heading={`Welcome , ${loggedInObject?.first_name} ${loggedInObject?.last_name}`}
      />
      <Grid container>

        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 1.25,
            }}
          >
            <Overview />
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
