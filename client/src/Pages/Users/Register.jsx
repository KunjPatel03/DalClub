// @Author: Anamika Ahmed
import { useState } from "react"
import { styled } from '@mui/system';
import { Box, TextField, Button } from "@mui/material";
import axios from "../../Assets/config/axiosConfig";
import { toast } from "react-toastify"
import {useNavigate } from "react-router-dom";

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
    };

    const defaultValues = {
        user_name: "",
        user_email: "",
        user_password: ""
    }

    const [formValues, setFormValues] = useState(defaultValues);

    return (
        <JobsContainer>
            <TheList>
                <ItemTitleContainer>
                    <h1>Registration Form</h1>
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
                            type="user_email"
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
                        <Box sx={{ margin:'auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>                
                        </Box>
                        <Button variant="contained" sx={{ m: 1, width: '35ch' }} type="submit"> Register </Button>
                        <Button variant="contained" sx={{ m: 1, width: '35ch' }} type="submit"> Have an Account? Login </Button>

                    </Box>
                   
                </form>
            </TheList>
        </JobsContainer>
    )
}
export default Register;