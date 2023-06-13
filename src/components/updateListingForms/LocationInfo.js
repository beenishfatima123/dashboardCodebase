import React, { useEffect } from "react";
import { Container, Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router";
import { Formik, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncGetPropertyDetail,
  getPropertyDetailForUpdate,
  postAsyncUpdatePropertyDetail,
} from "../../features/store/property/propertySlice";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "./../constants/baseUrls";
import Loader from '../../customComponents/Loader';

// styles
const useStyles = makeStyles(() => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "5% 10% 0% 10%",
  },
  fields: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
  },
}));

const LocationInfo = () => {
  // const loggedInObject = JSON.parse(localStorage.getItem("logged_in"));
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  let paramFromDetailListing = useParams();
  const classes = useStyles();
  const data = useSelector(getPropertyDetailForUpdate);
  let { isLoading } = useSelector(state => state.properties);
  const dispatch = useDispatch();

  const getUpdateData = async (values) => {
    const listingId = paramFromDetailListing.id;
    const val = { authToken: loggedInObject?.token, values, listingId };
    try {
      await axios.put(`${baseUrl}/users/property/${listingId}/`, values, {
        headers: {
          Authorization: `token ${loggedInObject?.token}`,
        },
      }).then((response) => {
        if (response?.data?.status) {
          toast.success(JSON.stringify("Location details updated"), {
            position: toast.POSITION.BOTTOM_RIGHT,
            progressStyle: { backgroundColor: "#014493" },
          });
        }
        else {
          toast.error(JSON.stringify(response?.data?.message), {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      })
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) || error.message ||
        error.toString();
      return (message);
    }
    dispatch(postAsyncUpdatePropertyDetail(val));
  };

  useEffect(() => {
    dispatch(fetchAsyncGetPropertyDetail(paramFromDetailListing.id));
  }, []);

  if (isLoading === true) {
    return <Loader />;
  }

  return (
    <Container fullwidth="true">
      <div className={classes.paper}>
        <Formik
          initialValues={{
            address: data?.address,
            city: data?.city,
            area: data?.area,
            loca: data?.loca,
            lng: data?.lng,
            lat: data?.lat,
          }}
          enableReinitialize={true}
          onSubmit={(values) => {
            getUpdateData(values);
          }}
        >
          {({ handleChange, handleBlur }) => (
            <div style={{ width: "100%" }}>
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <div className="profileEditField">
                      <label>Full Address</label>
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="address"
                        defaultValue={data?.address}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="profileEditField">
                      <label>City</label>
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="city"
                        defaultValue={data?.city}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="profileEditField">
                      <label>Area</label>
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="area"
                        defaultValue={data?.area}
                      />
                    </div>
                  </Grid>

                  <Grid item xs={6}>
                    <div className="profileEditField">
                      <label>Longitude</label>
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="lng"
                        defaultValue={data?.lng}
                        type="number"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="profileEditField">
                      <label>Latitude</label>
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="lat"
                        defaultValue={data?.lat}
                        type="number"
                      />
                    </div>
                  </Grid>
                </Grid>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 10,
                  }}
                >
                  <Button variant="outlined" type="submit">
                    Update
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default LocationInfo;
