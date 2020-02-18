// import { getData } from './cacheHandler';
import { convertToFormdata, parseErrors } from './helper';
import httpClient from './restService';
httpClient.defaults.timeout = 15000;
export const bestBusinesses = () => {
  return httpClient('/index/bestBusinesses')
    .then(({data}) => {
      return data.data;
    })
    .catch((err) => {
      throw parseErrors(err);
    });
};

export const selectedBusinesses = () => {
  return httpClient('/index/selectedBusinesses')
    .then(({data}) => {
      
      return data.data;
    })
    .catch((err) => {
      console.log(err);
      throw parseErrors(err);
    });
};

export const randomBusiness = () => {
  return httpClient('/index/randomBusiness')
    .then(({data}) => {
      

      return data.data;
    })
    .catch((err) => {
      console.log(err);
      throw parseErrors(err);
    });
};

export const moreViewBusiness = () => {
  return httpClient('/index/moreViewBusiness')
    .then(({data}) => {
      

      return data.data;
    })
    .catch((err) => {
      console.log(err);
      throw parseErrors(err);
    });
};

export const newestBusinesses = () => {
  return httpClient('/index/newestBusinesses')
    .then(({data}) => {
      

      return data.data;
    })
    .catch((err) => {
      console.log(err);
      throw parseErrors(err);
    });
};

export const suggBusinesses = () => {
  return httpClient('/panel/suggestBusinesses')
    .then(({data}) => {
      return data.data;
    })
    .catch((err) => {
      console.log(err);
      throw parseErrors(err);
    });
};

export const followingProducts = () => {
  return httpClient('/panel/followingProducts')
    .then(({data}) => {
      return data.data;
    })
    .catch((err) => {
      console.log(err);
      throw parseErrors(err);
    });
};

export const recomendedProducts = () => {
  return httpClient('/panel/followingProducts')
    .then(({data}) => {
      return data.data;
    })
    .catch((err) => {
      console.log(err);
      throw parseErrors(err);
    });
};




// fetchSuggestBusinesses = (catIdArrays) => {
//   panelSuggestBusinesses({ cat_id_array: catIdArrays })
//     .then((suggestBusinesses) => {
//       this.setState({ suggestBusinesses });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
