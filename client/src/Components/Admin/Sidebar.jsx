import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import RedeemIcon from '@mui/icons-material/Redeem';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HailIcon from '@mui/icons-material/Hail';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { styled } from '@mui/system';

const SidebarContainer = styled('div')({
  flex: '2',
  height: 'calc(100vh - 50px)',
  backgroundColor: 'rgb(251, 251, 255)',
  position: 'sticky',
  top: '50px',
});
const SidebarWrapper = styled('div')({
  padding: '20px',
  color: '#555',
});

const SidebarMenu = styled('div')({
  marginBottom: '10px',
  fontSize: '1.2em',
});
const SidebarList = styled('ul')({
  listStyle: 'none',
  padding: '5px',
});
const SidebarListItem = styled('li')({
  padding: '5px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '10px',
  '&:hover': {
    backgroundColor: 'rgb(240, 240, 255)',
  },
  marginBottom: '3vh',
});

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarList>
            <SidebarListItem>
              <DashboardIcon sx={{ marginRight: '2vh' }} />
              Dashboard
            </SidebarListItem>
            <SidebarListItem>
              <PeopleIcon sx={{ marginRight: '2vh' }} />
              Users
            </SidebarListItem>
            <SidebarListItem>
              <EventIcon sx={{ marginRight: '2vh' }} />
              Events
            </SidebarListItem>
            <SidebarListItem>
              <RedeemIcon sx={{ marginRight: '2vh' }} />
              Membership Packages
            </SidebarListItem>
            <SidebarListItem>
              <InventoryIcon sx={{ marginRight: '2vh' }} />
              Merchandise Products
            </SidebarListItem>
            <SidebarListItem>
              <LocalShippingIcon sx={{ marginRight: '2vh' }} />
              Merchandise Orders
            </SidebarListItem>
            <SidebarListItem>
              <HailIcon sx={{ marginRight: '2vh' }} />
              Jobs
            </SidebarListItem>
            <SidebarListItem>
              <AssignmentIcon sx={{ marginRight: '2vh' }} />
              Blogs
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
