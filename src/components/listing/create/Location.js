import React, { useState, Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import "../edit/creationStyles.css";
import { DEFAULT_CENTER } from "../../constants/mapConstants"
import {
  getArea,
  getBlock,
  getCity,
  getCountry,
} from "../../constants/mapHelpers";
import { getAddressFromLat } from "../../../api/mapApiCalls";
import { setPropertyData } from "../../../features/createPropertySlice";
import { useMemo } from "react";
import Loader from "../../../customComponents/Loader";
import PostMap from "../../addNewProject/PostMap";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 5%",
    // height:'calc(100vh - 33vh)',
    // overflow:'scroll'
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "15px 10px",
    border: "1px solid #b2b2c9",
    borderRadius: 10,
    minWidth: "80%",
    marginTop: 10,
  },
}));
const Location = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const propertyData = useSelector(
    (state) => state.createProperty.propertyData
  );
  const mapPosition = useMemo(() => {
    if (propertyData?.location)
      return {
        lat: propertyData?.location?.lat,
        lng: propertyData?.location?.lng,
      };
    else return DEFAULT_CENTER;
  }, [propertyData]);
  const onMarkerDragEnd = async (event) => {
    console.log("dragging")
    const addressResponse = await getAddressFromLat(
      event?.latLng.lat(),
      event?.latLng.lng()
    );

    const addressArray = addressResponse?.results[0]?.address_components;
    setLoading(true);
    dispatch(
      setPropertyData({
        ...propertyData,
        location: {
          country: getCountry(addressArray),
          city: getCity(addressArray),
          area: getArea(addressArray),
          block: getBlock(addressArray),
          address: addressResponse?.results[0]?.formatted_address,
          lat: event?.latLng.lat(),
          lng: event?.latLng.lng(),
        },
      })
    );
    setLoading(false);
  };

  const onPlaceSelected = (place) => {
    let addressArray = place.address_components;
    setLoading(true);
    dispatch(
      setPropertyData({
        ...propertyData,
        location: {
          country: getCountry(addressArray),
          city: getCity(addressArray),
          area: getArea(addressArray),
          block: getBlock(addressArray),
          address: place?.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
      })
    );
    setLoading(false);
  };

  return (
    <div className={classes.container}>
      <Suspense fallback={<Loader />}>
        <>
          {loading ? (
            <Loader />
          ) : (
            <PostMap
              onPlaceSelected={onPlaceSelected}
              onMarkerDragEnd={onMarkerDragEnd}
              mapPosition={mapPosition}
              locationFor="listing"
              editMode={false}
            />
          )}
        </>
      </Suspense>
    </div>
  );
};

export default Location;
