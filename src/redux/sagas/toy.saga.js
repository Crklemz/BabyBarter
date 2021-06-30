import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchToys() {
  try {
    const toys = yield axios.get('/api/toy');
    yield put({ type: 'SET_TOYS', payload: toys.data });
  } catch (error) {
    console.log('toys get request failed', error);
  }
}

function* postToy(action) {
  console.log('in postToy, action.payload is -->', action.payload);
  
  try {
    yield axios.post(`/api/toy`, action.payload);
  } catch (error) {
    console.log('error in postToy SAGA -->', error);
  }
}

function* toySaga() {
  yield takeEvery('FETCH_TOYS', fetchToys);
  yield takeEvery('ADD_TOY', postToy);
}

export default toySaga;