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

function* employeeSaga(){
    yield takeLatest('FETCH_EMPLOYEES', fetchEmployees)
}

export default employeeSaga;