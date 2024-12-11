import { all, call, fork } from 'redux-saga/effects';
import user from '../../redux/UserReducer/saga';
import playlist from '../../redux/playList/saga';
export default function* rootSaga() {
  yield all([
    call(user),
    call(playlist)
  ]);
}
