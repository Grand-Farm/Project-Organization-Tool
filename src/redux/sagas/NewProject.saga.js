import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* projects(action) {
    // add projects to the DB
    try {
        console.log("made it to the saga",action.payload.companyID);
        const projects = yield axios.post(`/api/projects`,action.payload);
        console.log('get all of projects:', projects.data);
        yield put({ type: 'FETCH_PROJECTS', payload: action.payload });

    } catch(err) {
        console.log('get all error',err);
    }
        
}


function* newProject(){
    yield takeEvery('ADD_PROJECTS',projects);

}

export default newProject