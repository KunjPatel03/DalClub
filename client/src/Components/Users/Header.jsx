import { useState } from 'react';
import { Box, Grid, Typography, Menu, MenuItem } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { StateContext } from '../../State';
import { useContext } from 'react';
import Footer from './Footer';

const Header = () => {
  const [eventElement, setEventElement] = useState(null);

  const openEventMenu = (e) => setEventElement(e.currentTarget);
  const closeEventMenu = () => setEventElement(null);

  const { cartList } = useContext(StateContext);
  return (
    <Box position={'relative'}>
      <Grid
        position={'sticky'}
        zIndex={5}
        top={0}
        container
        justifyContent={'space-between'}
        alignItems={'center'}
        bgcolor='primary.main'
        color={'white'}
      >
        <Box display={'flex'} py={2} px={3} alignItems='center'>
          <Box
            fontSize={'1.5rem'}
            fontWeight={'medium'}
            className='cursor-pointer'
          >
            <Link to={'/'}>DalClub.</Link>
          </Box>
          <Grid container width={'fit-content'}>
            <Typography
              color={'white'}
              className='cursor-pointer'
              marginLeft={2}
            >
              Bookings
            </Typography>
            <Typography
              color={'white'}
              className='cursor-pointer'
              marginLeft={2}
              onClick={openEventMenu}
            >
              Events
            </Typography>
            <Typography
              color={'white'}
              className='cursor-pointer'
              marginLeft={2}
            >
              <Link to={'/store/products'}>Merchandise Store</Link>
            </Typography>
            <Typography
              color={'white'}
              className='cursor-pointer'
              marginLeft={2}
            >
              {' '}
              <Link to={'/careers'}>Careers</Link>
            </Typography>
          </Grid>
        </Box>
<<<<<<< HEAD
        <Box py={2} px={3} className='cursor-pointer'>
          <Grid container width={'fit-content'}>
            <Typography
              color={'white'}
              className='cursor-pointer'
              marginLeft={2}
            >
              <Link to={'/store/orders'}>My Orders</Link>
            </Typography>
            <Box color={'white'} className='cursor-pointer' marginLeft={2}>
              <Badge badgeContent={cartList.length ? cartList.length : '0'}>
                <Link to={'/store/cart'}>
                  <ShoppingCartOutlinedIcon />
                </Link>
              </Badge>
            </Box>
            <Typography
              color={'white'}
              className='cursor-pointer'
              marginLeft={2}
=======
        <Grid container width={"fit-content"}>
          <Typography color={"white"} className="cursor-pointer" marginLeft={2}>Bookings</Typography>
          <Typography color={"white"} className="cursor-pointer" marginLeft={2} onClick={openEventMenu}>
            Events
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
>>>>>>> 114401ed90d3008c9caff15f2aab933478e4cb93
            >
              <LogoutIcon />
            </Typography>
          </Grid>
        </Box>
      </Grid>
      <Menu
        anchorEl={eventElement}
        open={!!eventElement}
        onClose={closeEventMenu}
      >
        <Link to='/events'>
          <MenuItem onClick={closeEventMenu}>Events</MenuItem>
        </Link>
        <Link to='/registeredEvents'>
          <MenuItem onClick={closeEventMenu}>Registered Events</MenuItem>
        </Link>
      </Menu>
      <Box>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Header;
