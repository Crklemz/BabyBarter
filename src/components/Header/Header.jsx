import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Header.css';
import {useSelector} from 'react-redux';

function Header() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id == null) {
    loginLinkData.path = '/login';
    loginLinkData.text = 'Login / Register';
  }

  return (
    <>
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">BabyBarter</h2>
      </Link>
      

      <div>
        <Link className="navLink" to="/home">
          Home
        </Link>

        {user.id ? (
          <>
            <Link className="navLink" to="/profile">
              Profile
            </Link>

            <Link className="navLink" to="/addnewtoy">
              Add New Toy
            </Link>

            <LogOutButton className="navLink" />
          </>
        ) : (
            <Link className="navLink" to={loginLinkData.path}>
            {loginLinkData.text}
            </Link>
          )}
        
      </div>

      
      
    </div>
    <div class="slogan">
    <p>Less Waste - Save Money - MAKE SPACE!</p>
    </div>
    </>
  );
}

export default Header;
