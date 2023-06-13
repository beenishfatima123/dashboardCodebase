import React, { useRef } from "react";
import { makeStyles } from "@mui/styles";
import PropertySliderCard from "./PropertySliderCard";
import Carousel from "nuka-carousel";
import "./customSlider.css";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flex: 1,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px 0px",
    margin: "40px 0px",
    alignSelf: "center",
  },
}));
const SliderContainer = ({ properties }) => {
  const classes = useStyles();
  const sliderRef = useRef();
  const containerRef = useRef();
  const darkMode = false;



  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? "#303134" : "",

      }}
      ref={containerRef}
    >
      <Carousel
        innerRef={sliderRef}
        slidesToShow={1}
        cellSpacing={10}
        cellAlign="center"
        wrapAround={true}
        renderCenterLeftControls={null}
        renderCenterRightControls={null}
        defaultControlsConfig={{
          pagingDotsContainerClassName: "dots-container-custom",
          pagingDotsStyle: {
            fill: darkMode ? "#0ed864" : "#134696",
          },
        }}
      >
        {properties?.map((elem, index) => (
          <PropertySliderCard key={index} property={elem} />

        ))}
        {properties?.length === 0 ? (
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                color: "#134696",
                fontSize: 28,
                fontWeight: "bold",
              }}
            >
              Not found
            </p>
          </div>
        ) : null}
      </Carousel>
    </div>
  );
};

export default SliderContainer;
