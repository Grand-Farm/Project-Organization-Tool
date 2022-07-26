import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './LandingPage.css';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { purple, red, blueGrey } from '@mui/material/colors';
import LoginForm from '../../Auth/LoginForm/LoginForm';
import Grid from '@mui/material/Grid';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import logo from '../../../images/navLogo.png'


// CUSTOM COMPONENTS
import RegisterForm from '../../Auth/RegisterForm/RegisterForm';
import { useDispatch, useSelector } from 'react-redux';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const AllUsers = useSelector((store)=> store.AllUser)

  const history = useHistory();
  const dispatch = useDispatch();
  const [value, setValue] = useState('0');

  useEffect(() => {
    dispatch({ type: "FETCH_ALLUSERS" })
}, [])


  const onLogin = (event) => {
    history.push('/login');
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="about">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={6}>
          <Box sx={{ width: '100%', maxWidth: 700 }}>
            <div>
              <Typography mt={'5%'} ml={'15%'} color={blueGrey[800]} variant="h4" gutterBottom component="div">
                <strong>  Project Time Organization Tool</strong>

              </Typography>
              <br />
              <Typography style={{fontSize:'1.5em'}} ml={'15%'} color={blueGrey[800]} variant="subtitle1" gutterBottom component="div">
              Grand Farm's time management tool, used by the Program Management Office for logging and viewing time information on partners and projects. 
              </Typography>
              <img style={{marginLeft:'3em',height:'30em'}} src={logo}></img>
            </div>

          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} >
                  <Tab label="Sign In" value="0" />
                </TabList>
              </Box>
              <TabPanel value="0">
                <LoginForm />
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default LandingPage;
