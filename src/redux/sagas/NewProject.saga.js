import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* projects() {
    // add projects to the DB
    try {
        const projects = yield axios.get(`/api/projects`);
        console.log('get all of projects:', projects.data);
        yield put({ type: 'GET_PROJECTS', payload: projects.data });

    } catch {
        console.log('get all error');
    }
        
}


function* newProject(){
    yield takeEvery('ADD_PROJECTS',projects);

}

export default newProject