import { put, takeLatest, call, all } from 'redux-saga/effects';
import { ActionTypes} from './action';
import { postWithoutHeaderRequestAPI} from '../../service/api';




function* registerUserSaga(action) {
	try {
		const response = yield call(postWithoutHeaderRequestAPI, { url: 'user/register', data: action.payload });
		if (response?.data?.status === 'success') {
			localStorage.removeItem('token');
			yield put({ type: ActionTypes.REGISTRATION_SUCCESS, data: response.data });
		} else {
			yield put({ type: ActionTypes.REGISTRATION_FAILURE, error: response.data });
		}
	} catch (err) {
		yield put({ type: ActionTypes.REGISTRATION_FAILURE, error: err?.response?.data });
	}
}



function* loginUserSaga(action) {
	try {
		const response = yield call(postWithoutHeaderRequestAPI, { url: 'user/login', data: action.payload });
		if (response?.data?.status === 'success') {
			yield put({ type: ActionTypes.LOGIN_SUCCESS, data: response.data });
		} else {
			yield put({ type: ActionTypes.LOGIN_FAILURE, error: response.data });
		}
	} catch (err) {
		yield put({ type: ActionTypes.LOGIN_FAILURE, error: err?.response?.data });
	}
}

  

function* watchUserRequest() {
  yield takeLatest(ActionTypes.REGISTRATION_REQUEST, registerUserSaga);
  yield takeLatest(ActionTypes.LOGIN_REQUEST, loginUserSaga);
}

function* UserSaga() {
  yield all([call(watchUserRequest)]);
}

export default UserSaga;