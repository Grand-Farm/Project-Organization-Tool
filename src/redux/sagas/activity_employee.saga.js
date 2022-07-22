import axios from 'axios';
import { put, takeLatest, select } from 'redux-saga/effects';


function* fetchEmployees(action) {
  try {
    const response = yield axios.get(`/api/activity_employee`)
    console.log('RESPONSE IN EXMPLOYEES', response.data)
    yield put({ type: 'GET_EMPLOYEE', payload: response.data })
  } catch {
    console.error('error getting into in employee-activity saga')
  }
}

function* addEmployee(action) {

    try {
        yield axios.post(`/api/activity_employee`, action.payload)
        console.log('does this working?',action.payload)
        yield put({ type: 'FETCH_EMPLOYEES', payload:action.payload})
        yield put({ type: 'FETCH_ACTIVITY', payload:action.payload})

    } catch {
        console.error('error adding in addEmployee')
    }
}

function* editEmployee(action){
    try{
        yield axios.put(`/api/activity_employee/${action.payload.activityID}`,action.payload)
        yield put({ type: 'FETCH_EMPLOYEES', payload:action.payload})
        yield put({ type: 'FETCH_ACTIVITY', payload:action.payload})


    } catch{
        console.error('error in editEmployee')
    }
}

function* employeeSaga(){
    yield takeLatest('FETCH_EMPLOYEES', fetchEmployees)
    yield takeLatest('ADD_EMPLOYEE', addEmployee)
    yield takeLatest('EDIT_EMPLOYEE', editEmployee)
}

export default employeeSaga;