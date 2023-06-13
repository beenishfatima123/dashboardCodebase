import { Grid, Box } from "@mui/material";
import AuthLogin from "./auth-forms/AuthLogin";
import AuthLeftBackground from "../../assets/images/auth/AuthLeftBackground";
import AuthRightBackground from "../../assets/images/auth/AuthRightBackground";
import { useSelector } from "react-redux";
import Loader from "../../customComponents/Loader";

const Login = () => {
  const loginApi = useSelector((state) => state.auth.loginApi);

  return (
    <>
      <Box sx={{ minHeight: "100vh" }}>
        <AuthLeftBackground />
        {loginApi?.loading ? (
          <Loader />
        ) : (
          <Grid
            container
            direction="column"
            justifyContent="flex-end"
            sx={{
              minHeight: "80vh",
            }}
          >
            <Grid item xs={12}>
              <Grid
                item
                xs={12}
                container
                justifyContent="center"
                alignItems="center"
                sx={{
                  minHeight: {
                    xs: "calc(100vh - 134px)",
                    md: "calc(100vh - 112px)",
                  },
                }}
              >
                <Grid
                  container
                  spacing={3}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <Grid item xs={4}>
                    <AuthLogin  />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
        <AuthRightBackground />
      </Box>
    </>
  );
};

export default Login;
