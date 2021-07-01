import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";



function ConfirmClaim() {

        const dispatch = useDispatch();
        const toys = useSelector(store => store.toys);
        // const user = useSelector(store => store.user);
        const userInfo = useSelector(store => store.userInfo);
        const claimed = useSelector(store => store.claimed);
        const history = useHistory();

        useEffect(() => {
            dispatch({ type: 'FETCH_USERINFO' });
          }, [])

    return (
        <>
        <p>confirm claim page</p>
        <p>{claimed.ownerId}</p>
        
        <div>
            <h3>Toy Owner's Info</h3>
            {userInfo.filter(owner => owner.id == claimed.ownerId).map(filteredOwner => (
                <li key={filteredOwner.id}>
                <p>City: {filteredOwner.city} Email: {filteredOwner.email} Phone: {filteredOwner.phone}</p>
                </li>
            ))}
        </div>

        <div>
            <h3>Toy Details</h3>
            {toys.filter(toy => toy.id == claimed.id).map(filteredToy => (
                <li key={filteredToy.id}>
                <p>Toy Title: {filteredToy.title}</p>
                <p>Description: {filteredToy.description}</p>
                <p>For ages: {filteredToy.age}+</p>
                <p>Condition: {filteredToy.condition}</p>
            <img src={filteredToy.image_url} alt={filteredToy.description} width="100px" height="100px"/>
            <button>Confirm Claim</button>
            <button>Cancel</button>
                </li>
            ))}
        </div>
        
        </>
    )
}

export default ConfirmClaim;