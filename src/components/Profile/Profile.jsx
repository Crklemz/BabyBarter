import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect} from 'react';
import { useHistory } from "react-router-dom";



function Profile() {

        const dispatch = useDispatch();
        const toys = useSelector(store => store.toys);
        const user = useSelector(store => store.user);

        const history = useHistory();

        useEffect(() => {
            dispatch({ type: 'FETCH_TOYS' });
          }, [])

    const goToAddToy = () => {
        history.push('/addnewtoy')
    }

    const handleDelete = (id) => {
        dispatch({type: 'DELETE_TOY', payload: {id: id}})
    }

    return (
        <div className="container">
            <p>Profile</p>

            <button onClick={goToAddToy}>Add New Toy</button>

            <div>
                <h3>Toys Added</h3>
                {toys.filter(toy => toy.user_id == user.id ).map(filteredToy => (
                    <li key={filteredToy.id}>
                    <p>Toy Title: {filteredToy.title}</p>
                    <p>Description: {filteredToy.description}</p>
                    <p>For ages: {filteredToy.age}+</p>
                    <p>Condition: {filteredToy.condition}</p>
                    <img src={filteredToy.image_url} alt={filteredToy.description} width="100px" height="100px"/>
                    <button>No Show</button>
                    <button onClick={() => handleDelete(filteredToy.id)}>Delete Toy</button>
                    </li>
                ))}
            </div>

            <div>
                <h3>Toys Claimed</h3>
                {toys.filter(toy => toy.claimer_id == user.id ).map(filteredToy => (
                    <li key={filteredToy.id}>
                    <p>Toy Title: {filteredToy.title}</p>
                    <p>Description: {filteredToy.description}</p>
                    <p>For ages: {filteredToy.age}+</p>
                    <p>Condition: {filteredToy.condition}</p>
                    <img src={filteredToy.image_url} alt={filteredToy.description} width="100px" height="100px"/>
                    <button>Cancel Claim</button>
                    </li>
                ))}
            </div>

        </div>
    )
}

export default Profile;