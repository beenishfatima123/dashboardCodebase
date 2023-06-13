import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router";
import { Formik, Form } from "formik";
import {
  Container,
  Box,
  Button,
  Typography,
  Chip,
  Paper,
} from "@mui/material";
import {
  fetchAsyncGetPropertyDetail,
  getPropertyDetailForUpdate,
  postAsyncUpdatePropertyDetail,
} from "../../features/store/property/propertySlice";
import tv_lounge from "../../assets/icons/electricity.png";
import store_room from "../../assets/icons/furnished.png";
import laundry_room from "../../assets/icons/parking.png";
import kitchen from "../../assets/icons/wifi.png";
import balcony from "../../assets/icons/phone.png";
import garden from "../../assets/icons/sewerage.png";
import suigas from "../../assets/icons/suigas.png";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "./../constants/baseUrls";
import Loader from "../../customComponents/Loader";

const featuresArray = [
  { id: 1, icon: tv_lounge, title: "TV Lounge", name: "tv_lounge" },
  { id: 2, icon: store_room, title: "Store Room", name: "store_room" },
  { id: 3, icon: laundry_room, title: "Laundry Room", name: "laundry_room" },
  { id: 4, icon: kitchen, title: "Kitchen", name: "kitchen" },
  { id: 5, icon: balcony, title: "Balcony", name: "balcony" },
  { id: 6, icon: garden, title: "Garden", name: "garden" },
];

const servicesArray = [
  { id: 1, icon: tv_lounge, title: "Electricity", name: "electricity" },
  { id: 2, icon: tv_lounge, title: "Gas", name: "gas" },
  { id: 3, icon: tv_lounge, title: "Water", name: "water" },
  { id: 4, icon: suigas, title: "Maintenance", name: "maintenance" },
  { id: 5, icon: tv_lounge, title: "Security", name: "security" },
  { id: 6, icon: tv_lounge, title: "Sewerage", name: "sewerage" },
];

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
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
}));

const FeatureInfo = () => {
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  let paramFromDetailListing = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const data = useSelector(getPropertyDetailForUpdate);
  // console.log("Feature Data: ", data.features);
  // console.log("Service Data: ", data.services);
  let { isLoading } = useSelector((state) => state.properties);

  const [propertyFeature, setPropertyFeature] = useState({
    tv_lounge: data?.features["tv_lounge"],
    store_room: data?.features["store_room"],
    laundry_room: data?.features["laundry_room"],
    kitchen: data?.features["kitchen"],
    balcony: data?.features["balcony"],
    garden: data?.features["garden"],
  });

  const [propertyService, setPropertyService] = useState({
    electricity: data?.services["electricity"],
    gas: data?.services["gas"],
    water: data?.services["water"],
    maintenance: data?.services["maintenance"],
    security: data?.services["security"],
    sewerage: data?.services["sewerage"],
  });

  const onChangeFeature = (feature) => {
    setPropertyFeature({
      ...propertyFeature,
      [feature]: !propertyFeature[feature],
    });
  };

  const onChangeService = (service) => {
    setPropertyService({
      ...propertyService,
      [service]: !propertyService[service],
    });
  };

  const updateFeatureService = async (values) => {
    const listingId = paramFromDetailListing.id;
    values = {
      features: { ...propertyFeature },
      services: { ...propertyService },
    };
    const val = { authToken: loggedInObject?.token, listingId, values };
    try {
      await axios
        .put(
          `${baseUrl}/users/property/${paramFromDetailListing.id}/`,
          values,
          {
            headers: {
              Authorization: `token ${loggedInObject?.token}`,
            },
          }
        )
        .then((response) => {
          if (response?.data?.status) {
            toast.success(
              JSON.stringify("Feature and Services details updated"),
              {
                position: toast.POSITION.BOTTOM_RIGHT,
                progressStyle: { backgroundColor: "#014493" },
              }
            );
          } else {
            toast.error(JSON.stringify(response?.data?.message), {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return message;
    }
    dispatch(postAsyncUpdatePropertyDetail(val));
  };

  useEffect(() => {
    dispatch(fetchAsyncGetPropertyDetail(paramFromDetailListing.id));
    setPropertyFeature(data?.features);
    setPropertyService(data?.services);
  }, []);

  if (isLoading === true) {
    return <Loader />;
  }

  return (
    <Container fullwidth="true">
      <Formik
        initialValues={{
          features: propertyFeature,
          services: propertyService,
        }}
        onSubmit={() => {
          updateFeatureService();
        }}
      >
        {({}) => (
          <Form>
            <Paper
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                margin: "5% 0% 0% 0%",
              }}
            >
              <Typography component="h2" sx={{ fontWeight: "bold", color: "rgb(19, 70, 150)" }}>
                Features:
              </Typography>
              <Box
                sx={{
                  p: 2,
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                {featuresArray.map((item) => {
                  return (
                    <Chip
                      key={item?.id}
                      label={item?.title}
                      clickable
                      style={{
                        backgroundColor:
                          propertyFeature[item?.name] === true
                            ? "#014493"
                            : "#fff",
                        color:
                          propertyFeature[item?.name] === true
                            ? "#fff"
                            : "#000",
                      }}
                      variant={
                        propertyFeature[item?.name] === true
                          ? "filled"
                          : "outlined"
                      }
                      onClick={(e) => {
                        onChangeFeature(item?.name);
                      }}
                      onChange={(e) => {
                        onChangeFeature(item?.name);
                      }}
                    />
                  );
                })}
              </Box>
            </Paper>

            <Paper
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                margin: "5% 0% 0% 0%",
              }}
            >
              <Typography component="h2" sx={{ fontWeight: "bold", color: "rgb(19, 70, 150)" }}>
                Services:
              </Typography>
              <Box
                sx={{
                  p: 2,
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                {servicesArray.map((item) => {
                  return (
                    <Chip
                      key={item?.id}
                      label={item?.title}
                      clickable
                      style={{
                        backgroundColor:
                          propertyService[item?.name] === true
                            ? "#014493"
                            : "#fff",
                        color:
                          propertyService[item?.name] === true
                            ? "#fff"
                            : "#000",
                      }}
                      variant={
                        propertyService[item?.name] === true
                          ? "filled"
                          : "outlined"
                      }
                      onClick={(e) => {
                        onChangeService(item?.name);
                      }}
                      onChange={(e) => {
                        onChangeService(item?.name);
                      }}
                    />
                  );
                })}
              </Box>
            </Paper>

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
    </Container>
  );
};

export default FeatureInfo;
