import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect} from 'react';
import { useHistory } from "react-router-dom";

function ConfirmClaim({}) {

    const dispatch = useDispatch();
        const toys = useSelector(store => store.toys);
        const user = useSelector(store => store.user);
        const history = useHistory();

        useEffect(() => {
            dispatch({ type: 'FETCH_TOYS' });
          }, [])

    return (
        <>
        <p>confirm claim page</p>
        <p>
        {user.city} {user.email} {user.phone}
        </p>
        <div>
            
        </div>
        </>
    )
}

export default ConfirmClaim;