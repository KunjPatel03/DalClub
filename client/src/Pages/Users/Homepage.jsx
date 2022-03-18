import React from "react"
import { Box } from "@mui/material"
import BannerCarousel from "../../Components/Users/Homepage/BannerCarousel"
import EventCarousel from "../../Components/Users/Homepage/EventCarousel"
import InfoSection from "../../Components/Users/Homepage/InfoSection"

const Homepage = () => {
  return (
    <div>
      <BannerCarousel />
      <Box width={"70%"} margin="auto" my={"30px !important"}>
        <EventCarousel />
      </Box>
      <InfoSection isReverse />
      <InfoSection />
    </div>
  )
}

export default Homepage