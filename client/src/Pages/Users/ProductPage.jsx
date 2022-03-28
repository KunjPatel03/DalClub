import React from 'react';
import { styled } from '@mui/system';
import Caraousel from '../../Components/Users/Store/Caraousel';
import ProductDescription from '../../Components/Users/Store/ProductDescription';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import Banner from '../../Components/Users/Store/Banner';
import { useState, useEffect } from 'react';
import axios from '../../Assets/config/axiosConfig';

const Wrapper = styled('section')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2vh',
});

const Button = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  height: '5vh',
  width: '10vh',
  border: 'none',
  borderRadius: '4px',
  fontWeight: 500,
  margin: '5vh 2vh',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ProductPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [index, setIndex] = useState(0);
  const params = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/products/${params.id}`);
        if (response.status === 200) {
          setProduct(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchProduct();
  }, []);

  return (
    <React.Fragment>
      <Banner />
      <Button onClick={() => navigate(-1)}>
        <KeyboardBackspaceOutlinedIcon />
      </Button>
      {loading && <div>Loading</div>}
      {!loading && (
        <Wrapper>
          <Caraousel product={product} index={index} setIndex={setIndex} />
          <ProductDescription
            product={product}
            index={index}
            setIndex={setIndex}
          />
        </Wrapper>
      )}
    </React.Fragment>
  );
};

export default ProductPage;
