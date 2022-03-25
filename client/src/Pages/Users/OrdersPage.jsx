import React from 'react';
import { styled } from '@mui/system';
import Banner from '../../Components/Users/Store/Banner';
import KeyboardBackspaceOutlined from '@mui/icons-material/KeyboardBackspaceOutlined';
import { useNavigate } from 'react-router-dom';
import Orders from '../../Components/Users/Store/Orders';
import { useState, useEffect } from 'react';
import axios from "../../Assets/config/axiosConfig";

const Container = styled('section')({});

const Wrapper = styled('div')({
  padding: '20px',
});

const Title = styled('h1')({
  fontWeight: 500,
  textAlign: 'center',
  marginTop: '5vh',
});

const Button = styled('button')({
  backgroundColor: '#437FC7',
  color: 'white',
  height: '5vh',
  width: '10vh',
  border: 'none',
  borderRadius: '4px',
  fontWeight: 500,
  margin: '50px 20px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const OrdersPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    const fetchOrderList = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/orders?order_user_id=1`
        );
        if (response.status === 200) {
          console.log(response.data);
          setOrderList(response.data);
        }
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchOrderList();
  }, []);

  return (
    <Container>
      <Banner />
      <Wrapper>
        <Title>YOUR ORDERS</Title>
        <Button onClick={() => navigate(-1)}>
          <KeyboardBackspaceOutlined />
        </Button>
        {loading && <div>Loading</div>}
        {!loading && <Orders orderList={orderList} />}
      </Wrapper>
    </Container>
  );
};

export default OrdersPage;
