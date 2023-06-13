import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { fetchAsyncProperty } from "../../features/store/property/propertySlice";
import Layout from "../../customComponents/layout/Layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import Loader from "../../customComponents/Loader";

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#d5d5d5",
    height: 40,
  },
}));

const ViewNewProject = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const projectParams = useParams();
  const { listing, isLoading } = useSelector((state) => state.properties);
  const data = listing;
  console.log({ data })

  useEffect(() => {
    dispatch(fetchAsyncProperty(projectParams?.id));
  }, [projectParams?.id]);

  if (isLoading === true) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout>
      <Card raised sx={{ width: 800, margin: "auto", mt: 5 }}>
        <CardHeader
          className={classes.header}
          title={data.newtitle}
          titleTypographyProps={{ variant: "h6" }}
        />
        <Grid container justifyContent="space-between">
          <Grid item lg={8}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                <b>Project Id :</b> &nbsp; {data.projectid}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <b>Property Type :</b> &nbsp;{data.property_type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <b>Locality :</b> &nbsp;{data.locality}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <b>City :</b> &nbsp;{data.city}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "justify" }}
              >
                <b>Description :</b> &nbsp;{data.newdescription}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "justify" }}
              >
                <b>Description sec :</b> &nbsp;{data.body}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <b>Min Price :</b> &nbsp;Rs.{data.min_price} &nbsp; ,
                &nbsp;
                <b>Max Price :</b> &nbsp;Rs.{data.max_price}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item lg={3}>
            <CardContent>
              <CardMedia
                component="img"
                height="120"
                image={data.newimage}
                alt="image"
              />
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Layout>
  );
};

export default ViewNewProject;
