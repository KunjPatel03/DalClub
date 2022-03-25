import { useState } from "react"
import { Box, Grid, Typography, Menu, MenuItem } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const Header = () => {
  const [eventElement, setEventElement] = useState(null);

  const openEventMenu = (e) => setEventElement(e.currentTarget)
  const closeEventMenu = () => setEventElement(null)

  return (
    <Box position={"relative"}>
    <Grid position={"sticky"} zIndex={5} top={0} container justifyContent={"space-between"} alignItems={"center"} bgcolor="primary.main" color={"white"}>
      <Box display={"flex"} py={2} px={3} alignItems="center">
        <Box fontSize={"1.5rem"} fontWeight={"medium"} className="cursor-pointer">
          <Link to={"/"}>DalClub</Link>
        </Box>
        <Grid container width={"fit-content"}>
          <Typography color={"white"} className="cursor-pointer" marginLeft={2}>Bookings</Typography>
          <Typography color={"white"} className="cursor-pointer" marginLeft={2} onClick={openEventMenu}>
            Events
          </Typography>
          <Typography color={"white"} className="cursor-pointer" marginLeft={2}>Merchandise</Typography>
          <Typography color={"white"} className="cursor-pointer" marginLeft={2}>About</Typography>
        </Grid>
      </Box>
      <Box py={2} px={3} className="cursor-pointer">Login</Box>
      <Menu anchorEl={eventElement} open={!!eventElement} onClose={closeEventMenu}>
        <MenuItem onClick={closeEventMenu}>
          <Link to="/events">Events</Link>
        </MenuItem>
        <MenuItem onClick={closeEventMenu}>
          <Link to="/registeredEvents">Registered Events</Link>
        </MenuItem>
      </Menu>
    </Grid>
    <Box><Outlet /></Box>
    </Box>
  );
};

export default Header;
