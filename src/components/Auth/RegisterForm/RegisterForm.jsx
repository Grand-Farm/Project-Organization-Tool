import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Material UI
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import  Box  from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [clearance, setClearance] = useState(false);
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        email: email,
        is_admin: clearance
      },
    });
  }; // end registerUser

  const handleChange = (event) => {
    setClearance(event.target.checked);
  };

  return (
    <div className='formPanel'>
      <Typography variant='h5'>
        Register User
      </Typography>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <Box 
        sx={{
          p:1
        }}
      >
          <TextField
            label='Username'
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
      </Box >
      <Box 
        sx={{
          pb:1
        }}
      >
          <TextField
            label='Email'
            type="email"
            name="email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
      </Box >
      <Box >
          <TextField
            label='Password'
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
      </Box >
      <FormControlLabel
        label="Set As Admin"
        control={<Checkbox checked={clearance} onChange={handleChange}/>}
      />
      <Box>
        <Button
          style={{
            color: 'white',
            backgroundColor:'#afcc36'
          }}
          onClick={()=> registerUser()}
        >
          Register
         </Button> 
      </Box>
      </div>
   
  );
}

export default RegisterForm;
