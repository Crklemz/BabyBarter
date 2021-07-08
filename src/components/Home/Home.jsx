import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';



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

    return (
      <main>
        
        <h2>Available Toys:</h2>

        <div>
        <p>Filter By Category:</p>
        <select name="Category" value={category} onChange={toggleCategoryFilter}>
                <option value="0">Show All</option>
                <option value="1">Slide</option>
                <option value="2">Swing</option>
                <option value="3">Action Figure</option>
                <option value="4">Doll</option>
                <option value="5">Stuffed Animal</option>
                <option value="6">Educational</option>
                <option value="7">Stackable</option>
                <option value="8">Book</option>
        </select>
        </div>

        <div>
        <p>Filter By Age:</p>
        <select name="Age" value={age} onChange={toggleAgeFilter}>
                <option value="-1">Show All</option>
                <option value="0">0+</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
                <option value="6">6+</option>
        </select>
        </div>

        

            {filterByCategory ? (
                <div name="filtered-home-render">
                    {toys.filter(toy => toy.category == category && toy.age >= age && toy.available == true).map(filteredToy => (
                      <li key={filteredToy.id} class="toy-post">
                      <div className={classes.root}>
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
                              <Grid item>
                                <Typography variant="subtitle1"></Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Paper>
                      </div>
                    </li>
                  ))}
                </div>

          ) : (

                <div class="render all">
                    {toys.filter(toy => toy.available == true).map(filteredToy => (
                      <li key={filteredToy.id} class="toy-post">
                        <div className={classes.root}>
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
                                <Grid item>
                                  <Typography variant="subtitle1"></Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Paper>
                        </div>
                      </li>
                    ))}
                </div>
              )}
      </main>  
)};


export default Home;
