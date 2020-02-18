import AsyncStorage from '@react-native-community/async-storage';
import { put, call } from 'redux-saga/effects';
import { followBusinessById } from 'AppServices';
import * as actions from '../actions/serverAcitons';

export function* FollowBusinessSaga(action) {
  try {
      
    let data = yield followBusinessById(action.id, action.bId);

  } catch (err) {
    console.log(err);
  }
}
