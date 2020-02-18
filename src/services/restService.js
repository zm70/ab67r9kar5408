import axios from 'axios';
import ApiConfig from 'AppConfig';

const alreadySentRequests = [];

const httpClient = axios.create();

httpClient.defaults.baseURL = ApiConfig.apiConfig.apiEndpoint;
// httpClient.defaults.headers.common[
//   'Authorization'
// ] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImIzZGM1NmQxMmEwY2JlYzZjZDY5MjEwYmZhYzJiZTlkZTAzYmNmZTE2Nzc4NjBhMDRlMDJjNDBmOGIwNjI2ZWY0MThhZGYxYjRmOTM2MGM4In0.eyJhdWQiOiIxIiwianRpIjoiYjNkYzU2ZDEyYTBjYmVjNmNkNjkyMTBiZmFjMmJlOWRlMDNiY2ZlMTY3Nzg2MGEwNGUwMmM0MGY4YjA2MjZlZjQxOGFkZjFiNGY5MzYwYzgiLCJpYXQiOjE1NjkzMjQxMzYsIm5iZiI6MTU2OTMyNDEzNiwiZXhwIjoxNjAwOTQ2NTMzLCJzdWIiOiIxNiIsInNjb3BlcyI6WyIqIl19.I29xwaMQo8kUcAjpJ54oAZMhKn6WzDIxotJIq2vUTjcGjNoVjlYXblzBoSXf4FTotWHgF_TljV54-5UqUxFI8WCGQB1pT8Uc5pGtAoRiOAla3X2CdJ25ZpX3jyhxdbDisT_2M_2nxWLy9DgZvf5cMRmbOeRsITgRSLvYkATxdPBh8AYtEQb1tD8KtoTvG-kHPWu6IYsJx_UQ9KOBpXcKMQaZSPLDBlZRsIw9T_wDo-03VcsjL_OS3PQ9x_TG7j9EKT8zIEGpcYVJn8kO-dFB_zkOIs1vhAkLmqk5wf5AdttjBS6_y-CLRrsR92pu_e9wjNalZeCfdv0x9o4TjPQuo0o0u6tgwYDE8HAmzD4ataTOJ7mULmRk_uIKrS7QqthutAIT7uMVqCEMLQaLVL4I9hKONuIR6v7ngiLQopKQmXcpTZU-up5iKTfQaeLUccLzxbqW3YwrAZp7bDIit_ULX2jBLL8lgYvUB45R9CI4UTWPv-JrVdRSa9m2WsWoZVdAQeFi94cPQPYr_DllHHLtyqCQJ5bc82sbwCb9Sr_ImojpCvnNPML9Jwnia9IQZyDHIrZTGoXo44UqVNp6cbjV29IRha_Y5P4QxhfRSVNIhcSJw94ywm-L5eGKWaBQfxDVNYMewQk7f4I-ZsuR9m4QYuSN541UCXPHlvg-6HREudA`;
// getLang()
//     .then((lang) => {
//         httpClient.defaults.headers.common["applanguage"] = `${lang}`;
//     });

httpClient.interceptors.request.use(
  (request) => {
    // if (alreadySentRequests.includes(request.url)) {
    //   return;
    // }
    alreadySentRequests.push(request.url);
    // if (!request.headers.common.Authorization) {
    //   if (store.getState().user.token) {
    //     request.headers.common['Authorization'] = `${
    //       store.getState().user.token.token_type
    //     } ${store.getState().user.token.access_token}`;
    //   }
    // }
    if (__DEV__) {
      console.log(request);
    }
    // Edit request config
    return request;
  },
  (error) => {
    if (__DEV__) {
      console.log(error);
    }
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (respond) => {
    console.log(respond)
    // alreadySentRequests =  alreadySentRequests.filter(u=>respond.request.responseURL)
    return respond;
  }
)

httpClient.defaults.timeout = 15000;

export default httpClient;
