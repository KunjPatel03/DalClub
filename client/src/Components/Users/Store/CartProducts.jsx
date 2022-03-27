import React from 'react';
import { styled } from '@mui/system';

const CartContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
});

const ProductsContainer = styled('div')({
  border: '0.5px solid lightgray',
  borderBottomLeftRadius: '1em',
  borderBottomRightRadius: '1em',
  boxShadow: '0 0 6px hsl(210 14% 90%)',
});

const NoProductsContainer = styled('div')({
  border: '0.5px solid lightgray',
  borderRadius: '1em',
  boxShadow: '0 0 6px hsl(210 14% 90%)',
  height: '50vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '',
});

const Title = styled('h1')({
  fontSize: '48px',
  marginBottom: '20px',
});

const Product = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  boxShadow: '0 0 6px hsl(210 14% 90%)',
});

const LeftContainer = styled('div')({
  flex: 2,
  display: 'flex',
});

const Image = styled('img')({
  width: '20vh',
  height: '20vh',
  margin: '5vh',
});

const Details = styled('div')({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
});

const ProductDetail = styled('span')({
  textAlign: 'left',
});

const RightContainer = styled('div')({
  flex: 1,
  display: 'flex',
});

const Button = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  height: '5vh',
  width: '20vh',
  border: 'none',
  borderRadius: '4px',
  fontWeight: 700,
  cursor: 'pointer',
  alignSelf: 'center',
}));

const Color = styled('div')((props) => ({
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: props.color,
  margin: '10px',
  cursor: 'pointer',
  border: '1px solid black',
}));

const OrderDetails = styled('div')({
  padding: '8px',
  display: 'flex',
  justifyContent: 'space-evenly',
});

const OrderDetail = styled('span')({
  textAlign: 'left',
});

const OrderDetailContainer = styled('div')(({ theme }) => ({
  border: '0.5px solid lightgray',
  borderTopLeftRadius: '1em',
  borderTopRightRadius: '1em',
  boxShadow: '0 0 6px hsl(210 14% 90%)',
  backgroundColor: theme.palette.secondary.background,
  height: '5vh',
}));

const CartProducts = ({ cartList, setCartList, total }) => {
  const handleRemove = (index) => {
    const cart = [...cartList];
    cart.splice(index, 1);
    setCartList(cart);
  };

  return (
    <CartContainer>
      {cartList.length > 0 ? (
        <OrderDetailContainer>
          <OrderDetails>
            <OrderDetail>
              <b>Subtotal:</b> {total} CAD
            </OrderDetail>
            <OrderDetail>
              <b>Shipping:</b> 9.99 CAD
            </OrderDetail>
            <OrderDetail>
              <b>Shipping Discount:</b> 9.99 CAD
            </OrderDetail>
            <OrderDetail>
              <b>Total:</b> {total} CAD
            </OrderDetail>
          </OrderDetails>
        </OrderDetailContainer>
      ) : null}
      {cartList.length > 0 ? (
        <ProductsContainer>
          {cartList.map((item, i) => {
            return (
              <Product key={i}>
                <LeftContainer>
                  <Image src={item.product_image} />
                  <Details>
                    <ProductDetail>
                      <b>Product:</b> {item.product_name}
                    </ProductDetail>
                    <ProductDetail>
                      <b>ID:</b> {item.product_id}
                    </ProductDetail>
                    <ProductDetail
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <div>
                        <b>Color:</b>
                      </div>{' '}
                      <Color color={item.product_color} />
                    </ProductDetail>
                    <ProductDetail>
                      <b>Size:</b> {item.product_size}
                    </ProductDetail>
                  </Details>
                </LeftContainer>
                <RightContainer>
                  <Details>
                    <ProductDetail>
                      <b>Quantity:</b> {item.product_quantity}
                    </ProductDetail>
                    <ProductDetail>
                      <b>Price:</b> {item.product_price} CAD
                    </ProductDetail>
                    <ProductDetail>
                      <b>Subtotal:</b> {item.product_subtotal} CAD
                    </ProductDetail>
                    <Button
                      sx={{ marginTop: '2vh' }}
                      onClick={() => handleRemove(i)}
                    >
                      REMOVE
                    </Button>
                  </Details>
                </RightContainer>
              </Product>
            );
          })}
        </ProductsContainer>
      ) : null}
      {cartList.length === 0 ? (
        <NoProductsContainer>
          <Title>EMPTY CART</Title>
        </NoProductsContainer>
      ) : null}
    </CartContainer>
  );
};

export default CartProducts;
