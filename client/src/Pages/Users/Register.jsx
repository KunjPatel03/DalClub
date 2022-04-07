// @Author: Anamika Ahmed
import React, { useState } from "react";
import { format, formatISO } from "date-fns";
import { styled } from '@mui/system';
import { Box, TextField, Typography,Button } from "@mui/material";
import axios from "../../Assets/config/axiosConfig";

import { toast } from "react-toastify"
import {useNavigate } from "react-router-dom";
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from 'react-router-dom';




const JobsContainer = styled('div')({
    flex: '8',
    width: '100%',
    display: 'grid',
    gap: '1em',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
});

const TheList = styled('div')({
    width: '100%',
    flex: '4'
});

const ItemTitleContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
});

const Register = () => {

    const navigate = useNavigate();

    const [lists, setEvents] = useState([]);
    const getEvents =() => {
        // fetch("http://Web-dalclub.herokuapp.com/api/events/list_events")
        axios.get("/package/getPackage").then((data)=>{
            setEvents(data.data.package);
            console.log(data.data.package);
        })
          
      }
    React.useEffect(() => {
      
      getEvents();
    }, []);

    // Handles add job form input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [id]: value
        }))
    };

    // Handles add job submit
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("The user password is ",formValues.user_password);
        console.log("The confirm password is ",formValues.confirm_password);
        if(formValues.user_password!=formValues.confirm_password){
          toast.error("Password and Confirm Password Do not Match!");
        }
        else{
       
        axios.post("/users/register", formValues).then((res) => {


            if(res.data.success==1) {
                console.log("The message is ",res.data.success);
              toast("Registered Successfully!")
            } else {
              toast.error("Enter the information correctly.")
            }
          })
          .catch((err) => {
            toast.error("Cannot Register.Enter the information correctly")
          });
        }
    };

    const defaultValues = {
        user_name: "",
        user_email: "",
        user_password: "",
        package_id: "",
        confirm_password:""
    }

    const [formValues, setFormValues] = useState(defaultValues);

    return (
        <JobsContainer>
            <TheList>
                <ItemTitleContainer>
                    <h1>User Registration Form</h1>
                </ItemTitleContainer>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', m: 1, alignItems: 'left' }}>
                    <TextField
                            required
                            label="Enter your username"
                            id="user_name"
                            type="text"
                            sx={{ m: 1 }}
                            value={formValues.user_name}
                            onChange={handleInputChange}
                        />
                        <TextField
                            required
                            label="Enter your email address"
                            id="user_email"
                            type="email"
                            sx={{ m: 1 }}
                            value={formValues.user_email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            required
                            label="Enter your password"
                            id="user_password"
                            type="password"
                            sx={{ m: 1 }}
                            inputProps={{ minLength: 8 }}
                            value={formValues.user_password}
                            onChange={handleInputChange}
                        />
                        <TextField
                            required
                            label="Confirm password"
                            id="confirm_password"
                            type="password"
                            sx={{ m: 1 }}
                            value={formValues.confirm_password}
                            onChange={handleInputChange}
                        />
                 <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                  <TableCell align="right">Package ID</TableCell>

                  <TableCell align="right">Package Name</TableCell>
                    <TableCell align="right">Package Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lists.map((list) => (
                    <TableRow>
                      <TableCell align="right">{list.package_id}</TableCell>
                      <TableCell align="right">{list.name}</TableCell>       
                      <TableCell align="right">{list.price}</TableCell>
                      <TableCell align="right">
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>            
                       <TextField
                            required
                            label="Choose your package by entering a valid package ID"
                            id="package_id"
                            type="number"
                            sx={{ m: 1 }}
                            InputProps={{
                                inputProps: { 
                                    max: 5, min: 1 
                                }
                            }}
                            value={formValues.package_id}
                            onChange={handleInputChange}
                        />
                        <Box sx={{ margin:'auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>                
                        </Box>
                        <Button variant="contained" sx={{ m: 1, width: '35ch' }} type="submit"> Register </Button>
                        <Link to={"/user/login"}>
                        <Button variant="contained" sx={{ m: 1, width: '35ch' }}> Have an Account? Login </Button>
                        </Link>

                    </Box>
                   
                </form>
            </TheList>
        </JobsContainer>
    )
}
export default Register;
