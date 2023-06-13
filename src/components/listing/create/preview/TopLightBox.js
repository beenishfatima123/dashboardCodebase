import React from "react";
import { makeStyles } from "@mui/styles";
// eslint-disable-next-line
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 5,
  },
  thumbnail: {
    display: "flex",
    flexDirection: "column",
    backgroundPosition: "center !important",
    backgroundRepeat: "no-repeat !important",
    backgroundSize: "cover !important",
    width: "100%",
    minHeight: 200,
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
      <div className={classes.thumbnail}>
        <img
          style={{width: "100%", height: "200px", backgroundColor: "grey"}}
          src={property?.images?.length > 0 ? URL.createObjectURL(property?.images[0]) : null}
        />
      </div>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {property?.images?.map((elem, index) => (
          <Grid
            item
            key={index}
            sx={{
              mt: 2,
              border: '1px solid #0ED864',
              cursor: 'pointer',
              transition: '0.5s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 1,
            }}
            onClick={() => setSelectedSlide(index)}
          >
              <img
                src={URL.createObjectURL(elem)}
                className={classes.selectors}
                alt=""
                style={{ backgroundColor: 'gray' }}
              />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TopLightbox;
