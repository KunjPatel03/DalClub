import { styled } from '@mui/system';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

const Container = styled('div')(({ theme }) => ({
  flex: 1,
  height: '90vh',
  display: 'flex',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: theme.palette.secondary.background,
  border: '0.5px solid gray',
  boxShadow: '0 0 6px hsl(210 14% 90%)',
  borderRadius: '10px',
}));

const ArrowButton = styled('div')((props) => ({
  width: '50px',
  height: '50px',
  backgroundColor: 'white',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: 0,
  bottom: 0,
  margin: 'auto',
  left: props.direction === 'left' && '10px',
  right: props.direction === 'right' && '10px',
  cursor: 'pointer',
  opacity: 1,
  zIndex: 2,
}));

const Wrapper = styled('div')((props) => ({
  display: 'flex',
  transition: 'all 0.9s ease',
  transform: `translateX(${props.index * -50}vw)`,
}));

const Slide = styled('div')({
  width: '50vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Image = styled('img')({
  maxHeight: '80%',
  maxWidth: '80%',
});

const Caraousel = ({ product, index, setIndex }) => {
  const handleClick = (direction) => {
    if (direction === 'left') {
      setIndex(index > 0 ? index - 1 : product.product_color.length - 1);
    } else {
      setIndex(index < product.product_color.length - 1 ? index + 1 : 0);
    }
  };

  return (
    <Container>
      <ArrowButton direction='left' onClick={() => handleClick('left')}>
        <ArrowCircleLeftOutlinedIcon />
      </ArrowButton>
      <Wrapper index={index}>
        {product.product_color.map((item) => (
          <Slide key={item.product_color_id}>
            <Image src={item.product_image} />
          </Slide>
        ))}
      </Wrapper>
      <ArrowButton direction='right' onClick={() => handleClick('right')}>
        <ArrowCircleRightOutlinedIcon />
      </ArrowButton>
    </Container>
  );
};

export default Caraousel;
