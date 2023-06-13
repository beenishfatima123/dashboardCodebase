import React, { Suspense, lazy } from "react";
import { makeStyles } from "@mui/styles";
import "./editStyles.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import Loader from "../../../customComponents/Loader";
import { setListingToEdit, setListingUpdateInfo } from "../../../features/listingsSlice";
import { getAddressFromLat } from "../../../api/mapApiCalls";
import {
  getArea,
  getBlock,
  getCity,
  getCountry,
} from "../../constants/mapHelpers";
import { DEFAULT_CENTER } from "../../constants/mapConstants";

const PostMap = lazy(() =>
  import("../../../components/addNewProject/PostMap")
);

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
    marginBottom: 20,
  },

  "@media (max-width: 500px)": {
    title: {
      fontSize: 28,
    },
  },
}));
const Location = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const darkMode = false;
//   const { darkMode } = useSelector((state) => state.global);
  const { listingToEdit, listingUpdateInfo } = useSelector(
    (state) => state.listings
  );

  const mapPosition = useMemo(() => {
    if (listingToEdit?.lat && listingToEdit?.lng)
      return {
        lat: listingToEdit?.lat,
        lng: listingToEdit?.lng,
      };
    else return DEFAULT_CENTER;
  }, [listingToEdit]);
  const onMarkerDragEnd = async (event) => {
    const addressResponse = await getAddressFromLat(
      event?.latLng.lat(),
      event?.latLng.lng()
    );

    const addressArray = addressResponse?.results[0]?.address_components;
    setLoading(true);
    dispatch(
      setListingToEdit({
        ...listingToEdit,
        country: getCountry(addressArray),
        city: getCity(addressArray),
        area: getArea(addressArray),
        block: getBlock(addressArray),
        address: addressResponse?.results[0]?.formatted_address,
        lat: event?.latLng.lat(),
        lng: event?.latLng.lng(),
      })
    );
    dispatch(
      setListingUpdateInfo({
        ...listingUpdateInfo,
        country: getCountry(addressArray),
        city: getCity(addressArray),
        area: getArea(addressArray),
        block: getBlock(addressArray),
        address: addressResponse?.results[0]?.formatted_address,
        lat: event?.latLng.lat(),
        lng: event?.latLng.lng(),
      })
    );
    setLoading(false);
  };
  const onPlaceSelected = (place) => {
    let addressArray = place.address_components;
    setLoading(true);
    dispatch(
      setListingToEdit({
        ...listingToEdit,
        country: getCountry(addressArray),
        city: getCity(addressArray),
        area: getArea(addressArray),
        block: getBlock(addressArray),
        address: place?.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      })
    );
    dispatch(
      setListingUpdateInfo({
        ...listingUpdateInfo,
        country: getCountry(addressArray),
        city: getCity(addressArray),
        area: getArea(addressArray),
        block: getBlock(addressArray),
        address: place?.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      })
    );
    setLoading(false);
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
        Specify the location
      </span>
      <Suspense fallback={<Loader />}>
        <>
          {loading ? (
            <Loader />
          ) : (
            <PostMap
              onPlaceSelected={onPlaceSelected}
              onMarkerDragEnd={onMarkerDragEnd}
              mapPosition={mapPosition}
              editMode={true}
            />
          )}
        </>
      </Suspense>
    </div>
  );
};

export default Location;
