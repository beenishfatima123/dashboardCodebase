import React from "react";
import { makeStyles } from "@mui/styles";
// eslint-disable-next-line
import { baseUrl } from "../../constants/baseUrls";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    // paddingTop: 5,
  },
  thumbnail: {
    display: "flex",
    flexDirection: "column",
    backgroundPosition: "center !important",
    backgroundRepeat: "no-repeat !important",
    backgroundSize: "cover !important",
    width: "100%",
    minHeight: 400,
    transition: "0.5s",
  },
  selectors: {
    width: "95%",
    height: 125,
    objectFit: "cover",
  },
  dots: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    margin: "30px 10px",
  },
}));
const TopLightbox = ({ property }) => {
  const classes = useStyles();
  const history = useHistory();

  const [selectedSlide, setSelectedSlide] = useState(0);

  return (
    <div className={classes.container}>
      <div
        className={classes.thumbnail}
        style={{
          background:
            property?.image?.length > 0
              ? `url(${baseUrl}/${property?.image[selectedSlide]?.image})`
              : null,
          // backgroundColor: 'gray',
        }}
      >
        <div className={classes.topContainer}>
          <Button
            sx={{
              // background:
              //   "linear-gradient(90deg, rgba(14,216,100,1) 0%, rgba(255,255,255,1) 100%)",
              background:
                "linear-gradient(90deg, rgba(14,216,100,0.9) 0%, rgba(0,0,0,0) 100%)",
              textTransform: "none",
              color: "#134696",
              width: 150,
              ml: 3,
              mt: 2,
            }}
            startIcon={
              <KeyboardBackspaceSharpIcon
                style={{ color: "#134696", marginLeft: -30 }}
              />
            }
            onClick={() => history.goBack()}
          >
            Back
          </Button>
        </div>
      </div>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {property?.image?.map((elem, index) => (
          <Grid
            item
            key={index}
            sx={{
              mt: 2,
              border: selectedSlide === index ? "1px solid #0ED864" : "none",
              cursor: "pointer",
              transition: "0.5s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 1,
            }}
            onClick={() => setSelectedSlide(index)}
          >
            <img
              src={`${baseUrl}/${elem?.image}`}
              className={classes.selectors}
              alt=""
              style={{ backgroundColor: "gray" }}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TopLightbox;
