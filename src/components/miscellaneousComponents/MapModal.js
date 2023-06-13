import React from "react";
import { Modal } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { compose, withProps } from "recompose";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
} from "react-google-maps";
import {
  DEFAULT_HOME_ZOOM,
  GOOGLE_MAPS_URL,
  HOME_OPTIONS,
} from "../constants/mapConstants";
import marker from "../../assets/icons/marker1.png";

const useStyles = makeStyles(() => ({
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    border: "1px solid #fff",
    boxShadow: 24,
    borderRadius: 20,
    height: "420px",
    maxHeight: "90%",
    width: 500,
    maxWidth: "90%",
  },
  heading: {
    color: "#014493",
    textAlign: "center",
    fontSize: 14,
    fontWeight: 600,
  },

  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10,
    minWidth: 500,
  },
}));

const ComposedMap = compose(
  withProps({
    googleMapURL: GOOGLE_MAPS_URL,
    loadingElement: <div style={{ height: "100%" }} />,
    containerElement: <div style={{ height: "400px" }} />,
    mapElement: <div id="homeMap" style={{ height: "100%", margin: 10 }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    defaultZoom={DEFAULT_HOME_ZOOM}
    center={props.markerPosition}
    options={HOME_OPTIONS}
  >
    {/*Marker*/}
    <Marker icon={marker} position={props.markerPosition} />
  </GoogleMap>
));

const MapModal = ({ open, setOpen, position }) => {
  const classes = useStyles();

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className={classes.modal}>
        <ComposedMap markerPosition={position} />
      </div>
    </Modal>
  );
};

export default MapModal;
