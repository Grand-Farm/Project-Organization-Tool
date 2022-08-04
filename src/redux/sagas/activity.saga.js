import axios from 'axios';
import { put, takeLatest, select } from 'redux-saga/effects';


function* fetchActivity(action) {
    try {
        const response = yield axios.get(`/api/activity/${action.payload.projectID}`)
        yield put({ type: 'GET_ACTIVITY', payload: response.data })
    } catch {
        console.error('error getting into in ActivitySAGA')
    }
}



function* addActivity(action) {

    try {
        yield axios.post(`/api/activity`, action.payload)
        yield put({ type: 'FETCH_ACTIVITY', payload:action.payload})
    } catch {
        console.error('error adding in AddActivity')
    }
}


function* UpdateActivity(action) {

    try {
        yield axios.put(`/api/activity/${action.payload.activityID}`, action.payload)
        yield put({ type: 'FETCH_ACTIVITY', payload:action.payload})
    } catch {
        console.error('error adding in AddActivity')
    }
}

function* activitySaga() {
    yield takeLatest('FETCH_ACTIVITY', fetchActivity)
    yield takeLatest('ADD_ACTIVITY', addActivity)
    yield takeLatest('UPDATE_ACTIVITY',UpdateActivity)


}

export default activitySaga;