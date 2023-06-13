import React from "react";
import Slider from "react-slick";

export default function ProjectSlickSlider({ data }) {
  var settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {data &&
        data.map((pic) => {
          return (
            <div style={{ width: "100%" }}>
              <img style={{ width: "95%", height: "300px" }} src={`https://api.zeerac.com/` + pic?.file} />
            </div>
          );
        })}
    </Slider>
  );
}
