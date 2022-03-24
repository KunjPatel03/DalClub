import { styled } from '@mui/system';
import { useState } from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { StateContext } from '../../../State';
import { useContext } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const Container = styled('div')({
  flex: 1,
  padding: '0px 50px',
  marginRight: '20px',
});

const Title = styled('h1')({
  fontWeight: 700,
});

const Price = styled('h1')({
  fontWeight: 500,
});

const Description = styled('p')({
  margin: '20px 0px',
  fontWeight: '300',
  fontSize: '16px',
});

const FilterContainer = styled('div')({
  width: '100%',
  margin: '30px 0px',
  display: 'flex',
});

const Filter = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Color = styled('div')((props) => ({
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: props.color,
  margin: '10px',
  cursor: 'pointer',
  border: '1px solid black',
}));

const Select = styled('select')({
  margin: '10px',
  padding: '10px',
  border: 'none',
  fontSize: '16px',
});

const Option = styled('option')({});

const AddContainer = styled('div')({
  width: '100%',
  display: 'flex',
});

const AmountContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  fontWeight: 700,
});

const Amount = styled('span')({
  width: '50px',
  height: '50px',
  borderRadius: '30%',
  border: '1px solid #437FC7',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0px 5px',
});

const Button = styled('button')((props) => ({
  backgroundColor: !props.disabled ? '#437FC7' : 'white',
  color: !props.disabled ? 'white' : 'black',
  height: '50px',
  width: '50px',
  border: 'none',
  borderRadius: '4px',
  fontWeight: 700,
  margin: '20px',
  cursor: 'pointer',
}));

const ProductDescription = ({ product, setOpen, setMessage, setIndex }) => {
  const [quantity, setQuantity] = useState(0);
  const [color, setColor] = useState(0);
  const [size, setSize] = useState('');
  const { cartList, setCartList } = useContext(StateContext);
  const [disabled, setDisabled] = useState(false);
  const [text, setText] = useState('ADD TO CART');

  const handleAddToCart = () => {
    if (size !== '' && quantity !== 0) {
      const cartProduct = {
        product_id: product.product_id,
        product_name: product.product_name,
        product_image: product.product_color[color].product_image,
        product_color: product.product_color[color].product_color,
        product_size: size,
        product_quantity: quantity,
        product_price: product.product_price,
        product_subtotal: product.product_price * quantity,
      };
      setCartList([...cartList, cartProduct]);
      setDisabled(true);
      setText('ADDED TO CART');
      setMessage('Product Added to Cart');
      setOpen(true);
    } else {
      setMessage('Please Select Size and Quantity');
      setOpen(true);
    }
  };

  return (
    <Container>
      <Title>{product.product_name}</Title>
      <Price>{product.product_price} CAD </Price>
      <Description>{product.product_description}</Description>
      <FilterContainer>
        <Filter>
          Colors{' '}
          {product.product_color.map((item, i) => {
            return (
              <Color
                key={item.product_color_id}
                color={item.product_color}
                onClick={() => {
                  setColor(i);
                  setIndex(i);
                }}
              />
            );
          })}
        </Filter>
        <Filter>
          <Select
            defaultValue={'DEFAULT'}
            onChange={(e) => setSize(e.target.value)}
          >
            <Option value='DEFAULT' disabled>
              Size
            </Option>
            {product.product_size.map((item) => {
              return (
                <Option key={item.product_size_id}>{item.product_size}</Option>
              );
            })}
          </Select>
          {/* <TextField
            select
            value={size}
            label='Size'
            sx={{ width: '20vh' }}
            onChange={(e) => setSize(e.target.value)}
          >
            {product.product_size.map((item) => {
              return (
                <MenuItem key={item.product_size_id}>
                  {item.product_size}
                </MenuItem>
              );
            })}
          </TextField> */}
        </Filter>
      </FilterContainer>
      <AddContainer>
        <AmountContainer>
          <RemoveOutlinedIcon
            onClick={() => {
              if (quantity > 0) {
                setQuantity(quantity - 1);
              }
            }}
          />
          <Amount>{quantity}</Amount>
          <AddOutlinedIcon onClick={() => setQuantity(quantity + 1)} />
        </AmountContainer>
        <Button
          disabled={disabled}
          style={{ width: '20vh' }}
          onClick={handleAddToCart}
        >
          {text}
        </Button>
      </AddContainer>
    </Container>
  );
};

export default ProductDescription;
