import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import './ConfirmClaim.css';


function ConfirmClaim() {

        const dispatch = useDispatch();
        const toys = useSelector(store => store.toys);
        const userInfo = useSelector(store => store.userInfo);
        const claimed = useSelector(store => store.claimed);
        const history = useHistory();

        const useStyles = makeStyles((theme) => ({
            root: {
              flexGrow: 1,
            },
            paper: {
              padding: theme.spacing(2),
              margin: 'auto',
              maxWidth: 500,
              marginTop: '10px',
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
            dispatch({ type: 'FETCH_USERINFO' });
          }, [])

        const handleCancel = () => {
            history.push('/home');
        }

        const handleConfirmation = () => {
            dispatch({type: 'CONFIRM_CLAIM', payload: {available: false, itemId: claimed.id}});
            history.push('/home')
        }

    return (
        <>
        <div class="center-all">
          <h1 class="confirm-claim-title">Confirm Claim</h1>
            <h3>Toy Owner's Info</h3>
            {userInfo.filter(owner => owner.id == claimed.ownerId).map(filteredOwner => (
                <div key={filteredOwner.id} className={classes.root}>
                  <Grid container 
                        spacing={1} 
                        justifyContent="space-evenly"
                        alignItems="center">

                    <Grid item xs={6}>
                      <Paper className={classes.paper}>City: {filteredOwner.city}</Paper>
                    </Grid>

                    <Grid item xs={6}>
                      <Paper className={classes.paper}>Email: {filteredOwner.email}</Paper>
                    </Grid>
                                
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>Phone: {filteredOwner.phone}</Paper>
                    </Grid>

                  </Grid>
                </div>
            ))}
        </div>

        <div>
            {toys.filter(toy => toy.id == claimed.id).map(filteredToy => (
                <div key={filteredToy.id} class="toyPost">
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
                                  <Typography onClick={handleConfirmation} variant="body2" style={{ cursor: 'pointer' }}>
                                    Confirm Claim
                                  </Typography>
                                  <Typography onClick={handleCancel} variant="body2" style={{ cursor: 'pointer' }}>
                                    Cancel
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
                </div>
            ))}
        </div>
        
        </>
    )
}

export default ConfirmClaim;