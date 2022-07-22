import axios from 'axios';
import { put,takeEvery } from 'redux-saga/effects';


function* updateStatus(action) {
    // add a rating to a book
    try {
        console.log('fadsfafd',action.payload)
         yield axios.put(`/api/projects/${action.payload.ProjectID}`,action.payload);
         yield put({ type: 'FETCH_PROJECTS', payload:action.payload });
    } catch {
        console.log('update status error',error);
    }
        
}


function* statusSaga(){
    yield takeEvery('STATUS', updateStatus);

}


export default statusSaga