import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect} from 'react';
import { useHistory } from "react-router-dom";



function Home () {

        const dispatch = useDispatch();
        const toys = useSelector(store => store.toys);
        const history = useHistory();


    useEffect(() => {
        dispatch({ type: 'FETCH_TOYS' });
      }, [])

    const handleClick = () => {
        history.push('/confirmclaim')
    }

    return (
    <>
        <h2>Available Toys</h2>
        <ul>
        {toys.map (toy => {
          return (
            <li key={toy.id}>
                <p>Toy Title: {toy.title}</p>
                <p>Description: {toy.description}</p>
                <p>For ages: {toy.age}+</p>
                <p>Condition: {toy.condition}</p>
              <img src={toy.image_url} alt={toy.description} width="100px" height="100px"/>
              <button onClick={handleClick}>Claim Toy</button>
            </li>
          )
        })}
      </ul>
    </>
    )
}
export default Home;