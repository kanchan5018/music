import { put, takeLatest, call, all } from 'redux-saga/effects';
import { ActionTypes } from './action'; // Assuming your actionTypes file
import { postRequestAPI, getRequestAPI, deleteRequestApi } from '../../service/api';
import {  toast } from "react-toastify";


// Create Playlist Saga
function* createPlaylistSaga(action) {
  try {
    const userId = action.payload.userId; // Get the userId from the action payload

    const response = yield call(postRequestAPI, {
      url: 'playlist/create',
      data: { ...action.payload, user_id: userId }, // Include the user_id
    });

    if (response?.data?.success) {
      yield put({ type: ActionTypes.CREATE_PLAYLIST_SUCCESS, payload: response.data.data });
      toast.success("Playlist created successfully!"); // Success toast notification
    } else {
      const errorMessage = response?.data?.message || "Error creating playlist";
      yield put({ type: ActionTypes.CREATE_PLAYLIST_FAILURE, payload: errorMessage });
      toast.error(errorMessage); // Error toast notification
    }
  } catch (err) {
    const errorMessage = err?.response?.data || err.message;
    yield put({ type: ActionTypes.CREATE_PLAYLIST_FAILURE, payload: errorMessage });
    toast.error("An unexpected error occurred. Please try again later."); // Generic error toast notification
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
	try {
	  const playlistId = action.payload.id; // Extract the playlist ID
	  const response = yield call(postRequestAPI, {
		url: `playlist/update/${playlistId}`, // Use template literal for clarity
		data: action.payload,
	  });
  
	  if (response?.data?.success) {
		yield put({ type: ActionTypes.UPDATE_SUCCESS, payload: response.data.data });
		toast.success("Playlist updated successfully!"); // Success toast notification
	  } else {
		const errorMessage = response?.data?.message || "Error updating playlist";
		yield put({ type: ActionTypes.UPDATE_FAILURE, payload: errorMessage });
		toast.error(errorMessage); // Error toast notification
	  }
	} catch (err) {
	  const errorMessage = err?.response?.data || err.message;
	  yield put({ type: ActionTypes.UPDATE_FAILURE, payload: errorMessage });
	  toast.error("An unexpected error occurred. Please try again later."); // Generic error toast notification
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
