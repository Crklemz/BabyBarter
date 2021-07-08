import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';



function Profile() {

        const dispatch = useDispatch();
        
        const toys = useSelector(store => store.toys);
        const user = useSelector(store => store.user);
        const [beingEdited, setBeingEdited] = useState(false);
        const [userUpdate, setUserUpdate] = useState({city: user.city, email: user.email, phone: user.phone});
        const history = useHistory();

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
            dispatch({type: 'FETCH_TOYS'});
          }, []);

    const goToAddToy = () => {
        history.push('/addnewtoy')
    }
    
        const handleDelete = (id) => {
            dispatch({type: 'DELETE_TOY', payload: {id: id}})
        }

          // toggles if we show the edit screen or not
    const toggleEdit = () => {
        // set state
        setBeingEdited(!beingEdited)
    }
   
    //user info input changes
    const handleCityChange = (event) => {
        setUserUpdate({...userUpdate, city: event.target.value});
    }
    const handleEmailChange = (event) => {
        setUserUpdate({...userUpdate, email: event.target.value});
    }
    const handlePhoneChange = (event) => {
        setUserUpdate({...userUpdate, phone: event.target.value});
    }


    const handleSubmit = () => {
        dispatch({type: 'UPDATE_USER', payload: userUpdate})
        setBeingEdited(!beingEdited)

    }

    const handleMakeAvailable = (itemId) => {
        dispatch({type: 'MAKE_AVAILABLE', payload: {available: true, itemId: itemId}})

    }

    return (
        <div className="container">
        
            <h2>Profile</h2>

            <section class="ownerInfo">
                <div>
                    {!beingEdited ? (
                    <div>
                        <h3>User Info</h3>
                        <p>Nearest Major City: {user.city}</p>
                        <p>Email: {user.email}</p>
                        <p>Phone: {user.phone}</p>
                        <button onClick={toggleEdit}>Edit User Info</button>
                    </div>
                    ) : (
                    <div>
                        <h3>User Info</h3>
                            <form onSubmit={handleSubmit}>

                                <input type="text" 
                                value={userUpdate.city} 
                                placeholder={user.city}
                                onChange={handleCityChange}  
                                />

                                <input type="text" 
                                value={userUpdate.email} 
                                placeholder={user.email}
                                onChange={handleEmailChange}  
                                />

                                <input type="text"
                                value={userUpdate.phone}
                                placeholder={user.phone}
                                onChange={handlePhoneChange}  
                                />

                                <button type="submit">Submit Change</button>
                            </form>
                    </div>
                    )}
                </div>
            </section>

                <button onClick={goToAddToy}>Add New Toy</button>

            <div>
                <h3>Toys Added</h3>
                {toys.filter(toy => toy.user_id == user.id ).map(filteredToy => (
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
                              {filteredToy.available ? (
                                  <Typography variant="body2" color="textSecondary">
                                  Toy Has Not Been Claimed
                                  </Typography>
                              ) : (
                                <> 
                                <Typography variant="body2" color="textSecondary">
                                Toy Has Been Claimed
                                </Typography>
                                <Typography onClick={() => handleMakeAvailable(filteredToy.id)} variant="body2" style={{ cursor: 'pointer' }}>
                                No Show
                                </Typography>
                                </>
                              )}
                              <Grid item>
                                
                                <Typography onClick={() => handleDelete(filteredToy.id)} variant="body2" style={{ cursor: 'pointer' }}>
                                  Delete Toy
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

            <div>
                <h3>Toys Claimed</h3>
                {toys.filter(toy => toy.claimer_id == user.id ).map(filteredToy => (
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
                                <Typography onClick={() => handleMakeAvailable(filteredToy.id)} variant="body2" style={{ cursor: 'pointer' }}>
                                  Cancel Claim
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

        </div>
    )
}

export default Profile;
