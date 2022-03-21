import React from "react";
import { Box } from "@mui/material";
import Slider from "react-slick";

const NextArrow = (props) => {
  const { style, onClick } = props;
  return (
    <Box
      color={"secondary.main"}
      className="homepage-slick-arrow"
      style={{ ...style, right: 30, fontSize: "1.2rem" }}
      onClick={onClick}
    >
      &#10230;
    </Box>
  );
};

const PrevArrow = (props) => {
  const { style, onClick } = props;
  return (
    <Box
      color={"secondary.main"}
      className="homepage-slick-arrow"
      style={{ ...style, left: 30, fontSize: "1.2rem" }}
      onClick={onClick}
    >
      &#10229;
    </Box>
  );
};

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const BannerCarousel = () => {
  return (
    <Box>
      <Slider style={{ height: "50vh" }} {...settings}>
        {[0, 1, 2, 3].map((ele) => (
          <Box sx={{ "& img": { height: "50vh", width: "100%" } }} key={ele}>
          <img
            src={`https://via.placeholder.com/700x250?text=Text`}
            alt="Part"
            />
            </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default BannerCarousel;
