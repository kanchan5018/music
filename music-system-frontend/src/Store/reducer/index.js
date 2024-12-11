import { combineReducers } from 'redux'
import userReducer from '../../redux/UserReducer/reducer';
import playlistReducer from '../../redux/playList/reducer';
export const rootReducer = combineReducers({
  User: userReducer,
  Playlist: playlistReducer
})

