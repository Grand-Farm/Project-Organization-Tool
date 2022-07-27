import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './LandingPage.css';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { purple, red, blueGrey } from '@mui/material/colors';
import LoginForm from '../../Auth/LoginForm/LoginForm';
import Grid from '@mui/material/Grid';

// CUSTOM COMPONENTS
import RegisterForm from '../../Auth/RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();
  const [value, setValue] = useState('0');
  const onLogin = (event) => {
    history.push('/login');
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="container">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={6}>
          <Box sx={{ width: '100%', maxWidth: 700 }}>
            <div>
              <Typography mt={'5%'} ml={'15%'} color={blueGrey[800]} variant="h4" gutterBottom component="div">
                <strong> Working </strong>
              </Typography>
              <Typography ml={'15%'} color={blueGrey[800]} variant="subtitle1" gutterBottom component="div">
                I like to work and dance and ply  I like to work and dance and ply  I like to work and dance and ply  I like to work and dance and ply I like to work and dance and ply I like to work and dance and ply I like to work and dance and ply I like to work and dance and ply I like to work and dance and ply I like to work and dance and ply
              </Typography>
            </div>

          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} >
                  <Tab label="Sign In" value="0" />
                  <Tab label="Sign Up" value="1" />
                </TabList>
              </Box>
              <TabPanel value="0">
                <LoginForm />
              </TabPanel>
              <TabPanel value="1">
                <RegisterForm />
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default LandingPage;
