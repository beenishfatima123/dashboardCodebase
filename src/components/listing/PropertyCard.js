import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CardImageDetails from "../agency/view/slider/CardImageDetails";
import { baseUrl } from "../constants/baseUrls";
import { currencyFormatInitials } from "../constants/helperFunctions";
import "../../components/agency/view/slider/customSlider.css";
import IconsContainer from "../miscellaneousComponents/IconsContainer";
import { CircularProgress } from "@mui/material";
import { setListingVerificationDetail } from "../../features/listingsSlice";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 280,
    zIndex: 12000,
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    flex: 1,
    minHeight: 130,
  },
  btnContainer: {
    display: "flex",
    background: `linear-gradient(to top, rgba(0,0,0,0) 20%, rgba(0,0,0,1))`,
    width: "100%",
  },
  text: {
    color: "#1A2954",
    fontSize: 18,
    margin: 0,
  },
  title: {
    fontSize: 10,
    color: "#fff",
    marginRight: 5,
  },
  currencyText: {
    color: "#134696",
    fontSize: 27,
    margin: 0,
    borderBottom: "1px solid #707070",
  },
  iconsStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
  },
}));

const PropertyCard = ({ property, verificationID }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const darkMode = false;

  const {
    updateRequestApiInfo,
  } = useSelector((state) => state.verifications);

  const [selReqId, setSelReqId] = useState(null);

  // eslint-disable-next-line
  const getBackgroundImage = () => {
    let background = "";
    if (property?.image?.length)
      background = `linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,1)),url(${baseUrl}/${property?.image[0]?.image})`;
    else if (property?.floor_image?.length)
      background = `linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,1)),url(${baseUrl}/${property?.floor_image[0]?.floor_image})`;
    return background;
  };

  return (
    <div className={classes.container}>
      <div
        onClick={() => {
          dispatch(setListingVerificationDetail({isDirect: false, verificationID: verificationID}));
          history.push(`/listing/${property?.id}`)}}
        className="background-image"
        style={{
          backgroundImage: getBackgroundImage(),
          width: 280,
          height: 200,
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <div>
          <CardImageDetails property={property} />
        </div>
      </div>
      <div
        className={classes.bottomContainer}
        style={{
          width: 280,
          alignSelf: "center",
        }}
      >
        <div className={classes.contentContainer}>
          <p
            className={classes.text}
            style={{
              color: darkMode ? "#fff" : "#134696",
              fontFamily: "heavy",
              textTransform: "capitalize",
            }}
          >
            {`${parseInt(property?.size)} ${
              property?.unit === "Square Feet" ? "Sq ft" : property?.unit
            }, For ${property?.purpose}`}
          </p>
          <p
            className={classes.text}
            style={{
              color: darkMode ? "#fff" : "#134696",
            }}
          >
            {`${property?.area}, ${property?.city}`}
          </p>
          <p
            className={classes.currencyText}
            style={{
              color: darkMode ? "#0ed864" : "#134696",
              fontFamily: "heavy",
            }}
          >
            {`${currencyFormatInitials(property?.price, property?.currency)}`}{" "}
          </p>
          <p
            className={classes.text}
            style={{
              color: darkMode ? "#0ed864" : "#134696",
              fontSize: 14,
            }}
          >
            Listed By:{" "}
            <span
              style={{ fontFamily: "heavy", fontSize: 18, cursor: "pointer" }}
              onClick={() => history.push(`/agents/${property?.user?.id}`)}
            >
              {`${property?.user?.full_name || "Anonymous"}`}{" "}
            </span>
          </p>
        </div>
        {property?.verification_status === "in_progress" ? (
          selReqId === property?.id && updateRequestApiInfo?.loading ? (
            <CircularProgress
              size={25}
              sx={{
                color: "#134696",
              }}
            />
          ) : (
            <IconsContainer
              customStyle={classes.iconsStyle}
              requestActions={true}
              customColor={darkMode ? "#fff" : "#134696"}
              property={property}
              type={"property"}
              verificationID={verificationID}
              setSelId={setSelReqId}
            />
          )
        ) : null}
      </div>
    </div>
  );
};

export default PropertyCard;
