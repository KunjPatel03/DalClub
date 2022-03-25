import React from 'react';
import { styled } from '@mui/system';
import Caraousel from '../../Components/Users/Store/Caraousel';
import ProductDescription from '../../Components/Users/Store/ProductDescription';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import Banner from '../../Components/Users/Store/Banner';
import { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from '../../Assets/config/axiosConfig';

const Wrapper = styled('section')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2vh',
});

const Button = styled('button')({
  backgroundColor: '#437FC7',
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
});

const ProductPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [index, setIndex] = useState(0);
  const params = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/products/${params.id}`);
        if (response.status === 200) {
          setProduct(response.data);
        }
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchProduct();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleClose}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  );

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
            setOpen={setOpen}
            setMessage={setMessage}
            index={index}
            setIndex={setIndex}
          />
        </Wrapper>
      )}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </React.Fragment>
  );
};

export default ProductPage;
