import AsyncStorage from '@react-native-community/async-storage';
import { put } from 'redux-saga/effects';

import * as actions from '../actions/action';
import * as keys from './asyncKeys';
import { updateObject } from 'AppUtils';

export function* getAsyncUserCartSaga() {
  let data;
  try {
    data = yield AsyncStorage.getItem(keys.cartItems);

    if (data) yield put(actions.getAsyncUserCartSuccess(data));
  } catch {
    yield put(actions.internalErorr());
  }
}

export function* addAsyncUserCartSaga({ product }) {
  try {
    let data = yield AsyncStorage.getItem(keys.cartItems);
    data = JSON.parse(data) || {};

    if (product.product_key in data) {
      const key = product.product_key;
      const newCount = {};
      newCount[key] = updateObject(data[key], {
        count: data[key].count + 1 || 1
      });

      data = updateObject(data, {
        ...newCount
      });
      console.log(data);
    } else {
      data[product.product_key] = { ...product, count: 1 };
    }
    console.log(data);

    yield AsyncStorage.setItem(keys.cartItems, JSON.stringify(data));
    yield put(actions.addUserCartSuccess(data));
  } catch (err) {
    console.log(err);
    yield put(actions.internalErorr());
  }
}

export function* subAsyncUserCartSaga({ product }) {
  try {
    let data = yield AsyncStorage.getItem(keys.cartItems);
    data = JSON.parse(data) || {};

    if (product.product_key in data) {
      const key = product.product_key;
      const newCount = {};
      if (data[key].count - 1 === 0) {
        delete data[key];
      } else {
        newCount[key] = updateObject(data[key], {
          count: data[key].count - 1 || 0
        });
        data = updateObject(data, {
          ...newCount
        });
      }
    }
    console.log(data);

    yield AsyncStorage.setItem(keys.cartItems, JSON.stringify(data));
    yield put(actions.subUserCartSuccess(data));
  } catch (err) {
    console.log(err);
    yield put(actions.internalErorr());
  }
}

export function* emptyCart() {
  try {
    yield AsyncStorage.setItem(keys.cartItems, JSON.stringify({}));
    yield put(actions.emptyCartSuccess());

  } catch {
    yield put(actions.internalErorr());
  }
}


export function* removeAsyncUserCartSaga({ product_key }) {
  try {
    let data = yield AsyncStorage.getItem(keys.cartItems);
    data = JSON.parse(data) || {};

    const key = product_key;
    delete data[key];

    yield AsyncStorage.setItem(keys.cartItems, JSON.stringify(data));
    yield put(actions.removeUserCartSuccess(data));
  } catch (err) {
    console.log(err);
    yield put(actions.internalErorr());
  }
}
