import CacheStore from 'react-native-cache-store';
import axios from './restService';
import ApiConfig from 'AppConfig';

const CACHE_TIME = 60; // in minute

async function getDataFromServer(url, cache_time=CACHE_TIME) {

  return axios
    .get(url)
    .then(async ({ data }) => {
      await CacheStore.set(url, data.data, cache_time);
      return data.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getData(key, cache_time = CACHE_TIME) {
  return CacheStore.get(key)
    .then((value) => {

      if (!value) {
        return getDataFromServer(key, cache_time);
      }
      return new Promise((resolve, reject) => resolve(value));
    })
    .catch((e) => {
      return getDataFromServer(key, cache_time);
    });
}
