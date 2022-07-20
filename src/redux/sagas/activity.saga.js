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

function* addActivity(action) {

    try {
        yield axios.post(`/api/activity`, action.payload)
        console.log('does this working?',action.payload)
        yield put({ type: 'FETCH_ACTIVITY', payload:action.payload})
    } catch {
        console.error('error adding in AddActivity')
    }
}

function* activitySaga() {
    yield takeLatest('FETCH_ACTIVITY', fetchActivity)
    yield takeLatest('ADD_ACTIVITY', addActivity)

}

export default activitySaga;