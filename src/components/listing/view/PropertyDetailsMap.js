import { useState, useMemo } from "react";
import { compose, withProps } from "recompose";
import { makeStyles } from "@mui/styles";
import mapMarkerSelected from "../../../assets/icons/marker1.png";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
} from "react-google-maps";
import {
  GOOGLE_MAPS_URL,
  HOME_OPTIONS,
} from "../../../components/constants/mapConstants";

const ComposedMap = compose(
  withProps({
    googleMapURL: GOOGLE_MAPS_URL,
    loadingElement: <div style={{ height: "100%" }} />,
    containerElement: <div style={{ height: "500px" }} />,
    mapElement: <div id="propertyDetailsMap" style={{ height: "100%" }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    defaultZoom={props.defaultZoom}
    center={props.center || { lat: 33, lng: 34 }}
    onClick={() => {
      props.setActiveMarker(null);
    }}
    options={props.options}
  >
    {props.addMyMarker && (
      <Marker icon={mapMarkerSelected} position={props.addMyMarker} />
    )}
  </GoogleMap>
));

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    position: "absolute",
    top: 80,
    right: 20,
  },
  chip: {
    backgroundColor: "#fff",
    width: 100,
    height: 30,
    borderRadius: 20,
    color: "#134696",
    fontSize: 14,
    fontFamily: "medium",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
    zIndex: 10,
    cursor: "pointer",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  },
}));

const PropertyDetailsMap = ({ property }) => {
  const classes = useStyles();
  const [activeMarker, setActiveMarker] = useState(null);
  const darkMode = false;

  const mapOptions = useMemo(() => {
    return HOME_OPTIONS;
  }, [darkMode]);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <div style={{ margin: "20px 5%", position: "relative" }}>
      <p
        style={{
          fontSize: 24,
          color: darkMode ? "#0ed864" : "#134696",
          fontFamily: "heavy",
        }}
      >
        Location:
      </p>
        <ComposedMap
          defaultZoom={15}
          center={{
            lat: property?.lat,
            lng: property?.lng,
          }}
          addMyMarker={{
            lat: parseFloat(property?.lat),
            lng: parseFloat(property?.lng),
          }}
          handleActiveMarker={handleActiveMarker}
          activeMarker={activeMarker}
          options={mapOptions}
          setActiveMarker={setActiveMarker}
        />
    </div>
  );
};

export default PropertyDetailsMap;
