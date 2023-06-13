import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import NewsSliderCard from "./NewsSliderCard";
import "../../agency/view/slider/customSlider.css";
import ConfirmModal from "../../miscellaneousComponents/ConfirmModal";
import { deleteNews } from "../../../features/newsSlice";
import Loader from "../../../customComponents/Loader";

const NewsSlider = ({ news }) => {
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

  const history = useHistory();
  const dispatch = useDispatch();
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const { newsDetail, deleteNewsApiInfo } = useSelector((state) => state.news);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selItem, setSelItem] = useState(null);

  const removeNews = () => {
    setOpenConfirmModal(false);
    dispatch(
      deleteNews({
        authToken: loggedInObject?.token,
        newsID: selItem,
        opened: false,
      })
    );
  };

  useEffect(() => {
    if (deleteNewsApiInfo?.response) {
      setSelItem(null);
      if (deleteNewsApiInfo?.response?.newsID === newsDetail?.id)
        history.push("/news");
    }
    // eslint-disable-next-line
  }, [deleteNewsApiInfo]);

  return (
    <>
      {openConfirmModal && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          setSelItem={setSelItem}
          title="Are you sure you want to delete this news?"
          handleConfirm={removeNews}
        />
      )}
      <Slider {...settings}>
        {news &&
          news.map((elem, index) => {
            return (
              <div
                key={index}
                style={{ backgroundColor: "green", width: "50%" }}
              >
                {deleteNewsApiInfo?.delNotOpened && elem?.id === selItem ? (
                  <Loader
                    customContainerStyle={{ minHeight: "30vh" }}
                    customImageStyle={{ height: 200, width: 200 }}
                  />
                ) : (
                  <NewsSliderCard
                    key={index}
                    item={elem}
                    setOpenConfirmModal={setOpenConfirmModal}
                    selItem={selItem}
                    setSelItem={setSelItem}
                  />
                )}
              </div>
            );
          })}
      </Slider>
    </>
  );
};

export default NewsSlider;
