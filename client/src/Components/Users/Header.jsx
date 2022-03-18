import { Box, Grid, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const Header = () => {
  return (
    <Box position={"relative"}>
    <Grid position={"sticky"} zIndex={5} top={0} container justifyContent={"space-between"} alignItems={"center"} bgcolor="primary.main" color={"white"}>
      <Box display={"flex"} py={2} px={3} alignItems="center">
        <Box fontSize={"1.5rem"} fontWeight={"medium"} className="cursor-pointer">
          DalClub
        </Box>
        <Grid container width={"fit-content"}>
          <Typography color={"white"} className="cursor-pointer" marginLeft={2}>Bookings</Typography>
          <Typography color={"white"} className="cursor-pointer" marginLeft={2}>
            <Link to={"/events"}>Events</Link>
          </Typography>
          <Typography color={"white"} className="cursor-pointer" marginLeft={2}>Merchandise</Typography>
          <Typography color={"white"} className="cursor-pointer" marginLeft={2}>About</Typography>
        </Grid>
      </Box>
      <Box py={2} px={3} className="cursor-pointer">Login</Box>
    </Grid>
    <Box><Outlet /></Box>
    </Box>
  );
};

export default Header;
