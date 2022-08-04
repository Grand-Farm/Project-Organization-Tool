import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* projects(action) {
    // add projects to the DB
    try {
        const projects = yield axios.post(`/api/projects`,action.payload);
        yield put({ type: 'FETCH_PROJECTS', payload: action.payload });

    } catch(err) {
        console.error('get all error',err);
    }
        
}


function* newProject(){
    yield takeEvery('ADD_PROJECTS',projects);

}

export default newProject