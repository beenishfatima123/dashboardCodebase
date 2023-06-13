import React from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  setInvalidCategory,
  setPropertyData,
} from "../../../features/createPropertySlice";
import InputField from "../edit/InputField";
import SelectInput from "../edit/SelectInput";
import Counter from "../edit/Counter";
import {
  CURRENCY_ENUM,
  LISTING_UNIT_FILTERS,
} from "../../constants/propertyConstants";
import { validateInputs } from "../../../components/constants/helpers/propertyCreation";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: "20px 5%",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    margin: "10px 20px",
    maxWidth: "95%",
    // height:'calc(100vh - 33vh)',
    // overflow:'scroll'
  },
}));
const Details = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const inValidCategory = useSelector(
    (state) => state.createProperty.inValidCategory
  );
  const propertyData = useSelector(
    (state) => state.createProperty.propertyData
  );

  const handleChange = (prop) => (event) => {
    dispatch(setPropertyData({ ...propertyData, [prop]: event.target.value }));
    dispatch(
      setInvalidCategory({
        ...inValidCategory,
        details: {
          ...inValidCategory?.details,
          [prop]: validateInputs(prop, event.target.value),
        },
      })
    );
  };
  const handleCounter = (prop) => (value) => {
    dispatch(setPropertyData({ ...propertyData, [prop]: parseInt(value) }));
  };

  return (
    <div className={classes.container}>
      <InputField
        placeholder="Property Title"
        value={propertyData?.title}
        onChange={handleChange("title")}
        type="text"
        label="Title"
        validating={inValidCategory?.details?.title}
      />
      <SelectInput
        placeholder="Size Number"
        step="0.01"
        value={propertyData?.size}
        onChangeInput={handleChange("size")}
        onChangeSelect={handleChange("unit")}
        label="Property Size"
        options={LISTING_UNIT_FILTERS}
        min={1}
        validating={inValidCategory?.details?.size}
      />
      <SelectInput
        placeholder="Property Price"
        step="0.01"
        value={propertyData?.price}
        onChangeInput={handleChange("price")}
        onChangeSelect={handleChange("currency")}
        label="Price"
        options={CURRENCY_ENUM}
        validating={inValidCategory?.details?.price}
      />
      <InputField
        placeholder="Description"
        value={propertyData?.description}
        onChange={handleChange("description")}
        type="area"
        label="Description"
        validating={inValidCategory?.details?.description}
      />
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}>
        <Counter
            value={propertyData?.bedrooms || 0}
            onChange={handleCounter("bedrooms")}
            label="Bedrooms"
            />
        <Counter
            value={propertyData?.bathrooms || 0}
            onChange={handleCounter("bathrooms")}
            label="Bathrooms"
            />
        <Counter
            value={propertyData?.cars_parking || 0}
            onChange={handleCounter("cars_parking")}
            label="Car Parkings"
            />
        </div>
    </div>
  );
};

export default Details;
