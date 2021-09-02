import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import {useHistory} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
  }));
  const classes = useStyles();


  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
      history.push('/home')
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form  class="center-all" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">

          <TextField
          className={classes.formControl}
          label="UserName"
            type="text"
            name="username"
            variant="outlined"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>

      </div>
      <div>
        <label htmlFor="password">

          <TextField
          className={classes.formControl}
          label="Password"
            type="password"
            name="password"
            variant="outlined"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Log In" />
      </div>
    </form>
  );
}

export default LoginForm;
