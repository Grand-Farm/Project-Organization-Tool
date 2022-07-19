import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* projects() {
    // get all projects from the DB
    try {
        const projects = yield axios.get(`/api/projects`);
        console.log('get all of projects:', projects.data);
        yield put({ type: 'GET_PROJECTS', payload: projects.data });

    } catch {
        console.log('get all error');
    }
        
}


function* fetchProjects(){
    yield takeEvery('FETCH_PROJECTS',projects);

}

export default fetchProjects