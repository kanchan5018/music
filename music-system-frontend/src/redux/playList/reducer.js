import { ActionTypes } from './action'; // Assuming actionTypes file location

const initialState = {
  playlists: [],
  loading: false,
  error: null,
};

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_PLAYLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.CREATE_PLAYLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        playlists: [...state.playlists, action.payload], // Assuming action.payload is the created playlist
      };
    case ActionTypes.CREATE_PLAYLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // Assuming action.payload contains error info
      };

    case ActionTypes.GET_ALL_PLAYLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.GET_ALL_PLAYLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        playlists: action.payload, // Assuming action.payload contains all playlists
      };
    case ActionTypes.GET_ALL_PLAYLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // Assuming action.payload contains error info
      };

    case ActionTypes.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.UPDATE_SUCESS:
      return {
        ...state,
        loading: false,
        playlists: state.playlists.map(playlist =>
          playlist._id === action.payload._id ? action.payload : playlist
        ), // Ensure matching `_id` is used correctly
      };
    case ActionTypes.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // Assuming action.payload contains error info
      };
    case ActionTypes.DELETE_PLAYLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.DELETE_PLAYLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        playlists: state.playlists.filter((playlist) => playlist._id !== action.payload),
      };
    case ActionTypes.DELETE_PLAYLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default playlistReducer;
