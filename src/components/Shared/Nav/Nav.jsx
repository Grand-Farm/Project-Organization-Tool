import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../../Auth/LogOutButton/LogOutButton';
import './Nav.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Typography } from "@mui/material"



function Nav() {
  const user = useSelector((store) => store.user);
  const matches = useMediaQuery('(min-width:610px)');
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="nav">
      <Link to="/home">
        {/* <h2 className="nav-title">Project Organization Tool</h2> */}
        <img className='logo-image' src="https://grandfarm.com/wp-content/uploads/2021/03/Grand-Farm_Logo_Horizontal_White-01-2-1.png"></img>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/home">
            Login
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          matches ?
            <>


              <Link className="navLink" to="/company">
                Home
              </Link>
              <Link className='navLink' to='/archives'>
                Archives
              </Link>
              {user.is_admin ?
                <Link onClick={() => setIsOpen(false)} className="navLink" to="/admin">
                  Dashboard
                </Link>

                : ''}

              <LogOutButton className="navLink" />
            </>
            :
            <>
              <Button onClick={() => setIsOpen(true)}>
                <MenuIcon style={{ color: 'white' }} />
              </Button>
              <Drawer
                className='monthroute'
                anchor="left"
                open={isOpen}
                onClose={() => setIsOpen(false)}
              >
                <Box style={{ backgroundColor: '#244c62' }} textAlign={'left'} width='10em' height='65em'>
                  <div className='monthnames'>

                    <Link onClick={() => setIsOpen(false)} style={{ marginTop: '2em' }} className="navLink" to="/company">
                      Home
                    </Link>
                    <hr />
                    <Link onClick={() => setIsOpen(false)} className='navLink' to='/archives'>
                      Archives
                    </Link>
                    <hr />

                    {user.is_admin ?
                      <Link onClick={() => setIsOpen(false)} className="navLink" to="/admin">
                        Dashboard
                      </Link>

                      : ''}
                    <hr />
                    <LogOutButton style={{ marginTop: '2em' }} className="navLink" />


                  </div>

                </Box>

              </Drawer>
            </>
        )}


      </div>
    </div>
  );
}

export default Nav;
