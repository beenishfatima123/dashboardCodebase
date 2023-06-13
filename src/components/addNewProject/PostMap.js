import { useEffect, useState } from "react";
import { compose, withProps } from "recompose";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
} from "react-google-maps";
import { useSelector } from "react-redux";
import Autocomplete from "react-google-autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  DEFAULT_CENTER,
  DEFAULT_HOME_ZOOM,
  GOOGLE_MAPS_URL,
  HOME_OPTIONS,
} from "../constants/mapConstants";
import marker from "../../assets/icons/marker1.png";

const ComposedMap = compose(
  withProps({
    googleMapURL: GOOGLE_MAPS_URL,
    loadingElement: <div style={{ height: "100%", borderRadius: 10 }} />,
    containerElement: (
      <div
        style={{
          height: "500px",
          borderRadius: 10,
          position: "relative",
        }}
      />
    ),
    mapElement: (
      <div
        id="postMap"
        style={{
          height: "100%",
          borderRadius: 10,
          marginTop: 60,
        }}
      />
    ),
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    google={props.google}
    defaultZoom={DEFAULT_HOME_ZOOM}
    center={props.mapPosition || DEFAULT_CENTER}
    options={props.options}
  >
    <Marker
      icon={marker}
      draggable={true}
      onDragEnd={props?.onMarkerDragEnd}
      position={props?.mapPosition || DEFAULT_CENTER}
    />
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: -70,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          border: "1px solid #b2b2c9",
          borderRadius: 10,
          width: "100%",
        }}
      >
        <LocationOnIcon style={{ color: "#134696", marginLeft: 10 }} />
        <Autocomplete
          className="creation-input"
          style={{
            color: "#134696",
            margin: "15px 0px",
          }}
          placeholder="Enter location/Address of the site"
          onChange={(e) => {
            e.preventDefault();
            props?.setAddress(e?.target?.value);
          }}
          onPlaceSelected={props.onPlaceSelected}
          options={{
            types: ["(regions)"],
            componentRestrictions: { country: "pk" },
          }}
          value={props?.address}
        />
      </div>
    </div>
  </GoogleMap>
));
const PostMap = ({
  mapPosition,
  onPlaceSelected,
  onMarkerDragEnd,
  locationFor,
  editMode,
}) => {
  const propertyData = useSelector(
    (state) => state.createProperty.propertyData
  );
  const { projectData, projectToEdit } = useSelector((state) => state.project);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!inputValue) {
      setInputValue("");
    }
  }, [inputValue]);

  useEffect(() => {
    setInputValue(
      locationFor === "listing"
        ? propertyData?.location?.address
        : locationFor === "project"
          ? projectData?.location?.address
          : projectToEdit?.address
    );
  }, [
    locationFor,
    projectData?.location?.address,
    projectToEdit?.address,
    propertyData?.location?.address,
  ]);

  return (
    <div>
      <ComposedMap
        mapPosition={mapPosition}
        onPlaceSelected={onPlaceSelected}
        onMarkerDragEnd={onMarkerDragEnd}
        options={HOME_OPTIONS}
        edit={editMode}
        address={inputValue}
        setAddress={setInputValue}
      />
    </div>
  );
};

export default PostMap;
