import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FormControl, FormGroup, InputLabel, Input, Typography, styled, Button } from '@mui/material';
import { registerAdmin } from '../services/api';

const Container = styled(FormGroup)`
    width: 50%;
    margin: 3% auto 0 auto;
    & > div {
        margin-top: 8px;
    }
`

const defaultValue = {
    name: '',
    username: '',
    dob: '00/00/0000',
    wage: '0',
    role: 'admin',
    category: '-',
    password: '',
    confpassword: '',
    phone: '',
}

const Register = () => {

    const [admin, setAdmin] = useState(defaultValue);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setAdmin({ ...admin, [e.target.name]: e.target.value });
        console.log(admin);
    }
    
    const register = async () => {
        await registerAdmin(admin);
        navigate("/allevents");
    }
    
    return (
        <Container>
        <Typography variant='h4'>Register</Typography>
        <FormControl>
                <InputLabel>Name</InputLabel>
                <Input onChange={(e) => handleChange(e)} name="name" />
            </FormControl>
            <FormControl>
                <InputLabel>Username</InputLabel>
                <Input onChange={(e) => handleChange(e)} name="username" />
            </FormControl>
            <FormControl>
                <InputLabel>Password</InputLabel>
                <Input type="password" onChange={(e) => handleChange(e)} name="password" />
            </FormControl>
            <FormControl>
                <InputLabel>Confirm Password</InputLabel>
                <Input type="password" onChange={(e) => handleChange(e)} name="confpassword" />
            </FormControl>
            <FormControl>
                <InputLabel>Phone</InputLabel>
                <Input type="number" onChange={(e) => handleChange(e)} name="phone" />
            </FormControl>
        <FormControl>
            <Button variant="contained" onClick={() => register()}>Register</Button>
        </FormControl>
    </Container>
    );
}

export default Register;