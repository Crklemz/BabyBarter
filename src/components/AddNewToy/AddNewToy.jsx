import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from "react-router-dom";


function AddNewToy() {

    let [newToy, setNewToy] = useState({title: '', image_url: '', condition: '', age: '', category: '', description: ''});

    const dispatch = useDispatch();
    const history = useHistory();
  
    //handle changes of form
    const handleTitleChange = (event) => {
        setNewToy({...newToy, title: event.target.value});
    }
    const handleImageChange = (event) => {
        setNewToy({...newToy, image_url: event.target.value});
    }
    const handleConditionChange = (event) => {
        setNewToy({...newToy, condition: event.target.value});
    }
    const handleAgeChange = (event) => {
        setNewToy({...newToy, age: event.target.value});
    }
    const handleCategoryChange = (event) => {
        setNewToy({...newToy, category: event.target.value});
    }
    const handleDescriptionChange = (event) => {
        setNewToy({...newToy, description: event.target.value});
    }

    //handle the submit of the form
    const handleSubmit = (event) => {
        event.preventDefault
        console.log('in handleSubmit, adding newToy -->', newToy);
    
        // dispatch sent to toy.saga, payload as below
        dispatch({type:'ADD_TOY', payload: newToy});
        alert('New Toy Added!');
        history.push('/profile')
    }

    const handleCancel = () => {
        //clear inputs before leaving page
        setNewToy('');
        history.push('/profile')
    }

    console.log('in AddNewToy, newToy is -->', newToy);

    return (
        <>
        <p>add new toy page</p>

        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Add Toy Title" value={newToy.title} onChange={handleTitleChange} />
            <input type="text" placeholder="Add Image URL" value={newToy.image_url} onChange={handleImageChange}/>

            <select name="Condition" value={newToy.condition} onChange={handleConditionChange}>
                <option>Condition</option>
                <option value="Mint">Mint</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
            </select>

            <select name="Age" value={newToy.age} onChange={handleAgeChange}>
                <option>For Ages</option>
                <option value="0">0+</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
                <option value="6">6+</option>
            </select>

            <select name="Category" value={newToy.category} onChange={handleCategoryChange}>
                <option>Category</option>
                <option value="1">Slide</option>
                <option value="2">Swing</option>
                <option value="3">Action Figure</option>
                <option value="4">Doll</option>
                <option value="5">Stuffed Animal</option>
                <option value="6">Educational</option>
                <option value="7">Stackable</option>
                <option value="8">Book</option>
            </select>

            <input type="text" placeholder="Add a Description:" value={newToy.description} onChange={handleDescriptionChange} size="20"/>
            <button type="submit">Add Toy</button>
            <button onClick={handleCancel}>cancel</button>
        </form>


        </>
    )
}

export default AddNewToy;
