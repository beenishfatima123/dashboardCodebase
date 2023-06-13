import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import {
  setAuctionToEdit,
  setAuctionUpdateInfo,
} from "../../../features/auctionSlice";
import { validateAuctionInputs } from "../../constants/helperFunctions";
import {
  CURRENCY_ENUM,
  LISTING_UNIT_FILTERS,
} from "../../constants/propertyConstants";
import InputField from "../../listing/edit/InputField";
import Counter from "../../listing/edit/Counter";
import SelectInput from "../../listing/edit/SelectInput";
import AutocompleteInput from "../../listing/edit/AutocompleteInput";

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
const Information = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [location, setLocation] = useState();

  const { auctionToEdit, auctionUpdateInfo } = useSelector(
    (state) => state.auctions
  );
  const darkMode = false;

  useEffect(() => {
    if (location)
      dispatch(setAuctionUpdateInfo({ ...auctionUpdateInfo, ...location }));
    // eslint-disable-next-line
  }, [location]);

  const handleChange = (prop, data) => (event) => {
    dispatch(setAuctionToEdit({ ...data, [prop]: event.target.value }));
    dispatch(
      setAuctionUpdateInfo({ 
        ...auctionUpdateInfo, 
        [prop]: event.target.value,
        [`${prop}Validation`]: validateAuctionInputs(prop, event.target.value),
    })
    );
  };
  const handleCounter = (prop) => (value) => {
    dispatch(setAuctionToEdit({ ...auctionToEdit, [prop]: parseInt(value) }));
    dispatch(
      setAuctionUpdateInfo({ 
        ...auctionUpdateInfo, 
        [prop]: parseInt(value),
        [`${prop}Validation`]: validateAuctionInputs(prop, value),
     })
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
        Information
      </span>

      <Grid container sx={{ mt: 2 }} columnSpacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <AutocompleteInput
            placeholder="Area"
            defaultValue={auctionToEdit?.area}
            onPlaceSelected={(event) =>
              setLocation((prev) => ({
                ...prev,
                area: event?.name,
              }))
            }
            label={"Society/Area"}
            options={{
              types: ["address"],
              fields: ["name"],
            }}
            customStyle={{
              color: darkMode ? "#fff" : "#134696",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AutocompleteInput
            placeholder={"City"}
            defaultValue={auctionToEdit?.city}
            onPlaceSelected={(event) =>
              setLocation((prev) => ({
                ...prev,
                city: event?.name,
              }))
            }
            label={"City"}
            options={{
              types: ["(cities)"],
              fields: ["name"],
            }}
            customStyle={{
              color: darkMode ? "#fff" : "#134696",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AutocompleteInput
            placeholder={"Country"}
            defaultValue={auctionToEdit?.country}
            label={"Country"}
            onPlaceSelected={(event) =>
              setLocation((prev) => ({
                ...prev,
                country: event?.name,
              }))
            }
            options={{
              types: ["country"],
              fields: ["name"],
            }}
            customStyle={{
              color: darkMode ? "#fff" : "#134696",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SelectInput
            placeholder={"Size Number"}
            value={auctionToEdit?.size}
            onChangeInput={handleChange("size", auctionToEdit)}
            onChangeSelect={handleChange("unit", auctionToEdit)}
            label={"Property Size"}
            options={LISTING_UNIT_FILTERS}
            min={1}
            validating={auctionUpdateInfo?.sizeValidation}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SelectInput
            placeholder={"Property Price"}
            value={auctionToEdit?.price}
            onChangeInput={handleChange("price", auctionToEdit)}
            onChangeSelect={handleChange("currency", auctionToEdit)}
            label={"Price"}
            options={CURRENCY_ENUM}
            validating={auctionUpdateInfo?.priceValidation}
          />
        </Grid>
      </Grid>

      {auctionToEdit?.auction_type === "sub_unit" && (
        <>
          <InputField
            placeholder={"Percentage of Shares"}
            value={auctionToEdit?.sub_unit_share_percentage}
            onChange={handleChange("sub_unit_share_percentage", auctionToEdit)}
            type="number"
            label={"Percentage of Shares to be sold"}
            validating={auctionUpdateInfo?.sub_unit_share_percentageValidation}
          />
          <Counter
            value={auctionToEdit?.totalBidders || 0}
            onChange={handleCounter("totalBidders")}
            label={"No. of Bidders to hold shares"}
            validating={auctionUpdateInfo?.totalBiddersValidation}
          />
        </>
      )}
      {auctionToEdit?.auction_type === "bulk" && (
        <Counter
          value={auctionToEdit?.total_files || 0}
          onChange={handleCounter("total_files")}
          label={"No. of files"}
          validating={auctionUpdateInfo?.total_filesValidation}
        />
      )}
    </div>
  );
};

export default Information;
