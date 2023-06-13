import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import {
  setProjectToEdit,
  setProjectUpdateInfo,
} from "../../../features/projectSlice";
import PostMap from "../../addNewProject/PostMap";
import { DEFAULT_CENTER } from "../../constants/mapConstants";
import { getAddressFromLat } from "../../../api/mapApiCalls";
import {
  getArea,
  getBlock,
  getCity,
  getCountry,
} from "../../constants/mapHelpers";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    margin: "25px 74px",
  },
  title: {
    fontSize: 24,
    fontFamily: "medium",
  },
  label: {
    fontSize: 15,
    color: "#134696",
    fontFamily: "heavy",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#bbbbbb",
    margin: "20px 0px",
  },
  addNew: {
    color: "#1d396b",
    fontSize: 14,
    fontFamily: "medium",
    cursor: "pointer",
    margin: "auto",
  },
  counterContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
  let darkMode = false;

  const { projectToEdit, projectUpdateInfo } = useSelector(
    (state) => state.project
  );
  const [loading, setLoading] = useState(false);

  const mapPosition = useMemo(() => {
    if (projectToEdit?.lat && projectToEdit?.lng)
      return {
        lat: projectToEdit?.lat,
        lng: projectToEdit?.lng,
      };
    else return DEFAULT_CENTER;
  }, [projectToEdit]);
  const onMarkerDragEnd = async (event) => {
    const addressResponse = await getAddressFromLat(
      event?.latLng.lat(),
      event?.latLng.lng()
    );

    const addressArray = addressResponse?.results[0]?.address_components;
    setLoading(true);
    dispatch(
      setProjectToEdit({
        ...projectToEdit,
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
      setProjectUpdateInfo({
        ...projectUpdateInfo,
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
      setProjectToEdit({
        ...projectToEdit,
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
      setProjectUpdateInfo({
        ...projectUpdateInfo,
        country: getCountry(addressArray),
        city: getCity(addressArray),
        area: getArea(addressArray),
        block: getBlock(addressArray),
        address: addressArray?.formatted_address,
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
      <Grid
        style={{ marginTop: 5 }}
        item
        lg={12}
        md={12}
        xs={12}
        sx={{
          mt: 2,
          padding: 2,
          borderRadius: 2,
        }}
      >
        <Grid item sx={{ padding: "2px" }}>
          <PostMap
            onPlaceSelected={onPlaceSelected}
            onMarkerDragEnd={onMarkerDragEnd}
            mapPosition={mapPosition}
            locationFor="edit-project"
            editMode={false}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Location;
