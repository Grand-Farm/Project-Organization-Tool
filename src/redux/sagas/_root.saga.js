import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
<<<<<<< HEAD
import fetchProjects from './projects.saga';
import statusSaga from './status.saga';
=======
import companySaga from './company.saga';
>>>>>>> e95c8b3812493fb729350c97954640420f7ef287

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
<<<<<<< HEAD
    fetchProjects(),
    statusSaga(),
=======
    companySaga(),
>>>>>>> e95c8b3812493fb729350c97954640420f7ef287
  ]);
}
