import React from "react";
import { useSelector } from "react-redux";
import { compose, withProps } from "recompose";
import mapMarkerSelected from "../../../assets/icons/marker1.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
} from "react-google-maps";
import { GOOGLE_MAPS_URL, HOME_OPTIONS } from "../../constants/mapConstants";

const Location = () => {
  const { projectDetails } = useSelector((state) => state.project);

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
      {props?.nearbyPlaces?.map((marker) => {
        return (
          <Marker
            key={"" + marker.place_id}
            position={{
              lat: parseFloat(marker?.geometry.location.lat()),
              lng: parseFloat(marker?.geometry.location.lng()),
            }}
            onMouseOver={() => {
              props.handleActiveMarker(marker.place_id);
            }}
          ></Marker>
        );
      })}
    </GoogleMap>
  ));

  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        Location:
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
        }}
      >
        <ComposedMap
          defaultZoom={12}
          center={{
            lat: projectDetails?.lat,
            lng: projectDetails?.lng,
          }}
          addMyMarker={{
            lat: parseFloat(projectDetails?.lat),
            lng: parseFloat(projectDetails?.lng),
          }}
          options={HOME_OPTIONS}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default Location;
