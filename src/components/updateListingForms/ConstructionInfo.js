import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router";
import { Formik, Form } from "formik";
import { Container, Button, Typography, Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncGetPropertyDetail,
  getPropertyDetailForUpdate,
  postAsyncUpdatePropertyDetail,
} from "../../features/store/property/propertySlice";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "./../constants/baseUrls";
import Loader from "../../customComponents/Loader";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const getYearList = () => {
  const year = new Date().getFullYear();
  return Array.from(new Array(70), (v, i) => (
    <option key={i} value={year - i}>
      {year - i}
    </option>
  ));
};

const CONSTRUCTION_DETAILS = [
  [
    {
      key: "heating",
      label: "Heating",
      options: ["no", "yes"],
    },
    {
      key: "cooling",
      label: "Cooling",
      options: ["no", "yes"],
    },
    {
      key: "furnished",
      label: "Furnished",
      options: ["no", "yes"],
    },
    {
      key: "flooring",
      label: "Flooring",
      options: ["Marble", "Tiles", "Chips", "Wooden"],
    },
    {
      key: "appliances",
      label: "Appliances",
      options: ["no", "yes"],
    },
  ],
  [
    {
      key: "pool",
      label: "Pool",
      options: ["no", "yes"],
    },
    {
      key: "lawn",
      label: "Lawn",
      options: ["no", "yes"],
    },
    {
      key: "garage",
      label: "Garage",
      options: ["no", "yes"],
    },
  ],
  [
    {
      key: "home_type",
      label: "Home type",
      options: ["Residential", "Commercial"],
    },
    {
      key: "property_subtype",
      label: "Property Subtype",
      options: ["Home", "Apartment"],
    },
  ],
  [
    {
      key: "materials",
      label: "Materials",
      options: ["Brick", "Cement"],
    },
  ],
  [
    {
      key: "property_condition",
      label: "Property Condition",
      options: ["Good", "Old", "Refurbished"],
    },
    {
      key: "new_construction",
      label: "New construction",
      options: ["no", "yes"],
    },
    {
      key: "year_built",
      label: "Year built",
      options: [getYearList()],
    },
  ],
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
}));

const ConstructionInfo = () => {
  // const loggedInObject = JSON.parse(localStorage.getItem("logged_in"));
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  let paramFromDetailListing = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const data = useSelector(getPropertyDetailForUpdate);
  let { isLoading } = useSelector((state) => state.properties);

  const [interiorFeature, setInteriorFeature] = useState({
    heating: data?.construction_details["heating"],
    cooling: data?.construction_details["cooling"],
    furnished: data?.construction_details["furnished"],
    flooring: data?.construction_details["flooring"],
    appliances: data?.construction_details["appliances"],
    pool: data?.construction_details["pool"],
    lawn: data?.construction_details["lawn"],
    garage: data?.construction_details["garage"],
    home_type: data?.construction_details["home_type"],
    property_subtype: data?.construction_details["property_subtype"],
    materials: data?.construction_details["materials"],
    property_condition: data?.construction_details["property_condition"],
    new_construction: data?.construction_details["new_construction"],
    year_built: data?.construction_details["year_built"],
  });

  const onChangeInterior = (event, feature) => {
    setInteriorFeature({
      ...interiorFeature,
      [feature]: event.target.value,
    });
  };

  const updateConstructionDetails = async () => {
    const listingId = paramFromDetailListing.id;
    const values = {
      construction_details: { ...interiorFeature },
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
            toast.success(JSON.stringify("Construction details updated"), {
              position: toast.POSITION.BOTTOM_RIGHT,
              progressStyle: { backgroundColor: "#014493" },
            });
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
    setInteriorFeature(data?.construction_details);
  }, []);

  if (isLoading === true) {
    return <Loader />;
  }

  return (
    <Formik
      initialValues={{
        features: interiorFeature,
      }}
      onSubmit={() => {
        updateConstructionDetails();
      }}
    >
      {({}) => (
        <Form>
          <Grid
            key="topGrid"
            container
            justifyContent="flex-start"
            spacing={2}
            sx={{ my: 2 }}
          >
            <Grid key="gridInterior" item xs={10} sm={10} md={6} lg={6} xl={6}>
              <Typography sx={{ color: "green" }}>Interior details</Typography>
              <Box>
                {CONSTRUCTION_DETAILS[0].map((item, index) => (
                  <Grid
                    key={`int${index}`}
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    sx={{ my: 1.5 }}
                  >
                    <Grid item xs={4}>
                      <Typography sx={{ color: "#707070" }}>
                        {item.label}
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <select
                        id={item?.key}
                        onChange={(e) => {
                          onChangeInterior(e, item.key);
                        }}
                        value={interiorFeature[item?.key]}
                      >
                        {item?.options?.map((itemOp, index) => (
                          <option key={index} value={itemOp?.id}>
                            {itemOp}
                          </option>
                        ))}
                      </select>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </Grid>
            <Grid key="gridExterior" item xs={8} sm={8} md={6} lg={6} xl={6}>
              <Typography sx={{ color: "green" }}>Exterior details</Typography>
              <Box sx={{ alignContent: "center" }}>
                {CONSTRUCTION_DETAILS[1].map((item, index) => (
                  <Grid
                    key={`ext${index}`}
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    sx={{ my: 1.5 }}
                  >
                    <Grid item xs={4}>
                      <Typography sx={{ color: "#707070" }}>
                        {item.label}
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <select
                        id={item?.key}
                        onChange={(e) => {
                          onChangeInterior(e, item.key);
                        }}
                        value={interiorFeature[item?.key]}
                      >
                        {item?.options?.map((itemOp, index) => (
                          <option key={index} value={itemOp?.id}>
                            {itemOp}
                          </option>
                        ))}
                      </select>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </Grid>
            <Grid key="gridType" item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Typography sx={{ color: "green" }}>Type & Styles</Typography>
              <Box sx={{ alignContent: "center" }}>
                {CONSTRUCTION_DETAILS[2].map((item, index) => (
                  <Grid
                    key={`typ${index}`}
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    sx={{ my: 1.5 }}
                  >
                    <Grid item xs={4}>
                      <Typography sx={{ color: "#707070" }}>
                        {item.label}
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <select
                        id={item?.key}
                        onChange={(e) => {
                          onChangeInterior(e, item.key);
                        }}
                        value={interiorFeature[item?.key]}
                      >
                        {item?.options?.map((itemOp, index) => (
                          <option key={index} value={itemOp?.id}>
                            {itemOp}
                          </option>
                        ))}
                      </select>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </Grid>
            <Grid key="gridMaterial" item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Typography sx={{ color: "green" }}>Material details</Typography>
              <Box sx={{ alignContent: "center" }}>
                {CONSTRUCTION_DETAILS[3].map((item, index) => (
                  <Grid
                    key={`mat${index}`}
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    sx={{ my: 1.5 }}
                  >
                    <Grid item xs={4}>
                      <Typography sx={{ color: "#707070" }}>
                        {item.label}
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <select
                        id={item?.key}
                        onChange={(e) => {
                          onChangeInterior(e, item.key);
                        }}
                        value={interiorFeature[item?.key]}
                      >
                        {item?.options?.map((itemOp, index) => (
                          <option key={index} value={itemOp?.id}>
                            {itemOp}
                          </option>
                        ))}
                      </select>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </Grid>
            <Grid key="gridCondition" item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Typography sx={{ color: "green" }}>Condition</Typography>
              <Box sx={{ alignContent: "center" }}>
                {CONSTRUCTION_DETAILS[4].map((item, index) => (
                  <Grid
                    key={`con${index}`}
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    sx={{ my: 1.5 }}
                  >
                    <Grid item xs={4}>
                      <Typography sx={{ color: "#707070" }}>
                        {item?.label}
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <select
                        id={item?.key}
                        onChange={(e) => {
                          onChangeInterior(e, item.key);
                        }}
                        value={interiorFeature[item?.key]}
                      >
                        {" "}
                        {item?.key === "year_built"
                          ? getYearList()
                          : item?.options?.map((itemOp, index) => (
                              <option key={index} value={itemOp?.id}>
                                {itemOp}
                              </option>
                            ))}
                      </select>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </Grid>
            <Grid key="gridUpdate" item xs={12} sm={12} md={12} lg={12} xl={12}>
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
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default ConstructionInfo;
