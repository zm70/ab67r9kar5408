import { takeEvery, all } from 'redux-saga/effects';
import * as actionType from '../actions/actionType';
import {
  getAsyncSaga,
  setTokenSaga,
  setCaution,
  addCurrentUserToChannel,
  saveUserShare,
  getAsyncProfile,
  getAsyncBookmarksSaga,
  setAsyncBookmarksSaga,
  remvoveAsyncBookmarksSaga,
  sagaGetCatIdArrays,
  getAsyncUserData,
  asyncSaveUserData
} from './user';
import {
  getAsyncUserCartSaga,
  addAsyncUserCartSaga,
  subAsyncUserCartSaga,
  removeAsyncUserCartSaga,
  emptyCart
} from './shop';

export function* watchAuth() {
  yield all([
    takeEvery(actionType.INITIATE_GET_ASYNC_DATA, getAsyncSaga),
    takeEvery(actionType.GET_USER_DATA, getAsyncUserData),
    takeEvery(actionType.SAVE_USER_DATA, asyncSaveUserData),
    takeEvery(actionType.INITIATE_SET_ACCESS_TOKEN, setTokenSaga),
    takeEvery(actionType.INITIATE_SET_SHOW_CAUTION, setCaution),
    takeEvery(actionType.GET_USER_BOOKMARK, getAsyncBookmarksSaga),
    takeEvery(actionType.SET_USER_BOOKMARK, setAsyncBookmarksSaga),
    takeEvery(actionType.REMOVE_BOOKMARK_BY_ID, remvoveAsyncBookmarksSaga),
    takeEvery(actionType.SET_USER_SHARE, saveUserShare),
    takeEvery(actionType.GET_USER_ASYNC_PROFILE, getAsyncProfile),
    takeEvery(actionType.GET_USER_CART_ITEMS, getAsyncUserCartSaga),
    takeEvery(actionType.ADD_USER_CART_ITEMS, addAsyncUserCartSaga),
    takeEvery(actionType.SUB_CART_ITEMS, subAsyncUserCartSaga),
    takeEvery(actionType.REMOVE_CART_ITEMS_BY_ID, removeAsyncUserCartSaga),
    takeEvery(actionType.SHARE_URL, addCurrentUserToChannel),
    takeEvery(actionType.EMPTY_CART, emptyCart),
    takeEvery(actionType.GET_RECOMMENDAR_CAT_ID_ARRAYS, sagaGetCatIdArrays)
  ]);
}
