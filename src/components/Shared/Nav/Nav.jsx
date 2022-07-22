import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../../Auth/LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

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
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/company">
              Home
            </Link>
            <Link className='navLink' to='/archives'>
              Archives
            </Link>

            <Link className='navLink' to='/activity'>
              Activity
            </Link>

            <Link className="navLink" to="/projects">
              Project Page
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
