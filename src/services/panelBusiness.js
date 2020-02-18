import httpClient from './restService';
import { getData } from './cacheHandler';
import { convertToFormdata, parseErrors } from './helper';
import { requestField } from '../components/homeTab/myBusiness/helper';

export const getMyBusiness = () => {
  return httpClient
    .get('/panel/businesses')
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      throw parseErrors(err);
    });
};

export const editMyBusiness = (body, business_key) => {
  return httpClient({
    method: 'PUT',
    url: `/panel/businesses/${business_key}`,
    data: JSON.stringify(body),
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

export const createProduct = (body) => {
  return httpClient({
    method: 'POST',
    //url: `/panel/businesses/${body.product_key}`,
    url: `/panel/products`,
    data: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(({ data }) => {
      console.log(data.data);
      return data.data;
    })
    .catch((err) => {
      console.log(err);
      throw parseErrors(err);
    });
};

export const editProduct = (body) => {
  return httpClient({
    method: 'PUT',
    url: `/panel/products/${body.id}`,
    data: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(({ data }) => {
      console.log(data.data);
      return data.data;
    })
    .catch((err) => {

      console.log(err);
      throw parseErrors(err);
    });
};

export const deleteProduct = (product_id) => {
  return httpClient({
    method: 'DELETE',
    url: `/panel/products/${product_id}`
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

export const getMyProductById = (product_id) => {
  return httpClient({
    method: 'GET',
    url: `/panel/products/${product_id}`
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

export const getBusinessById = (business_key) => {
  return httpClient({
    method: 'GET',
    url: `/panel/businesses/${business_key}`
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

export const getAccounts = () => {
  return getData('/accounts/all')
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw parseErrors(err);
    });
};

export const followBusinessById = (body) => {
  console.log(body)
  const requestBody = convertToFormdata(body);
  return httpClient({
    method: 'POST',
    url: `/follow`,
    data: requestBody,
    headers: { 'Content-Type': 'application/json' }
  })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {

      throw parseErrors(err);
    });
};

export const craeteOrChangeBusiness = (bodyRequest) => {
  const body = { ...bodyRequest };
  if (!body[requestField['reagent_code']]) {
    delete body[requestField['reagent_code']];
  }
  return httpClient({
    method: 'POST',
    url: '/panel/businesses',
    data: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {

      throw parseErrors(err);
    });
};



export const deleteBusiness = (business_key) => {
  return httpClient({
    method: 'DELETE',
    url: `/panel/businesses/${business_key}`
  })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      throw parseErrors(err);
    });
};

export const panelSuggestBusinesses = (cat_id_array) => {
  const requestBody = convertToFormdata({ cat_id_array });
  return httpClient({
    method: 'POST',
    url: `/panel/suggestBusinesses`,
    data: requestBody
  })
    .then(({ data }) => {
      return data.data;
    })
    .catch((err) => {
      console.log(err);
      throw parseErrors(err);
    });
};

export const unfollowBusinessById = (body) => {
  const requestBody = convertToFormdata(body);
  return httpClient({
    method: 'POST',
    url: `/unFollow`,
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

export const getFollowers = (bId) => {
  return httpClient({
    method: 'GET',
    url: `/followers/${bId}`
  })
    .then(({ data }) => {
      return data.data;
    })
    .catch((err) => {
      console.log(err);
      throw parseErrors(err);
    });
};

export const getNotifications = () => {
  return httpClient({
    method: 'GET',
    url: `/panel/notifications`
  })
    .then(({ data }) => {
      console.log(data.data);
      return data.data;
    })
    .catch((err) => {
      console.log(err);
      throw parseErrors(err);
    });
};

export const getMyOrders = () => {
  return httpClient({
    method: 'GET',
    url: `/panel/orders`
  })
    .then(({ data }) => {
      console.log(data.data);
      return data.data;
    })
    .catch((err) => {
      console.log(err);
      throw parseErrors(err);
    });
};
export const getMoneyReq = () => {
  return httpClient({
    method: 'GET',
    url: `/panel/moneyRequests`
  })
    .then(({ data }) => {
      console.log(data.data);
      return data.data;
    })
    .catch((err) => {
      console.log(err);
      throw parseErrors(err);
    });
};

export const paymentForBusiness = (business) => {
  const requestBody = convertToFormdata(business);
  return httpClient({
    method: 'POST',
    url: `/panel/paymentForBusiness`,
    data: requestBody
  })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw parseErrors(err);
    });
}

export const voteForBusiness = (body) => {
  const requestBody = convertToFormdata(body);
  return httpClient({
    method: 'POST',
    url: `/vote`,
    data: requestBody
  })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw parseErrors(err);
    });
}

export const waitingForProductRequest = (productId) => {
  return httpClient({
    method: 'GET',
    url: `/panel/waitingForProductRequest/${productId}`
  })
    .then(({ data }) => {
      console.log(data)
      return data;
    })
    .catch((err) => {
      throw parseErrors(err);
    });
}

export const allBusinessesCoordinates = () => {

  return getData('/map/allBusinessesCoordinates', 60)
    .then((businesses) => {
      console.log(businesses);

      return businesses;
    })
    .catch((err) => {
      console.log(err);
      throw parseErrors(err);
    });
};