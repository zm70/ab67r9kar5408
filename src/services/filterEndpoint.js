// import axios from 'axios';
import httpClient from './restService';
import { getData } from './cacheHandler';
import { parseErrors } from './helper';

export const getCities = () => {
  return getData('/panel/addresses/cities', 999999999)
    .then((cityList) => {
      console.log(cityList);

      return cityList;
    })
    .catch((err) => {
      console.log(err);
      throw parseErrors(err);
    });
};

export const getProvince = () => {
  return getData('/panel/addresses/provinces', 999999999)
    .then((provinceList) => {
      console.log(provinceList);

      return provinceList;
    })
    .catch((err) => {
      console.log(err);
      throw parseErrors(err);
    });
};

export const searchOnMap = (body) => {
  return httpClient({
    method: 'POST',
    url: '/searchBusinessesOnMap',
    data: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(({ data }) => {
      return data.data;
    })
    .catch((err) => {
      throw parseErrors(err);
    });
};

export const filterCategories = (cat) => {

  return httpClient({
    method: 'GET',
    url: `/businesses/${cat}`
  })
    .then(({data}) => {
      console.log(data);

      return data.data;
    })
    .catch((err) => {
      console.log(err);
      throw parseErrors(err);
    });
  // return getData(`http://abrikaar.com/businesses/${encodeURIComponent(cat)}`)
  //   .then((categories) => {
  //     console.log(categories);

  //     return categories;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     throw parseErrors(err);
  //   });
};
