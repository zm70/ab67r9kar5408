import AsyncStorage from '@react-native-community/async-storage';
import { put } from 'redux-saga/effects';
import { getUserInfo } from 'AppServices';

import * as actions from '../actions/action';
import * as keys from './asyncKeys';

export function* getAsyncSaga(action) {
  let data;
  try {
    data = yield AsyncStorage.multiGet([keys.accessToken, keys.showCaution]);
    if (data) yield put(actions.getDataSuccess(data));
    else if (!data[0][1]) yield put(actions.startSignIn());
  } catch {
    yield put(actions.internalErorr());
  }
}

export function* setTokenSaga(action) {
  try {
    yield AsyncStorage.setItem(keys.accessToken, JSON.stringify(action.token));
    yield put(actions.setTokenSuccess(action.token));
  } catch {
    yield put(actions.internalErorr());
  }
}

export function* setCaution(action) {
  try {
    yield AsyncStorage.setItem(keys.showCaution, `${action.showCaution}`);
    yield put(actions.setCautionSuccess(action.showCaution));
  } catch (error) {
    console.log(error);
    yield put(actions.internalErorr());
  }
}

export function* saveUserShare({ share }) {
  try {
    let data = yield AsyncStorage.getItem(keys.shares);
    data = JSON.parse(data) || [];
    data.push(share);

    yield AsyncStorage.setItem(keys.shares, JSON.stringify(data));
    yield put(actions.setShareSuccess(data));
  } catch (err) {
    console.log(err);
    yield put(actions.internalErorr());
  }
}

export function* getAsyncProfile(action) {
  let data;
  try {
    data = yield AsyncStorage.multiGet([keys.bookMarks, keys.shares]);
    const bookmarks = JSON.parse(data[0][1]) || {};

    const shares = JSON.parse(data[1][1]) || [];

    if (data) yield put(actions.getAsyncProfileSuccess({ bookmarks, shares }));
  } catch (err) {
    console.log(err);
    yield put(actions.internalErorr());
  }
}

export function* getAsyncBookmarksSaga() {
  let data;
  try {
    data = yield AsyncStorage.getItem(keys.bookMarks);
    const bookmarks = JSON.parse(data) || [];
    if (data) yield put(actions.getAsyncBookmarkSuccess(bookmarks));
  } catch (err) {
    console.log(err);
    yield put(actions.internalErorr());
  }
}

export function* setAsyncBookmarksSaga({ bookmarks }) {
  try {
    let data = yield AsyncStorage.getItem(keys.bookMarks);
    data = JSON.parse(data) || {};
    data[bookmarks.product_key] = bookmarks;

    yield AsyncStorage.setItem(keys.bookMarks, JSON.stringify(data));
    yield put(actions.setBookmarkSuccess(data));
  } catch (err) {
    console.log(err);
    yield put(actions.internalErorr());
  }
}

export function* remvoveAsyncBookmarksSaga({ bookmarks }) {
  try {
    let data = yield AsyncStorage.getItem(keys.bookMarks);
    data = JSON.parse(data) || {};
    delete data[bookmarks.product_key];
    yield AsyncStorage.setItem(keys.bookMarks, JSON.stringify(data));
    yield put(actions.removeBookmarkByIdSuccess(data));
  } catch (err) {
    console.log(err);
    yield put(actions.internalErorr());
  }
}

export function* addCurrentUserToChannel(params) {
  yield put(actions.internalErorr());
}

export function* sagaGetCatIdArrays({ catIdArray }) {
  try {
    let data = yield AsyncStorage.getItem(keys.catIdArrays);
    data = JSON.parse(data) || [];
    if (catIdArray !== -100) {
      if (data && data.length > 5) {
        data.splice(0, 1);
      }

      data.push(catIdArray);
      yield AsyncStorage.setItem(keys.catIdArrays, JSON.stringify(data));
    }
    console.log('catIdArray');
    console.log(data);


    yield put(actions.getCatIdArraysSuccess(data));
  } catch (err) {
    console.log(err);
    yield put(actions.internalErorr());
  }
}

export function* asyncSaveUserData({ userInfo }) {
  try {
    yield AsyncStorage.setItem(keys.userInfo, JSON.stringify(userInfo));
    yield put(actions.saveUserDataSuccess(userInfo));
  } catch (err) {
    console.log(err);
    yield put(actions.internalErorr());
  }
}

export function* getAsyncUserData() {
  let data;
  try {
    data = yield AsyncStorage.getItem(keys.userInfo);

    if (!data || typeof (data) === "string") {

      data = yield getUserInfo();

      yield AsyncStorage.setItem(keys.userInfo, JSON.stringify(data));
    } else {
      data = JSON.parse(data);
    }
    console.log(data);
    yield put(actions.saveUserDataSuccess(data));
  } catch (err) {
    console.log(err);
    yield put(actions.dipatchTokenNotValid());
  }
}
