import React from 'react';
import { Grid } from '@mui/material';
import loader from "../../assets/loader.gif"

const Loader = ({ customContainerStyle, customImageStyle }) => {
  return (
    <Grid
      container
      spacing={0}
      justifyContent="center"
      alignItems="center"
      style={
        customContainerStyle ? customContainerStyle : { minHeight: '80vh' }
      }
    >
      <Grid>
        <img src={loader} style={
          customImageStyle ? customImageStyle : {}
        } />

      </Grid>
    </Grid>
  );
};

export default Loader;
