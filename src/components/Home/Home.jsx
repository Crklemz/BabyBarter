import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect} from 'react';



function Home () {

        const dispatch = useDispatch();
        const toys = useSelector(store => store.toys);

    useEffect(() => {
        dispatch({ type: 'FETCH_TOYS' });
      }, [])

    return (
    <>
        <p>Home Page with Feed</p>
        <ul>
        {toys.map (toy => {
          return (
            <li key={toy.id}>
                {toy.title}
                {toy.description}
              <img src={toy.image_url} alt={toy.description} width="200px"/>
              <button>Delete</button>
            </li>
          )
        })}
      </ul>
    </>
    )
}
export default Home;