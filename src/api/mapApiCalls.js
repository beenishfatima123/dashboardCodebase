import axios from "axios";
import { MAP_IDS } from "../components/constants/global";
import Geocode from "react-geocode";
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API);
Geocode.enableDebug();

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
});
let listingMap = null;
if (window?.google) {
  listingMap = new window.google.maps.Map(
    document.getElementById("listingMap"),
    {
      center: { lat: 31.582045, lng: 74.329376 },
      zoom: 9,
      mapTypeControl: false,
    }
  );
}
export const getBoundaryDetailsFromServer = async (
  city,
  setBoundary,
  setPosition,
  setLoadingResults
) => {
  try {
    setLoadingResults(true);
    const response = await api.get(`users/city-polygon/?city=${city}`);
    if (response?.data?.result?.geometry !== "") {
      let myObject = JSON.parse(response?.data?.result?.geometry);
      let objectCenter = parseInt(myObject.length / 2);
      myObject.map((item) => {
        item.lat = parseFloat(item.lat);
        item.lng = parseFloat(item.lng);
      });
      setBoundary(myObject);
      setPosition({
        lat: myObject[objectCenter]?.lat,
        lng: myObject[objectCenter]?.lng,
      });
      setLoadingResults(false);
    } else {
      setBoundary([]);
      if (city !== "") {
        await getLatFromAddress(
          typeof city === "string" ? city : "Lahore",
          setPosition,
          setLoadingResults
        );
      } else setLoadingResults(false);
    }
  } catch (error) {
    setLoadingResults(false);
    return false;
  }
};

export const fetchNearByPlaces = async (
  lat,
  lng,
  type,
  dataDetail,
  setData,
  setLoading
) => {
  if (dataDetail?.result?.lat !== undefined) {
    setLoading(true);
    const map = new window.google.maps.Map(
      document.getElementById("nearByMap"),
      {
        center: {
          lat: dataDetail?.result?.lat,
          lng: dataDetail?.result?.lng,
        },
        zoom: 15,
      }
    );
    var request = {
      location: {
        lat,
        lng,
      },
      radius: "500",
      type: [type],
    };
    const service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(request, (res, status) => {
      if (status === "OK") {
        setData(res);
        setLoading(false);
      } else {
        setLoading(false);
        setData([]);
      }
    });
  }
};

export const fetchAutoCompleteResults = async (
  input,
  setData,
  searchOption,
  country,
  dontRestrict
) => {
  try {
    //create service
    const service = new window.google.maps.places.AutocompleteService(
      listingMap
    );

    //perform request. limit results to Australia
    var request = {
      input,
      types: searchOption,
      componentRestrictions: dontRestrict ? {} : { country },
      fields: ["formatted_address"],
    };
    service.getPlacePredictions(request, (res, status) => {
      if (status === "OK") {
        setData(res);
      } else {
        setData([]);
      }
    });
  } catch (error) {
  }
};
const getLatFromAddress = async (
  address,
  setMapPosition,
  setLoadingResults
) => {
  try {
    const geocodeResponse = await Geocode.fromAddress(address);
    if (geocodeResponse) {
      setMapPosition({
        lat: geocodeResponse?.results?.[0]?.geometry?.location?.lat,
        lng: geocodeResponse?.results?.[0]?.geometry?.location?.lng,
      });
      setLoadingResults(false);
    } else setLoadingResults(false);
  } catch (error) {
    setLoadingResults(false);
  }
};

export const getAddressFromLat = async (lat, lng) => {
  try {
    const geocodeResponse = await Geocode.fromLatLng(lat, lng);
    if (geocodeResponse) {
      return geocodeResponse;
    } else return null;
  } catch (error) {
  }
};
