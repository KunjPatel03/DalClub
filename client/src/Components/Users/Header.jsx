import { Box, Grid, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { StateContext } from '../../State';
import { useContext } from 'react';
import Footer from "./Footer";

const Header = () => {
  const { cartList } = useContext(StateContext);
  return (
    <Box position={"relative"}>
    <Grid position={"sticky"} zIndex={5} top={0} container justifyContent={"space-between"} alignItems={"center"} bgcolor="primary.main" color={"white"}>
      <Box display={"flex"} py={2} px={3} alignItems="center">
        <Box fontSize={"1.5rem"} fontWeight={"medium"} className="cursor-pointer">
          <Link to={"/"}>DalClub.</Link>
        </Box>
        <Grid container width={"fit-content"}>
          <Typography color={"white"} className="cursor-pointer" marginLeft={2}>Bookings</Typography>
          <Typography color={"white"} className="cursor-pointer" marginLeft={2}>
            <Link to={"/events"}>Events</Link>
          </Typography>
          <Typography color={"white"} className="cursor-pointer" marginLeft={2}><Link to={"/store/products"}>Merchandise Store</Link></Typography>
          <Typography color={"white"} className="cursor-pointer" marginLeft={2}> <Link to={"/careers"}>Careers</Link></Typography>
        </Grid>
      </Box>
      <Box py={2} px={3} className="cursor-pointer">
        <Grid container width={"fit-content"}>
        <Typography color={"white"} className="cursor-pointer" marginLeft={2}><Link to={"/store/orders"}>My Orders</Link></Typography>
          <Box color={"white"} className="cursor-pointer" marginLeft={2}>
            <Badge
              badgeContent={cartList.length ? cartList.length : '0'}
            >
              <Link to={"/store/cart"}><ShoppingCartOutlinedIcon /></Link>
            </Badge></Box>
          <Typography color={"white"} className="cursor-pointer" marginLeft={2}><LogoutIcon /></Typography>
        </Grid>
      </Box>
    </Grid>
    <Box><Outlet /></Box>
    <Footer />
    </Box>
  );
};

export default Header;
