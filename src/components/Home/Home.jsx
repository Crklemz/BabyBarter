import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect} from 'react';
import { useHistory } from "react-router-dom";



function Home () {

        const dispatch = useDispatch();
        const toys = useSelector(store => store.toys);
        const history = useHistory();
        let filterValue = '';


    useEffect(() => {
        dispatch({ type: 'FETCH_TOYS' });
      }, [])

    const handleClick = () => {
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
        <div>
        <input type="button" value="Slide" id="1" onClick={() => filterByCategory(event)} />

         
        </div>

        <div>
          {toys.filter(toy => toy.toyProperty != {filterValue}).map(filteredToy => (
            <li key={filteredToy.id}>
            <p>Toy Title: {filteredToy.title}</p>
            <p>Description: {filteredToy.description}</p>
            <p>For ages: {filteredToy.age}+</p>
            <p>Condition: {filteredToy.condition}</p>
          <img src={filteredToy.image_url} alt={filteredToy.description} width="100px" height="100px"/>
          <button onClick={handleClick}>Claim Toy</button>
            </li>
          ))}
        </div>
        </>
      );
}
export default Home;


/* <>
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
    </> */