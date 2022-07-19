import axios from 'axios';
import { put, take, takeLatest } from 'redux-saga/effects';

function* fetchCompany() {
    try {
        const response = yield axios.get('/api/company');
        console.log('In Fetch company Saga', response.data)
        yield put({ type: 'SET_COMPANY', payload: response.data });
    } catch (err) {
        console.log('Error in Fetch company Saga', err);
    }
}

function* addCompany(action) {
    try {
        yield axios.post('/api/company/', action.payload);
        yield put({ type: 'FETCH_COMPANY' });
    } catch (err) {
        console.log('Error in Add company Saga', err);
    }
}

function* archiveCompany(action){
    try{
        console.log('Archiving company with id', action.payload)
        yield axios.put(`/api/company/${action.payload}`);
        yield put({type:'FETCH_COMPANY'});
    }catch(err){
        console.log('Error in Archive Company Saga', err);
    }
}

function* companySaga(){
    yield takeLatest('FETCH_COMPANY', fetchCompany);
    yield takeLatest('ADD_COMPANY', addCompany);
    yield takeLatest('ARCHIVE_COMPANY', archiveCompany);
}

export default companySaga;