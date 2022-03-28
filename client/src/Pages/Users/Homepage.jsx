// @Author: Kishan Thakkar
import React from "react"
import { Box } from "@mui/material"
import BannerCarousel from "../../Components/Users/Homepage/BannerCarousel"
import EventCarousel from "../../Components/Users/Homepage/EventCarousel"
import InfoSection from "../../Components/Users/Homepage/InfoSection"
import EventBanner from "../../Assets/images/home-event.jpg"

const Homepage = () => {
  return (
    <div>
      <BannerCarousel />
      <Box width={"70%"} margin="auto" my={"30px !important"}>
        <EventCarousel />
      </Box>
      <InfoSection isReverse image={EventBanner} title="Socialize with us" description={`
        Take a break from everyday life and socialize with people through club events.
        Participate in events like conference, concerts and game shows hosted by club.
      `} />
      <InfoSection image={EventBanner} title="Merchandise" description={`
        Get ready with club's merchandise products and be a part of community.
        Explore variety of products themed with your favourite club.
      `} />
    </div>
  )
}

export default Homepage