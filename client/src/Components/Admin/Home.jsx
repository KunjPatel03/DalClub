import React from 'react';
import { styled } from '@mui/system';
import { featuredData } from './api';
import { ArrowUpward } from '@mui/icons-material';

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
const FeaturedMoneyContainer = styled('div')({
  margin: '10px 0px',
  display: 'flex',
  alignItems: 'center',
  '.featuredMoney': {
    fontSize: '30px',
    fontWeight: '600',
  },
  '.featuredMoneyRate': {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '20px',
  },
  '.featuredIcon': {
    fontSize: '14px',
    marginLeft: '5px',
    color: 'green',
  },
});
const FeaturedSub = styled('span')({
  fontSize: '15px',
  color: 'gray',
});

const Home = () => {
  return (
    <HomeContainer>
      <FeaturedContainer>
        {featuredData &&
          featuredData.map((item, index) => (
            <FeaturedItem key={index}>
              <FeaturedTitle>{item.title}</FeaturedTitle>
              <FeaturedMoneyContainer>
                <span className='featuredMoney'>{item.money}</span>
                <span className='featuredMoneyRate'>
                  {item.moneyRate} <ArrowUpward className='featuredIcon' />
                </span>
              </FeaturedMoneyContainer>
              <FeaturedSub>Compared to Previous month</FeaturedSub>
            </FeaturedItem>
          ))}
      </FeaturedContainer>
    </HomeContainer>
  );
};

export default Home;
