import { Box, Grid, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const Header = () => {
  return (
    <Box>
    <Grid container justifyContent={"space-between"} alignItems={"center"}>
      <Box display={"flex"} py={2} px={3} alignItems="center">
        <Box fontSize={"1.5rem"} fontWeight={"medium"}>
          DalClub
        </Box>
        <Grid container width={"fit-content"}>
          <Typography marginLeft={2}>Bookings</Typography>
          <Typography marginLeft={2}>Events</Typography>
          <Typography marginLeft={2}>Merchandise</Typography>
          <Typography marginLeft={2}>About</Typography>
        </Grid>
      </Box>
      <Box py={2} px={3}>Login</Box>
    </Grid>
    <Box><Outlet /></Box>
    </Box>
  );
};

export default Header;
