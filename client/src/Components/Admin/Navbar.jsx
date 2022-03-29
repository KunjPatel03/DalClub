// @Author: Rahul Kherajani
import React from 'react';
import { styled } from '@mui/system';

const NavbarContainer = styled('div')({
  width: '100%',
  height: '50px',
  backgroundColor: '#fff',
  position: 'sticky',
  top: '0',
  zIndex: '999',
});

const NavbarWrapper = styled('div')({
  height: '100%',
  padding: '0px 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const Logo = styled('h1')({
  fontSize: '48px',
  fontWeight: 700,
  margin: '25px',
});

const TopLeft = styled('div')({});
const TopRight = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const MenuItem = styled('div')({
  fontSize: '16px',
  cursor: 'pointer',
  margin: '25px',
});

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavbarWrapper>
        <TopLeft>
          <Logo>DALClub</Logo>
        </TopLeft>
        <TopRight>
          <MenuItem>User</MenuItem>
          <MenuItem>Logout</MenuItem>
        </TopRight>
      </NavbarWrapper>
    </NavbarContainer>
  );
};

export default Navbar;
