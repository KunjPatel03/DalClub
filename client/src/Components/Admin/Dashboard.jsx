import React from 'react';
import { styled } from '@mui/system';
import { adminDashboardData } from './api';

const HomeContainer = styled('div')({
  flex: '8',
});

const FeaturedContainer = styled('div')({
  width: '100%',
  display: 'grid',
  gap: '1em',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
});
const FeaturedItem = styled('div')({
  flex: '1',
  margin: '0px 20px',
  padding: '30px',
  borderRadius: '10px',
  cursor: 'pointer',
  boxShadow: '0px 0px 15px -10px rgba(0, 0, 0, 0.75)',
});

const FeaturedTitle = styled('span')({
  fontSize: '20px',
});
const FeaturesStatsContainer = styled('div')({
  margin: '10px 0px',
  display: 'flex',
  alignItems: 'center',
  '.stats': {
    fontSize: '30px',
    fontWeight: '600',
  },
  '.statMessage': {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '20px',
  }
});

const Dashboard = () => {
  return (
    <HomeContainer>
      <FeaturedContainer>
        {adminDashboardData &&
          adminDashboardData.map((item, index) => (
            <FeaturedItem key={index}>
              <FeaturedTitle>{item.title}</FeaturedTitle>
              <FeaturesStatsContainer>
                <span className='stats'>{item.stats}</span>
                <span className='statMessage'>
                  {item.message}
                </span>
              </FeaturesStatsContainer>
            </FeaturedItem>
          ))}
      </FeaturedContainer>
    </HomeContainer>
  );
};

export default Dashboard;