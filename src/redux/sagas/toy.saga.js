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

function* confirmClaim(action) {
  try {
    yield axios.put('/api/toy', action.payload);
  } catch (error) {
  console.log('error in confirmClaim SAGA -->', error);
  }
}

function* deleteToy(action) {
  try {
    yield axios.delete(`/api/toy/${action.payload.id}`)
    yield put({type: 'FETCH_TOYS'})
  } catch(error) {
    console.log('error in deleteToy SAGA -->', error);
  }
}




function* toySaga() {
  yield takeEvery('FETCH_TOYS', fetchToys);
  yield takeEvery('ADD_TOY', postToy);
  yield takeEvery('CONFIRM_CLAIM', confirmClaim);
  yield takeEvery('DELETE_TOY', deleteToy);
}

export default toySaga;