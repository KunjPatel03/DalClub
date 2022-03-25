import { styled } from '@mui/system';

const Container = styled('section')({
  height: '30px',
  backgroundColor: '#437FC7',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  fontWeight: 400,
});

const Banner = () => {
  return <Container>Free Shipping on Orders Over $50</Container>;
};

export default Banner;
