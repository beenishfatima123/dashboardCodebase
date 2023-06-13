import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router";
import { Formik, Form } from "formik";
import {
  Container,
  Grid,
  Button,
} from "@mui/material";
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
  iconDiv: {
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
  },
  iconText: {
    fontSize: 14,
  },
}));

const DetailInfo = () => {
  // const loggedInObject = JSON.parse(localStorage.getItem("logged_in"));
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  let paramFromDetailListing = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const data = useSelector(getPropertyDetailForUpdate);
  let { isLoading } = useSelector(state => state.properties);

  const getUpdateData = async (values) => {
    const listingId = paramFromDetailListing.id;
    values = {
      ...values,
    };
    const val = { authToken: loggedInObject?.token, listingId, values };
    try {
      await axios.put(`${baseUrl}/users/property/${paramFromDetailListing.id}/`, values, {
        headers: {
          Authorization: `token ${loggedInObject?.token}`,
        },
      }).then((response) => {
        if (response?.data?.status) {
          toast.success(JSON.stringify("Property detail updated"), {
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
            beds: data?.beds,
            bathrooms: data?.bathrooms,
            condition: data?.condition,
            year: data?.year,
            neighborhood: data?.neighborhood,
          }}
          onSubmit={(values) => {
            getUpdateData(values);
          }}
        >
          {({ handleChange, handleBlur }) => (
            // <Typography component="div" sx={{ width: "100%" }}>
            <Form>
              <Grid container spacing={3} sx={{ mb: 5 }}>
                <Grid item xs={6}>
                  <div className="profileEditField">
                    <label>Beds</label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="beds"
                      defaultValue={data?.beds}
                      type="number"
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="profileEditField">
                    <label>Bathroom</label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="bathrooms"
                      defaultValue={data?.bathrooms}
                      type="number"
                    />
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <div className="profileEditField">
                    <label>Property Year Built</label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="year"
                      placeholder={data?.year}
                      defaultValue={data?.year}
                      type="number"
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="profileEditField">
                    <label>Neighborhood</label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="neighborhood"
                      defaultValue={data?.neighborhood}
                    />
                  </div>
                </Grid>
              </Grid>
              <div style={{ padding: 10 }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 30,
                }}
              >
                <Button variant="outlined" type="submit">
                  Update
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default DetailInfo;