import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";



function Profile() {

        const dispatch = useDispatch();
        
        const toys = useSelector(store => store.toys);
        const user = useSelector(store => store.user);
        const [beingEdited, setBeingEdited] = useState(false);
        const [userUpdate, setUserUpdate] = useState({city: user.city, email: user.email, phone: user.phone})

        const history = useHistory();

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
                    <li key={filteredToy.id} class="toyPost">
                    <p>Toy Title: {filteredToy.title}</p>
                    <p>Description: {filteredToy.description}</p>
                    <p>For ages: {filteredToy.age}+</p>
                    <p>Condition: {filteredToy.condition}</p>
                    {filteredToy.available ? (
                        <p>Toy Available</p>
                    ) : ( 
                        <p>Toy has been claimed!</p>
                    )}
                    <img src={filteredToy.image_url} alt={filteredToy.description} width="100px" height="100px"/>
                    <button onClick={() => handleMakeAvailable(filteredToy.id)}>No Show</button>
                    <button onClick={() => handleDelete(filteredToy.id)}>Delete Toy</button>
                    </li>
                    ))}
            </div>

            <div>
                <h3>Toys Claimed</h3>
                {toys.filter(toy => toy.claimer_id == user.id ).map(filteredToy => (
                    <li key={filteredToy.id} class="toyPost">
                    <p>Toy Title: {filteredToy.title}</p>
                    <p>Description: {filteredToy.description}</p>
                    <p>For ages: {filteredToy.age}+</p>
                    <p>Condition: {filteredToy.condition}</p>
                    <img src={filteredToy.image_url} alt={filteredToy.description} width="100px" height="100px"/>
                    <button onClick={() => handleMakeAvailable(filteredToy.id)}>Cancel Claim</button>
                    </li>
                ))}
            </div>

        </div>
    )
}

export default Profile;