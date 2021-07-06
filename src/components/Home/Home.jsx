import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";



function Home () {

        const dispatch = useDispatch();
        const toys = useSelector(store => store.toys);
        const history = useHistory();
        const [filterByCategory, setFilterByCategory] = useState(false);
        const [category, setCategory] = useState(0);
        const [age, setAge] = useState(0);
        const filterCategory = 'toy.category';
        
        // let [claimedToy, setClaimedToy] = useState({title: '', age: '', condition: '', description: '', image_url: ''});


    useEffect(() => {
        dispatch({ type: 'FETCH_TOYS' });
      }, [])

    const handleClick = (id, ownerId) => {
        dispatch({type: 'SET_CLAIM', payload: {id: id, ownerId: ownerId,}})
        history.push('/confirmclaim')
    }

    const toggleCategoryFilter = (event) => {
        setCategory(event.target.value);

        if(event.target.value == 0 && age == 0) {
          setFilterByCategory(false);
        } else {
          setFilterByCategory(true);
        }
        return;
    }

    const toggleAgeFilter = (event) => {
      setAge(event.target.value);

      if(event.target.value == 0 && category == 0) {
        setFilterByCategory(false);
      } else {
        setFilterByCategory(true);
      }
      return;
  }

    

    return (
      <main>
        
        <h2>Available Toys:</h2>

        <select name="Category" value={category} onChange={toggleCategoryFilter}>
                <option value="0">Show All</option>
                <option value="1">Slide</option>
                <option value="2">Swing</option>
                <option value="3">Action Figure</option>
                <option value="4">Doll</option>
                <option value="5">Stuffed Animal</option>
                <option value="6">Educational</option>
                <option value="7">Stackable</option>
                <option value="8">Book</option>
        </select>

        <select name="Age" value={age} onChange={toggleAgeFilter}>
                <option value="-1">Show All</option>
                <option value="0">0+</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
                <option value="6">6+</option>
        </select>


            {filterByCategory ? (
                <div name="render with category filter">
                    {toys.filter(toy => toy.category == category && toy.age >= age && toy.available == true).map(filteredToy => (
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

          ) : (

                <div class="render all">
                    {toys.filter(toy => toy.available == true).map(filteredToy => (
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
              )
              
              }
         
      </main>  
)};

export default Home;
