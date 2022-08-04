import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* projects(action) {
    // get all projects from the DB
    try {
        const response = yield axios.get(`/api/projects/${action.payload.companyID}`);
        yield put({ type: 'GET_PROJECTS', payload: response.data });

    } catch(err) {
        console.error('get project error',err);
    }
        
}

function* allProjects(action) {
    // get all projects from the DB
    try {
        const projects = yield axios.get(`/api/projects`);
        yield put({ type: 'GET_ALLPROJECTS', payload: projects.data });

    } catch {
        console.error('get all PROJECTS error');
    }
        
}


function* fetchProjects(){
    yield takeEvery('FETCH_PROJECTS',projects);
    yield takeEvery('FETCH_ALLPROJECTS',allProjects)

}

export default fetchProjects