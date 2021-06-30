import React from 'react';
import { useHistory } from "react-router-dom";



function Profile() {

    const history = useHistory();

    const goToAddToy = () => {
        history.push('/addnewtoy')
    }

    return (
        <div className="container">
            <p>Profile</p>

            <button onClick={goToAddToy}>Add New Toy</button>

        </div>
    )
}

export default Profile;