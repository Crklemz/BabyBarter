import React from 'react';

import { useStyles } from '../MuiStyling/MuiStyling';

function About() {

    const classes = useStyles();

    return (
        <div className={classes.AboutBodyLists}>
            <div>
            <h1>About</h1>
            </div>
            
            <div>
                <h4>Technology Used:</h4>
                <p>React</p>
                <p>Reach-Redux</p>
                <p>Redux-Saga</p>
                <p>Axios</p>
                <p>PostgreSQL</p>
                <p>Node</p>
                <p>Express</p>
                <p>Material UI</p>

                <h4>Future Features:</h4>
                <p>Upload photos taken by the users</p>
                <p>In app messaging</p>
            </div>
        </div>
    )
}

export default About;