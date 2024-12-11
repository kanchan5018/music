import { put, takeLatest, call, all } from 'redux-saga/effects';
import { ActionTypes } from './action'; // Assuming your actionTypes file
import { postRequestAPI, getRequestAPI, deleteRequestApi } from '../../service/api';

// Create Playlist Saga
function* createPlaylistSaga(action) {
	try {
	  const userId = action.payload.userId;  // Get the userId from the action payload
	  const response = yield call(postRequestAPI, {
		url: 'playlist/create',
		data: { ...action.payload, user_id: userId }  // Include the user_id
	  });
  
	  if (response?.data?.success) {
		yield put({ type: ActionTypes.CREATE_PLAYLIST_SUCCESS, payload: response.data.data });
	  } else {
		yield put({ type: ActionTypes.CREATE_PLAYLIST_FAILURE, payload: response.data.message });
	  }
	} catch (err) {
	  yield put({ type: ActionTypes.CREATE_PLAYLIST_FAILURE, payload: err?.response?.data || err.message });
	}
  }
  

// Get All Playlists Saga
function* getAllPlaylistsSaga(action) {
	try {
	  const userId = action.payload.userId;  // Get the userId from the action payload
	  const response = yield call(getRequestAPI, {
		url: `playlist/playlists/${userId}`  // Pass the userId in the URL
	  });
  
	  if (response?.data) {
		yield put({ type: ActionTypes.GET_ALL_PLAYLIST_SUCCESS, payload: response.data });
	  } else {
		yield put({ type: ActionTypes.GET_ALL_PLAYLIST_FAILURE, payload: 'Failed to fetch playlists' });
	  }
	} catch (err) {
	  yield put({ type: ActionTypes.GET_ALL_PLAYLIST_FAILURE, payload: err?.response?.data || err.message });
	}
  }
  

// Update Playlist Saga
function* updatePlaylistSaga(action) {
	console.log(action.payload.id)
	try {
	  const response = yield call(postRequestAPI, {
		url: `playlist/update/${action.payload.id}`,
		data: action.payload
	  });
  
	  if (response?.data?.success) {
		yield put({ type: ActionTypes.UPDATE_SUCESS, payload: response.data.data });
	  } else {
		yield put({ type: ActionTypes.UPDATE_FAILURE, payload: response.data.message });
	  }
	} catch (err) {
	  yield put({ type: ActionTypes.UPDATE_FAILURE, payload: err?.response?.data || err.message });
	}
  }
  
  function* deletePlaylistSaga(action) {
	try {
	  const response = yield call(deleteRequestApi, {
		url: `playlist/delete/${action.payload.id}`, // Assuming your API expects a DELETE request
	  });
  
	  if (response?.data?.success) {
		yield put({ type: ActionTypes.DELETE_PLAYLIST_SUCCESS, payload: action.payload.id });
	  } else {
		yield put({ type: ActionTypes.DELETE_PLAYLIST_FAILURE, payload: response.data.message });
	  }
	} catch (err) {
	  yield put({ type: ActionTypes.DELETE_PLAYLIST_FAILURE, payload: err?.response?.data || err.message });
	}
  }
  

// Watcher Saga to listen for dispatched actions
function* watchPlaylistRequest() {
  yield takeLatest(ActionTypes.CREATE_PLAYLIST_REQUEST, createPlaylistSaga);
  yield takeLatest(ActionTypes.GET_ALL_PLAYLIST_REQUEST, getAllPlaylistsSaga);
  yield takeLatest(ActionTypes.UPDATE_REQUEST, updatePlaylistSaga);
  yield takeLatest(ActionTypes.DELETE_PLAYLIST_REQUEST,deletePlaylistSaga)
}

// Combine all sagas
export default function* playlistSaga() {
  yield all([call(watchPlaylistRequest)]);
}
