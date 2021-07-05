import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";



function Profile() {

        const dispatch = useDispatch();
        
        const toys = useSelector(store => store.toys);
        const user = useSelector(store => store.user);
        const [cityBeingEdited, setCityBeingEdited] = useState(false);
        const [phoneBeingEdited, setPhoneBeingEdited] = useState(false);
        const [emailBeingEdited, setEmailBeingEdited] = useState(false);
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
    const toggleCityEdit = () => {
        // set state
        setCityBeingEdited(!cityBeingEdited)
    }
    const togglePhoneEdit = () => {
        // set state
        setPhoneBeingEdited(!phoneBeingEdited)
    }
    const toggleEmailEdit = () => {
        // set state
        setEmailBeingEdited(!emailBeingEdited)
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


    const handleCitySubmit = () => {
        dispatch({type: 'UPDATE_USER', payload: userUpdate})
        setCityBeingEdited(!cityBeingEdited)
    }
    const handleEmailSubmit = () => {
        dispatch({type: 'UPDATE_USER', payload: userUpdate})
        setEmailBeingEdited(!emailBeingEdited)
    }
    const handlePhoneSubmit = () => {
        dispatch({type: 'UPDATE_USER', payload: userUpdate})
        setPhoneBeingEdited(!phoneBeingEdited)
    }

    const handleNoShow = (itemId) => {
        dispatch({type: 'MAKE_AVAILABLE', payload: {available: true, itemId: itemId }})
    }

    return (
        <div className="container">
            <p>Profile</p>

            <button onClick={goToAddToy}>Add New Toy</button>
        <section class="ownerInfo">
            <div>
                {!cityBeingEdited ? (
                <div>
                <p>Nearest Major City: {user.city}</p>
                <button onClick={toggleCityEdit}>Edit City</button>
                </div>
                ) : (
                <form onSubmit={handleCitySubmit}>
                <input type="text" 
                value={userUpdate.city} 
                placeholder={user.city}
                onChange={handleCityChange}  />
                <button type="submit">Submit Change</button>
                </form>
                )}
            </div>
            <div>
            {!emailBeingEdited ? (
                <div>
                <p>Email: {user.email}</p>
                <button onClick={toggleEmailEdit}>Edit Email</button>
                </div>
                ) : (
                <form onSubmit={handleEmailSubmit}>
                <input type="text" 
                value={userUpdate.email} 
                placeholder={user.email}
                onChange={handleEmailChange}  />
                <button type="submit">Submit Change</button>
                </form>
                )}
            </div>
            <div>
            {!phoneBeingEdited ? (
                <div>
                <p>Phone: {user.phone}</p>
                <button onClick={togglePhoneEdit}>Edit Phone</button>
                </div>
                ) : (
                <form onSubmit={handlePhoneSubmit}>
                <input type="text"
                value={userUpdate.phone}
                placeholder={user.phone}
                onChange={handlePhoneChange}  />
                <button type="submit">Submit Change</button>
                </form>
                )}
            </div>
            </section>
            <div>
                <h3>Toys Added</h3>
                {toys.filter(toy => toy.user_id == user.id ).map(filteredToy => (
                    <li key={filteredToy.id} class="toyPost">
                    <p>Toy Title: {filteredToy.title}</p>
                    <p>Description: {filteredToy.description}</p>
                    <p>For ages: {filteredToy.age}+</p>
                    <p>Condition: {filteredToy.condition}</p>
                    <img src={filteredToy.image_url} alt={filteredToy.description} width="100px" height="100px"/>
                    <button onClick={() => handleNoShow(filteredToy.id)}>No Show</button>
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
                    <button>Cancel Claim</button>
                    </li>
                ))}
            </div>

        </div>
    )
}

export default Profile;