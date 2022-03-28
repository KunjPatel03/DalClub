import React from 'react';
import { styled } from '@mui/system';
import Banner from '../../Components/Users/Store/Banner';
import KeyboardBackspaceOutlined from '@mui/icons-material/KeyboardBackspaceOutlined';
import { useNavigate } from 'react-router-dom';
import CartProducts from '../../Components/Users/Store/CartProducts';
import { StateContext } from '../../State';
import { useContext, useEffect, useState } from 'react';
import axios from '../../Assets/config/axiosConfig';
import { toast } from 'react-toastify';

const Container = styled('section')({});

const Wrapper = styled('div')({
  padding: '2vh',
});

const Title = styled('h1')({
  fontWeight: 500,
  textAlign: 'center',
  marginTop: '5vh',
});

const Button = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  height: '5vh',
  width: 'auto',
  minWidth: '10vh',
  border: 'none',
  borderRadius: '4px',
  fontWeight: 700,
  margin: '50px 20px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ButtonsContainer = styled('div')({
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const LeftContainer = styled('div')({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
});

const RightContainer = styled('div')({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
});

const Cart = () => {
  const navigate = useNavigate();
  const { cartList, setCartList } = useContext(StateContext);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let totalAmount = 0;
    cartList.forEach((product) => {
      totalAmount += product.product_subtotal;
    });
    setTotal(totalAmount);
    console.log(cartList);
  });

  const handleCheckout = () => {
    if (cartList.length !== 0) {
      const order_line = [];
      cartList.forEach((product) => {
        const line = {
          order_product_id: product.product_id,
          order_product_name: product.product_name,
          order_product_quantity: product.product_quantity,
          order_product_size: product.product_size,
          order_product_color: product.product_color,
          order_product_price: product.product_price,
          order_product_image: product.product_image,
        };
        order_line.push(line);
      });

      axios({
        method: 'post',
        url: '/orders/new',
        data: {
          order_user_id: 1,
          order_total: total,
          order_payment_id: 1,
          order_status: 'Created',
          order_line: order_line,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            setCartList([]);
            toast.error('Order Placed');
            setTimeout(() => {
              navigate('/store/orders');
            }, 1000);
          }
        })
        .catch((error) => {
          toast.error('Something went wrong');
        });
    } else {
      toast.error('Add Products to Place your Order');
    }
  };

  return (
    <Container>
      <Banner />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <ButtonsContainer>
          <LeftContainer>
            <Button onClick={() => navigate(-1)}>
              <KeyboardBackspaceOutlined />
            </Button>
          </LeftContainer>
          <RightContainer>
            <Button sx={{ padding: '0vh 5vh' }} onClick={handleCheckout}>
              PROCEED TO CHECKOUT
            </Button>
          </RightContainer>
        </ButtonsContainer>
        <CartProducts
          cartList={cartList}
          setCartList={setCartList}
          total={total}
        />
      </Wrapper>
    </Container>
  );
};

export default Cart;
