export const ActionTypes = {

  CREATE_PLAYLIST_REQUEST: 'CREATE_PLAYLIST_REQUEST',
  CREATE_PLAYLIST_SUCCESS: 'CREATE_PLAYLIST_SUCCESS',
  CREATE_PLAYLIST_FAILURE: 'CREATE_PLAYLIST_FAILURE',

  GET_ALL_PLAYLIST_REQUEST: 'GET_ALL_PLAYLIST_REQUEST',
  GET_ALL_PLAYLIST_SUCCESS: 'GET_ALL_PLAYLIST_SUCCESS',
  GET_ALL_PLAYLIST_FAILURE: 'GET_ALL_PLAYLIST_FAILURE',

  UPDATE_REQUEST: 'UPDATE_REQUEST',
  UPDATE_SUCESS: 'UPDATE_SUCCESS',
  UPDATE_FAILURE: 'UPDATE_FAILURE',

  DELETE_PLAYLIST_REQUEST: 'DELETE_PLAYLIST_REQUEST',
  DELETE_PLAYLIST_SUCCESS: 'DELETE_PLAYLIST_SUCCESS',
  DELETE_PLAYLIST_FAILURE: 'DELETE_PLAYLIST_FAILURE',

};


export const createplaylistRequest = (createData) => {
  return {
    type: ActionTypes.CREATE_PLAYLIST_REQUEST,
    payload: createData,
  };
};

export const getallRequest = (getalldata) => {
  console.log("getalldata", getalldata)
  return {
    type: ActionTypes.GET_ALL_PLAYLIST_REQUEST,
    payload: getalldata,
  };
};

export const updateRequest = (updateData) => {
  console.log("updateData", updateData)
  return {
    type: ActionTypes.UPDATE_REQUEST,
    payload: updateData
  }
}
export const deletePlaylistRequest = (playlistId) => {
  return {
    type: ActionTypes.DELETE_PLAYLIST_REQUEST,
    payload: { id: playlistId },
  };
};
