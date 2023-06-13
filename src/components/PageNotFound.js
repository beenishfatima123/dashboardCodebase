import React from "react";
import { styled } from "@mui/material/styles";
import { Button, Typography, Container, Box } from "@mui/material";
import Forbidden from "../assets/forbidden.gif";
import { Link as RouterLink } from "react-router-dom";

const ContentStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));
const PageNotFound = () => {
  return (
    <Container>
      <ContentStyle sx={{ textAlign: "center", alignItems: "center" }}>
        <Typography
          variant="h5"
          paragraph
          style={{
            lineHeight: 1.4,
            textAlign: "center",
            boxSizing: "border-box",
            fontSize: "33px",
            fontWeight: "200",
            textTransform: "uppercase",
            marginTop: 0,
            marginBottom: "5px",
            letterSpacing: "3px",
          }}
        >
          We're Sorry ...
        </Typography>
        <Box
          component="img"
          src={Forbidden}
          sx={{ height: 200, mx: "auto", my: { xs: 5, sm: 10 } }}
        />

        <Typography variant="h5" paragraph sx={{ color: "#ea8a1a" }}>
          Page you are trying to access has restricted access.
        </Typography>
        <Typography variant="h5" paragraph sx={{ color: "#ea8a1a" }}>
          Please refer to system administrator.
        </Typography>

        <Button to="/" size="large" variant="contained" component={RouterLink}>
          Go Back
        </Button>
      </ContentStyle>
    </Container>
  );
};

export default PageNotFound;
