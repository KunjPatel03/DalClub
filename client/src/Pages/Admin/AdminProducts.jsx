import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axios from '../../Assets/config/axiosConfig';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { DeleteOutline } from '@material-ui/icons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProductsContainer = styled('div')({
  flex: '8',
  width: '100%',
  display: 'grid',
  gap: '1em',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
});

const List = styled('div')({
  width: '100%',
  flex: '4',
});

const ListItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const EditButton = styled('button')(({ theme }) => ({
  border: 'none',
  borderRadius: '10px',
  padding: '1vh 2vh',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  cursor: 'pointer',
  marginRight: '2vh',
}));

// const MyDeleteOutline = styled(DeleteOutline)({
//   color: 'red',
//   cursor: 'pointer',
// });

const ItemAddButton = styled('button')(({ theme }) => ({
  border: 'none',
  backgroundColor: theme.palette.primary.main,
  borderRadius: '5px',
  cursor: 'pointer',
  color: 'white',
  fontSize: '1em',
  textTransform: 'uppercase',
  width: 'auto',
  height: '5vh',
  marginRight: '1vw',
  padding: '1vh 2vh',
}));

const ItemTitleContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/products/all')
      .then((response) => {
        setProducts(response.data.success ? response.data.products : []);
        console.log(response.data.products);
      })
      .catch((err) => {
        setProducts([]);
        toast.error('Something went wrong');
      });
  }, []);

  // const handleDelete = (id) => {
  //   axios
  //     .delete(`/products/${id}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       if (response.data.status === true) {
  //         console.log(response.data.data);
  //         setProducts(products.filter((item) => item.product_id !== id));
  //         toast.success('Product Deleted');
  //       } else {
  //         toast.success('Something Went Wrong');
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error('Something Went Wrong');
  //     });
  // };

  const columns = [
    { field: 'product_id', headerName: 'Product ID', width: 160 },
    {
      field: 'product_name',
      headerName: 'Product Name',
      width: 200,
    },
    {
      field: 'product_category',
      headerName: 'Category',
      width: 160,
    },
    {
      field: 'product_price',
      headerName: 'Price',
      width: 160,
      renderCell: (params) => {
        return <ListItem>{params.row.product_price} CAD</ListItem>;
      },
    },
    {
      field: 'product_quantity',
      headerName: 'Quantity',
      width: 160,
    },
    {
      field: 'product_isactive',
      headerName: 'Status',
      width: 160,
      renderCell: (params) => {
        return (
          <ListItem>
            {params.row.product_isactive ? 'Active' : 'Inactive'}
          </ListItem>
        );
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/products/update/${params.row.product_id}`}>
              <EditButton>EDIT</EditButton>
            </Link>
            {/* <MyDeleteOutline
              onClick={() => handleDelete(params.row.product_id)}
            /> */}
          </>
        );
      },
    },
  ];
  return (
    <ProductsContainer>
      <List>
        <ItemTitleContainer>
          <h1>Products Catalogue</h1>
          <ItemAddButton
            onClick={() => {
              navigate('/admin/products/new');
            }}
          >
            Create a New Product
          </ItemAddButton>
        </ItemTitleContainer>
        <DataGrid
          rows={products}
          getRowId={(row) => row.product_id}
          disableSelectionOnClick
          columns={columns}
          pageSize={10}
        />
      </List>
    </ProductsContainer>
  );
};
export default AdminProducts;
