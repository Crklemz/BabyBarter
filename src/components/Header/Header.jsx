import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
//mui import
import { useStyles } from '../MuiStyling/MuiStyling';

function Header() {
  const user = useSelector((store) => store.user);

  const classes = useStyles();


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


      <div className={classes.Header}>
        <div className={classes.NavBar}>
          <Link className={classes.NavLink} to="/about">
            About
            </Link>

          {user.id ? (
            <>
              <Link className={classes.NavLink} to="/profile">
                Profile
            </Link>

              <Link className={classes.NavLink} to="/addnewtoy">
                Add New Toy
            </Link>

              <LogOutButton />
            </>
          ) : (



            <Link className={classes.NavLink} to={loginLinkData.path}>
              {loginLinkData.text}
            </Link>

            )}

            <Link className={classes.NavLink} to="/home">
              Home
            </Link>
        </div>


        <Link to="/home">
          <h2>BabyBarter</h2>
        </Link>

      </div>

      <div>
        <p className={classes.HeaderSlogan}>Less Waste - Save Money - MAKE SPACE!</p>
      </div>

    </>
  );
}

export default Header;
