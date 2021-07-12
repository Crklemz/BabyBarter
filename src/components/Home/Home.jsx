import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import './Home.css';



function Home () {

        const dispatch = useDispatch();
        const toys = useSelector(store => store.toys);
        const history = useHistory();
        const [filterByCategory, setFilterByCategory] = useState(false);
        const [category, setCategory] = useState(0);
        const [age, setAge] = useState(-1);


        const useStyles = makeStyles((theme) => ({
          root: {
            flexGrow: 1,
          },
          paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            marginBottom: '10px',
            maxWidth: 500,
          },
          image: {
            width: 128,
            height: 128,
          },
          img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
          },
          formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
          },
          selectEmpty: {
            marginTop: theme.spacing(2),
          },
        }));
        const classes = useStyles();

        useEffect(() => {
          dispatch({ type: 'FETCH_TOYS' });
        }, [])

    const handleClick = (id, ownerId) => {
        dispatch({type: 'SET_CLAIM', payload: {id: id, ownerId: ownerId,}})
        history.push('/confirmclaim')
    }

    const toggleCategoryFilter = (event) => {
        setCategory(event.target.value);

        if(event.target.value == 0 && age == -1) {
          setFilterByCategory(false);
        } else {
          setFilterByCategory(true);
        }
        return;
    }

    const toggleAgeFilter = (event) => {
      setAge(event.target.value);

      if(event.target.value == -1 && category == 0) {
        setFilterByCategory(false);
      } else {
        setFilterByCategory(true);
      }
      return;
  }

  const toysToFilter = () => {
    let filteredToys = [];
    //all toys 
    filteredToys = toys.filter(toy => toy.available == true);
    if(category > 0) {
      filteredToys = filteredToys.filter(toy => toy.category == category);
    }
    if(age > -1) {
      filteredToys = filteredToys.filter(toy => toy.age >= age);
    }
    return filteredToys;
  };

    return (
      <main>
        <div class="filters">
        <h1 class="available-toys">Available Toys</h1>


        <div className={classes.root}>

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={category}
              onChange={toggleCategoryFilter}
              label="Category"
              >
              <MenuItem value="0">Show All</MenuItem>
              <MenuItem value="1">Slide</MenuItem>
              <MenuItem value="2">Swing</MenuItem>
              <MenuItem value="3">Action Figure</MenuItem>
              <MenuItem value="4">Doll</MenuItem>
              <MenuItem value="5">Stuffed Animal</MenuItem>
              <MenuItem value="6">Educational</MenuItem>
              <MenuItem value="7">Stackable</MenuItem>
              <MenuItem value="8">Book</MenuItem>
            </Select>
          </FormControl>
        
        
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={age}
              onChange={toggleAgeFilter}
              label="Age"
              >
              <MenuItem value="-1">Show All</MenuItem>
              <MenuItem value="0">0+</MenuItem>
              <MenuItem value="1">1+</MenuItem>
              <MenuItem value="2">2+</MenuItem>
              <MenuItem value="3">3+</MenuItem>
              <MenuItem value="4">4+</MenuItem>
              <MenuItem value="5">5+</MenuItem>
              <MenuItem value="6">6+</MenuItem>
            </Select>
          </FormControl>
        </div>
        </div>

        <div name="filtered-home-render">
          {toysToFilter().map(filteredToy => (
            <div key={filteredToy.id} class="toy-post" className={classes.root}>
              <Paper className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase className={classes.image}>
                      <img className={classes.img} alt="complex" src={filteredToy.image_url} />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                          {filteredToy.title}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          {filteredToy.description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          For ages: {filteredToy.age}+
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Condition: {filteredToy.condition}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography onClick={() => handleClick(filteredToy.id, filteredToy.user_id)} variant="body2" style={{ cursor: 'pointer' }}>
                          Claim Toy
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
                    </div>
                  ))}
                </div>
      </main>  
)};


export default Home;
