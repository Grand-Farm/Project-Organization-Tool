import axios from 'axios';
import { put,takeEvery } from 'redux-saga/effects';


function* updateStatus(action) {
    // add a rating to a book
    try {
        console.log(action.payload)
         yield axios.put(`/api/projects/${action.payload.ProjectID}`,action.payload);
         yield put({ type: 'FETCH_PROJECTS'})
        console.log('updating the status:', action.payload);

    } catch {
        console.log('update status error',error);
    }
        
}


function* statusSaga(){
    yield takeEvery('STATUS', updateStatus);

}


export default statusSaga