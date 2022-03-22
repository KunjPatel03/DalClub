import React from "react";
import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
import EventCard from "../Events/EventCard";

const NextArrow = (props) => {
  const { style, onClick } = props;
  return (
    <Box
      className="homepage-slick-arrow"
      color={"secondary.main"}
      style={{ ...style, right: "-30px", fontSize: "1.2rem" }}
      onClick={onClick}
    >
      &#10095;
    </Box>
  );
};

const PrevArrow = (props) => {
  const { style, onClick } = props;
  return (
    <Box
      className="homepage-slick-arrow"
      color={"secondary.main"}
      style={{ ...style, left: "-30px", fontSize: "1.2rem" }}
      onClick={onClick}
    >
      &#10094;
    </Box>
  );
};

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const EventCarousel = () => {
  return (
    <>
      <Typography
        textAlign={"center"}
        fontWeight="bold"
        variant="h6"
        color="primary.main"
      >
        Events to participate
      </Typography>
      <Slider {...settings}>
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </Slider>
    </>
  );
};

export default EventCarousel;
