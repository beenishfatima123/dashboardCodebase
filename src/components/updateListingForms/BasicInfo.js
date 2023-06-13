import React, { useState, useEffect } from "react";
import { Container, Button, Grid } from "@mui/material";
import { useParams } from "react-router";
import { Formik, Form } from "formik";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncGetPropertyDetail,
  getPropertyDetailForUpdate,
} from "../../features/store/property/propertySlice";
import { baseUrl } from "./../constants/baseUrls";
import { toast } from "react-toastify";
import Loader from '../../customComponents/Loader';

const BasicInfo = () => {

  const dispatch = useDispatch();
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const data = useSelector(getPropertyDetailForUpdate);

  let paramFromDetailListing = useParams();
  const [image, setImage] = useState();

  const lang = useSelector((state) => state.language);
  let { isLoading } = useSelector(state => state.properties);

  const initialValue = {
    title: data?.title ? data?.title : '',
    type: data?.type ? data?.type : '',
    purpose: data?.purpose ? data?.purpose : '',
    categories: data?.categories ? data?.categories : '',
    currency: data?.currency ? data?.currency : '',
    price: data?.price ? data?.price : '',
    unit: data?.unit ? data?.unit : '',
    size: data?.size ? data?.size : '',
    description: data?.description ? data?.description : '',
    status: data?.is_active_listing ? data?.is_active_listing : '',
    bathrooms: data?.bathrooms ? data?.bathrooms : '',
    bedrooms: data?.bedrooms ? data?.bedrooms : '',
    cars_parking: data?.cars_parking ? data?.cars_parking : '',
  }

  const [purposeArray, setPurposeArray] = useState([]);
  const populatePurposeData = () => {
    return [
      {
        key: "rent",
        label: "Rent",
      },
      {
        key: "sell",
        label: "Sell",
      },
      {
        key: "lease",
        label: "Lease",
      }
    ];
  };

  const [typeArray, setTypeArray] = useState([]);
  const populateTypeData = (lang) => {
    return [
      {
        key: "Residence",
        label: "Residence",
      },
      {
        key: "Plot",
        label: "Plot",
      },
      {
        key: "Commercial",
        label: "Commercial",
      }
    ];
  };
  const [categoriesArray, setCategoriesArray] = useState([]);
  const populateCategoriesArrayData = (lang) => {
    return [
      {
        key: "house",
        label: "House",
      },
      {
        key: "Guest House",
        label: "Guest House",
      },
      {
        key: "Flat",
        label: "Flat",
      },
      {
        key: "Hotel Suites",
        label: "Hotel Suites",
      },
      {
        key: "Hostel",
        label: "Hostel",
      },
      {
        key: "Room",
        label: "Room",
      },
    ];
  };

  useEffect(() => {
    setPurposeArray(populatePurposeData(lang));
    setTypeArray(populateTypeData(lang));
    setCategoriesArray(populateCategoriesArrayData(lang));
  }, [lang]);

  useEffect(() => {
    dispatch(fetchAsyncGetPropertyDetail(paramFromDetailListing.id));
  }, []);

  if (isLoading === true) {
    return <Loader />;
  }

  return (
    <Container fullwidth="true">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "5% 10% 0% 10%" }}>
        <Formik
          initialValues={initialValue}
          enableReinitialize={true}
          onSubmit={async (values) => {
            let formdata = new FormData();
            formdata.append("purpose", values.purpose);
            formdata.append("type", values.type);
            formdata.append("categories", values.categories);
            formdata.append("title", values.title);
            formdata.append("size", values.size);
            formdata.append("unit", values.unit);
            formdata.append("price", values.price);
            formdata.append("currency", values.currency);
            formdata.append("description", values.description);
            formdata.append("bedrooms", values.bedrooms);
            formdata.append("bathrooms", values.bathrooms);
            formdata.append("cars_parking", values.cars_parking);
            try {
              await axios.put(`${baseUrl}/users/property/${paramFromDetailListing.id}/`, formdata, {
                headers: {
                  Authorization: `token ${loggedInObject?.token}`,
                },
              }).then((response) => {
                if (response?.data?.status) {
                  toast.success(JSON.stringify("Basic information updated"), {
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
          }}

        >
          {({ handleChange, handleBlur, values }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <div className="profileEditField">
                    <select
                      name="purpose"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={values?.purpose}
                    >
                      {purposeArray.map((element, index) => (
                        <option key={index} value={element?.key}
                          disabled={data?.purpose === element?.key ? true : false}
                        >
                          {element?.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="profileEditField">
                    <select
                      name="type"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.type}
                    >
                      {typeArray.map((element, index) => (
                        <option key={index} value={element?.key}
                          disabled={data?.type === element?.key ? true : false}
                        >
                          {element?.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="profileEditField">
                    <select
                      name="categories"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.categories}
                    >
                      {categoriesArray.map((element, index) => (
                        <option key={index} value={element?.key}
                          disabled={data?.categories === element?.key ? true : false}
                        >
                          {element?.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="profileEditField">
                    <label>Name</label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Property Name"
                      name="title"
                      defaultValue={data?.title}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="profileEditField">
                    <label>Property Size</label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="size"
                      defaultValue={data?.size}
                      type="number"
                      min={0}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="profileEditField">
                    <select
                      name="unit"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={values?.unit}
                    >
                      <option disabled={data?.unit === "Square Feet" ? true : false} value="Square Feet">Square Feet</option>
                      <option disabled={data?.unit === "Marla" ? true : false} value="Marla">Marla</option>
                      <option disabled={data?.unit === "Kanal" ? true : false} value="Kanal">Kanal</option>
                    </select>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="profileEditField">
                    <label>Property Price</label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="price"
                      label="Property Price"
                      type="number"
                      defaultValue={data?.price}
                      min={0}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="profileEditField">
                    <select
                      name="currency"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={values?.currency}
                    >
                      <option value="PKR">Pakistani Rupee</option>
                      <option value="TRY">Turkish Lira</option>
                      <option value="USD">US Dollar</option>
                    </select>
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <div className="profileEditField">
                    <label>Property Description</label>
                    <textarea
                      minrows={5}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="description"
                      defaultValue={data?.description}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="profileEditField">
                    <label>Bedrooms</label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="bedrooms"
                      defaultValue={data?.bedrooms}
                      type="number"
                      min={0}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="profileEditField">
                    <label>Bathrooms</label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="bathrooms"
                      defaultValue={data?.bathrooms}
                      type="number"
                      min={0}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="profileEditField">
                    <label>Car Parkings</label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="cars_parking"
                      defaultValue={data?.cars_parking}
                      type="number"
                      min={0}
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
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default BasicInfo;
