import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";



function Home () {

        const dispatch = useDispatch();
        const toys = useSelector(store => store.toys);
        const history = useHistory();
        let filterValue = '';
        // let [claimedToy, setClaimedToy] = useState({title: '', age: '', condition: '', description: '', image_url: ''});


    useEffect(() => {
        dispatch({ type: 'FETCH_TOYS' });
      }, [])

    const handleClick = (id, ownerId) => {
        dispatch({type: 'SET_CLAIM', payload: {id: id, ownerId: ownerId,}})
        history.push('/confirmclaim')
    }

    const filterByCategory = (event) => {
      let toyProperty = "1";
      filterValue = event.target.id;
      console.log('in filterByCategory, toyProperty is -->', toyProperty);
      console.log('in filterByCategory, filterValue is -->', filterValue);
    }

    return (
      <>
        {/* <div>
        <input type="button" value="Slide" id="1" onClick={() => filterByCategory()} />

         
        </div> */}
        <h2>Available Toys:</h2>
        <div>
          {toys.filter(toy => toy.toyProperty != filterValue).map(filteredToy => (
            <li key={filteredToy.id} class="toyPost">
            <p>Toy Title: {filteredToy.title}</p>
            <p>Description: {filteredToy.description}</p>
            <p>For ages: {filteredToy.age}+</p>
            <p>Condition: {filteredToy.condition}</p>
          <img src={filteredToy.image_url} alt={filteredToy.description} width="100px" height="100px"/>
          <button onClick={() => handleClick(filteredToy.id, filteredToy.user_id)}>Claim Toy</button>
            </li>
          ))}
        </div>
        </>
      );
}
export default Home;
