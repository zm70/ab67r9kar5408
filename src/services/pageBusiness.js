import httpClient from './restService';
import { convertToFormdata, parseErrors } from './helper';

export const getListProducts = (id) => {
  return httpClient(`/business/${id}/products`)
    .then(({data}) => {
      return data.data;
    })
    .catch((err) => {
      throw parseErrors(err);
    });
};

export const getPageSingleBusiness = (id, title) => {
  return httpClient(`/business/${id}/${title}`)
    .then(({data}) => {
      return data.data;
    })
    .catch((err) => {
      throw parseErrors(err);
    });
};

export const listFollowBusiness = () => {
  return httpClient({
    method: 'GET',
    url: `/panel/followings`
  })
    .then(({ data }) => {
      return data.data;
    })
    .catch((err) => {
      throw parseErrors(err);
    });
};

export const httpSuggestBusinesses = (id) => {
  return httpClient(`/suggestBusinesses/${id}`)
    .then(({data}) => {
      console.log(business);

      return data.data;
    })
    .catch((err) => {
      console.log(err);
      throw parseErrors(err);
    });
};


export const likeProduct = (body) => {
  const requestBody = convertToFormdata(body);
  return httpClient({
    method: 'POST',
    url: `/products/like`,
    data: requestBody,
    headers: { 'Content-Type': 'application/json' }
  })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      throw parseErrors(err);
    });
};

export const dislikeProduct = (body) => {
  const requestBody = convertToFormdata(body);
  return httpClient({
    method: 'POST',
    url: `/products/dislike`,
    data: requestBody,
    headers: { 'Content-Type': 'application/json' }
  })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      throw parseErrors(err);
    });
};

export const getProductById = (product_id, name) => {
  return httpClient({
    method: 'GET',
    url: `/product/${product_id}/${name}`
  })
    .then(({ data }) => {
      console.log(data);
      return data.data;
    })
    .catch((err) => {
      console.log(err);
      throw parseErrors(err);
    });
};

export const createOpinios = (body) => {
  const requestBody = convertToFormdata(body);
  return httpClient({
    method: 'POST',
    url: `/opinions/create`,
    data: requestBody,
    headers: { 'Content-Type': 'application/json' }
  })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      throw parseErrors(err);
    });
};

export const getDetailBusiness = (bId) => {
  return httpClient({
    method: 'GET',
    url: `/showBusinessInfo/${bId}`
  })
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
      throw parseErrors(err);
    });
};