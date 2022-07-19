import axios from 'axios';
import { put, takeLatest, select } from 'redux-saga/effects';


function* fetchActivity(action) {
  try {
    const response = yield axios.get(`/api/activity/${action.payload.projectID}`)
    console.log('RESPONSE IN ACTIVITTTYYYYYYY', response.data)
    yield put({ type: 'GET_ACTIVITY', payload: response.data })
  } catch {
    console.error('error getting into in ActivitySAGA')
  }
}

function* activitySaga(){
    yield takeLatest('FETCH_ACTIVITY', fetchActivity)
}

export default activitySaga;