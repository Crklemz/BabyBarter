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

function* toySaga() {
  yield takeEvery('FETCH_TOYS', fetchToys);
}

export default toySaga;