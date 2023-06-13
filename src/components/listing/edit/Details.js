import React from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import {
    setListingToEdit,
    setListingUpdateInfo,
  } from "../../../features/listingsSlice";
import { Grid } from "@mui/material";
import InputField from "./InputField";
import SelectInput from "./SelectInput";
import Counter from "./Counter";
import { CURRENCY_ENUM, LISTING_UNIT_FILTERS } from "../../constants/propertyConstants";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    margin: "10px 3px",
  },
  title: {
    fontSize: 24,
    fontFamily: "heavy",
    textTransform: "uppercase",
  },
  "@media (max-width: 500px)": {
    title: {
      fontSize: 28,
    },
  },
}));
const Details = ({ validation, setValidation }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { listingToEdit, listingUpdateInfo } = useSelector(
    (state) => state.listings
  );
  const darkMode = false
//   const { darkMode } = useSelector((state) => state.global);

 const validateInputs = (prop, value) => {
    switch (prop) {
      case 'title':
        if (value?.length < 10 || value?.length > 100)
          return 'Title must be between 10 - 100 characters';
        else return null;
  
      case 'description':
        if (value?.length < 100)
          return 'description must be at least 100 characters';
        else return null;
  
      case 'size':
        if (parseInt(value) <= 0 || parseInt(value) >= 10000)
          return 'Size must be between 0 - 10000';
        else return null;
  
      case 'price':
        if (parseInt(value) <= 0) {
          return 'Price must be greater than 0';
        } else return null;
      default:
        return null;
    }
  };

  const handleChange = (prop) => (event) => {
    dispatch(
      setListingToEdit({ ...listingToEdit, [prop]: event.target.value })
    );
    setValidation((prev) => ({
      ...prev,
      [`${prop}Validation`]: validateInputs(prop, event.target.value),
    }));
    dispatch(
      setListingUpdateInfo({
        ...listingUpdateInfo,
        [prop]: event.target.value,
      })
    );
  };
  const handleCounter = (prop) => (value) => {
    dispatch(setListingToEdit({ ...listingToEdit, [prop]: parseInt(value) }));
    dispatch(
      setListingUpdateInfo({ ...listingUpdateInfo, [prop]: parseInt(value) })
    );
  };
  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      <span
        className={classes.title}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        Details
      </span>

      <Grid container sx={{ mt: 2 }} columnSpacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <InputField
            placeholder="Property Title"
            value={listingToEdit?.title}
            onChange={handleChange("title")}
            type="text"
            label="Title"
            validating={validation.titleValidation}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SelectInput
            placeholder="Property Price"
            step="0.01"
            value={listingToEdit?.price}
            onChangeInput={handleChange("price")}
            onChangeSelect={handleChange("currency")}
            label="Price"
            options={CURRENCY_ENUM}
            validating={validation.priceValidation}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SelectInput
            placeholder="Size Number"
            step="0.01"
            value={listingToEdit?.size}
            onChangeInput={handleChange("size")}
            onChangeSelect={handleChange("unit")}
            label="Property Size"
            options={LISTING_UNIT_FILTERS}
            selectedOption={listingToEdit?.unit}
            min={1}
            validating={validation.sizeValidation}
          />
        </Grid>
      </Grid>
      <InputField
        placeholder="Description"
        value={listingToEdit?.description}
        onChange={handleChange("description")}
        type="area"
        label="Description"
        validating={validation.descriptionValidation}
      />
      <Grid container sx={{ mt: 1 }} columnSpacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Counter
            value={listingToEdit?.bedrooms || 0}
            onChange={handleCounter("bedrooms")}
            label="Bedrooms"
            customStyle={{ justifyContent: "flex-start" }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Counter
            value={listingToEdit?.bathrooms || 0}
            onChange={handleCounter("bathrooms")}
            label="Bathrooms"
            customStyle={{ justifyContent: "flex-start" }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Counter
            value={listingToEdit?.cars_parking || 0}
            onChange={handleCounter("cars_parking")}
            label="Car Parkings"
            customStyle={{ justifyContent: "flex-start" }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Details;
