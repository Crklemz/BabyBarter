import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import './AddNewToy.css';


function AddNewToy() {

    let [newToy, setNewToy] = useState({title: '', image_url: '', condition: '', age: '', category: '', description: ''});

    const dispatch = useDispatch();
    const history = useHistory();

    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(1),
          minWidth: 120,
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
        root: {
            '& > *': {
              margin: theme.spacing(1),
              width: '25ch',
            },
          },
      }));
        const classes = useStyles();

  
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
        // dispatch({type: 'FETCH_TOYS'})
        alert('New Toy Added!');
        history.push('/profile')
    }

    const handleCancel = () => {
        //clear inputs before leaving page
        setNewToy('');
        history.push('/profile');
        
    }

    console.log('in AddNewToy, newToy is -->', newToy);

    return (
        <>
        <h1 class="add-new-toy-title">Add New Toy!</h1> 
        
        <form class="add-toy-form" onSubmit={handleSubmit}> 
        <div class="text-fields">
            <TextField id="outlined-basic" label="Add Toy Title" variant="outlined" type="text" value={newToy.title} onChange={handleTitleChange} />
            <TextField id="outlined-basic" label="Add a Description" variant="outlined" type="text" value={newToy.description} onChange={handleDescriptionChange} size="20"/>
            <TextField id="outlined-basic" label="Add Image url" variant="outlined" type="text" value={newToy.image_url} onChange={handleImageChange}/>
        </div>
        

        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={newToy.category}
          onChange={handleCategoryChange}
          label="Category"
        >
          
          <MenuItem value="1">Slide</MenuItem>
                <MenuItem value="2">Swing</MenuItem>
                <MenuItem value="3">Action Figure</MenuItem>
                <MenuItem value="4">Doll</MenuItem>
                <MenuItem value="5">Stuffed Animal</MenuItem>
                <MenuItem value="6">Educational</MenuItem>
                <MenuItem value="7">Stackable</MenuItem>
                <MenuItem value="8">Book</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={newToy.age}
          onChange={handleAgeChange}
          label="Age"
        >
          
          <MenuItem value="0">0+</MenuItem>
                <MenuItem value="1">1+</MenuItem>
                <MenuItem value="2">2+</MenuItem>
                <MenuItem value="3">3+</MenuItem>
                <MenuItem value="4">4+</MenuItem>
                <MenuItem value="5">5+</MenuItem>
                <MenuItem value="6">6+</MenuItem>
        </Select>
      </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Condition</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={newToy.condition}
          onChange={handleConditionChange}
          label="Condition"
        >
          
          <MenuItem value="Mint">Mint</MenuItem>
          <MenuItem value="Good">Good</MenuItem>
          <MenuItem value="Fair">Fair</MenuItem>
        </Select>
      </FormControl>

      <div class="buttons">
            <button type="submit">Add Toy</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>

        </form>


        </>
    )
}

export default AddNewToy;
