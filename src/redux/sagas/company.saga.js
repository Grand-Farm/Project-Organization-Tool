import axios from 'axios';
import { put, take, takeLatest } from 'redux-saga/effects';

function* fetchCompany() {
    try {
        const response = yield axios.get('/api/company');
        yield put({ type: 'SET_COMPANY', payload: response.data });
    } catch (err) {
        console.error('Error in Fetch company Saga', err);
    }
}

function* fetchCompanyInfo(){
    try{
        const response = yield axios.get('api/company/pro');
        yield put({type: 'SET_COMPANYINFO', payload: response.data});
    }catch(err){
        console.error('ERROR in Fetch company info saga', err);
    }
}

function* addCompany(action) {
    try {
        yield axios.post('/api/company/', action.payload);
        yield put({ type: 'FETCH_COMPANY' });
    } catch (err) {
        console.error('Error in Add company Saga', err);
    }
}

function* archiveCompany(action){
    try{
        console.error('Archiving company with id', action.payload)
        yield axios.put(`/api/company/arc/${action.payload}`);
        yield put({type:'FETCH_COMPANY'});
    }catch(err){
        console.error('Error in Archive Company Saga', err);
    }
}

function* updateCompany(action){
    try{
        yield axios.put(`/api/company/${action.payload.id}`,action.payload);
        yield put({type:'FETCH_COMPANY'});
    }catch(err){
        console.error('Error in Update Company saga', err);
    }
}

function* companySaga(){
    yield takeLatest('FETCH_COMPANY', fetchCompany);
    yield takeLatest('FETCH_COMPANYINFO', fetchCompanyInfo);
    yield takeLatest('ADD_COMPANY', addCompany);
    yield takeLatest('ARCHIVE_COMPANY', archiveCompany);
    yield takeLatest('UPDATE_COMPANY', updateCompany);
}

export default companySaga;