import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";



function ConfirmClaim() {

        const dispatch = useDispatch();
        const toys = useSelector(store => store.toys);
        const user = useSelector(store => store.user);
        const claimed = useSelector(store => store.claimed);
        const history = useHistory();
        

        // const showClaimed = () => {
        //     const claimedToyId = claimed;

        useEffect(() => {
            dispatch({ type: 'FETCH_TOYS' });
          }, [])

    return (
        <>
        <p>confirm claim page</p>
        <p>
        {user.city} {user.email} {user.phone} {claimed} 
        </p>

        <div>
            {toys.filter(toy => toy.id == claimed).map(filteredToy => (
                <li key={filteredToy.id}>
                <p>Toy Title: {filteredToy.title}</p>
                <p>Description: {filteredToy.description}</p>
                <p>For ages: {filteredToy.age}+</p>
                <p>Condition: {filteredToy.condition}</p>
            <img src={filteredToy.image_url} alt={filteredToy.description} width="100px" height="100px"/>
            <button>Confirm Claim</button>
                </li>
            ))}
        </div>
        
        </>
    )
}

export default ConfirmClaim;