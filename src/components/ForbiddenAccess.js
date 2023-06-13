import React, { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
import Layout from "../customComponents/layout/Layout";
import Forbidden from "../assets/forbidden.gif";

const ContentStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0)
}));
const ForbiddenAccess = () => {
  return (
    <Layout>
      <Container>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h5" paragraph sx={{ color: '#ea8a1a' }}>
          Sorry, it's not allowed to go beyond this point!
          </Typography>
          <Box
            component="img"
            src={Forbidden}
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />
          <Button to="/listing" size="large" variant="contained" component={RouterLink}>
            Go to Home
          </Button>
        </ContentStyle>
      </Container>
    </Layout>
  );
};

export default ForbiddenAccess;
