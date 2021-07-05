import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";



function Profile() {

        const dispatch = useDispatch();
        
        const toys = useSelector(store => store.toys);
        const user = useSelector(store => store.user);
        const [city, setCity] = useState('');
        const [email, setEmail] = useState('');
        const [phone, setPhone] = useState('');
        const [cityBeingEdited, setCityBeingEdited] = useState(false);
        const [phoneBeingEdited, setPhoneBeingEdited] = useState(false);
        const [emailBeingEdited, setEmailBeingEdited] = useState(false);


        const history = useHistory();

        useEffect(() => {
            dispatch({ type: 'FETCH_TOYS' });
          }, []);

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

    const goToAddToy = () => {
        history.push('/addnewtoy')
    }

    const handleDelete = (id) => {
        dispatch({type: 'DELETE_TOY', payload: {id: id}})
    }

    const handleCitySubmit = () => {
        setCityBeingEdited(!cityBeingEdited)
    }
    const handleEmailSubmit = () => {
        setEmailBeingEdited(!emailBeingEdited)
    }
    const handlePhoneSubmit = () => {
        setPhoneBeingEdited(!phoneBeingEdited)
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
                <input type="text" onChange={(event) => setCity(event.target.value)} placeholder={user.city} />
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
                <input type="text" onChange={(event) => setEmail(event.target.value)} placeholder={user.email} />
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
                <input type="text" onChange={(event) => setPhone(event.target.value)} placeholder={user.phone} />
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
                    <button>No Show</button>
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