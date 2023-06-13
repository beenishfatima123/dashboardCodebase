import React from "react";
import Slider from "react-slick";
import PropertySliderCard from "./slider/PropertySliderCard";

const ListingSlider = ({ properties }) => {
  var settings = {
    dots: true,
    infinite: true,
    centerMode: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {properties &&
        properties.map((elem, index) => {
          return (
            <div key={index} style={{ backgroundColor: "green", width: "50%" }}>
              <PropertySliderCard key={index} property={elem} />
            </div>
          );
        })}
    </Slider>
  );
};

export default ListingSlider;
