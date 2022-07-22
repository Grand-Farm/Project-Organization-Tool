import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* projects(action) {
    // get all projects from the DB
    try {
                const response = yield axios.get(`/api/projects/${action.payload.companyID}`);
        console.log('get all of projects:', action.payload);
        yield put({ type: 'GET_PROJECTS', payload: response.data });

    } catch(err) {
        console.log('get all error',err);
    }
        
}


function* fetchProjects(){
    yield takeEvery('FETCH_PROJECTS',projects);

}

export default fetchProjects