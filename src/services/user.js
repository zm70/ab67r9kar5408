import httpClient from './restService';
import { convertToFormdata, parseErrors } from './helper';
import AppConfig from 'AppConfig';

export const httpUpdateUserInfo = (body, id) => {
  const requestBody = convertToFormdata(body);
  // const requestBody = JSON.stringify(body);

  return httpClient({
    method: 'POST',
    url: `/panel/complete_profile/${id}`,
    data: requestBody
  })
    .then(({ data }) => data.data)
    .catch((err) => {
      throw parseErrors(err);
    });
};


export const changeAvatar = (body, id) => {
  // const requestBody = convertToFormdata(body);
  const requestBody = JSON.stringify(body);

  return httpClient({
    method: 'POST',
    url: `/panel/changeAvatar/${id}`,
    data: requestBody
  })
    .then(({ data }) => data.data)
    .catch((err) => {
      throw parseErrors(err);
    });
};

export const deleteAddress = (id) => {
  return httpClient({
    method: 'DELETE',
    url: `/panel/addresses/${id}`
  })
    .then(({ data }) => {
      console.log(data);
      return data.data;
    })
    .catch((err) => {
      throw parseErrors(err);
    });
};

export const getUserAddress = () => {
  return httpClient({
    method: 'GET',
    url: `/panel/addresses`
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

export const createUserAddress = (body) => {
  return httpClient({
    method: 'POST',
    url: `/panel/addresses`,
    data: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((res) => res)
    .catch((err) => {
      throw parseErrors(err);
    });
};

export const completeOrder = (body) => {
  return httpClient({
    method: 'POST',
    url: `/panel/orders`,
    data: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((res) => res)
    .catch((err) => {
      throw parseErrors(err);
    });
};

export const MoneyRequest = (body) => {
  return httpClient({
    method: 'POST',
    url: `/panel/withdraw-request`,
    data: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((res) => res)
    .catch((err) => {
      throw parseErrors(err);
    });
};

export const getRealtimePrice = (body) => {
  const requestBody = convertToFormdata(body);
  return httpClient({
    method: 'POST',
    url: `/card/products`,
    data: requestBody,
    headers: { 'Content-Type': 'application/json' }
  })
    .then((res) => res)
    .catch((err) => {
      throw parseErrors(err);
    });
};

export const flyToSelectedCity = (body) => {
  const filter = {
    text: `${body.city_name}`,
    $select: 'city',
    $filter: `province eq ${body.province_name},city eq ${body.city_name}`
  };
  console.log(filter);
  return fetch(`https://map.ir/search/v2`, {
    method: 'POST',
    body: JSON.stringify(filter),
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': `${AppConfig.apiConfig.mapkey}`
    }
  })
    .then((res) => res.json())
    .then((jsonResult) => jsonResult)
    .catch((err) => {
      throw parseErrors(err);
    });
};

// export const httpUpdateAdditionalUserInfo = (body, id) => {
//   return httpClient({
//     method: 'PUT',
//     url: `/panel/update/additional_info/${id}`,
//     data: JSON.stringify(body),
//     headers: { 'Content-Type': 'application/json' }
//   })
//     .then(({ data }) => {
//       console.log(data);
//       return data.data;
//     })
//     .catch((err) => {
//       console.log(err);
//       throw err;
//     });
// };

export const getUserInfo = () => {
  return httpClient
    .get('/panel/user')
    .then(({ data }) => {
      return data.data;
      // this.setState({ userInfo: data && data.data });
    })
    .catch((err) => {
      console.log(err);
      throw parseErrors(err);
    });
};

export const userLogin = (userInfo) => {
  const body = {
    'username': `${userInfo.username}`,
    'password': `${userInfo.password}`,
    'client_id': `1`,
    'scope': `*`,
    'grant_type': `password`,
    'client_secret': `9PmsI6appAAffBXLY1CcOKLMEdhgaSG5yxyByjMo`
  };
  const requestBody = convertToFormdata(body);
  return httpClient({
    method: 'POST',
    url: `/login`,
    data: requestBody
  })
    .then((res) => res)
    .catch((err) => {
      throw parseErrors(err);
    });
};

export const askRegistrationCode = (mobile) => {
  const body = {
    'mobile': `${mobile}`
  };
  const requestBody = convertToFormdata(body);

  const config = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  return httpClient({
    method: 'POST',
    url: '/register/request_activation_code',
    data: requestBody,
    config
  })
    .then((res) => res)
    .catch((err) => {
      console.log(err)
      throw parseErrors(err);
    });
};

export const userSignup = (body) => {
  const requestBody = convertToFormdata(body);

  const config = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  return httpClient({
    method: 'POST',
    url: `/register`,
    data: requestBody,
    config
  })
    .then((res) => res)
    .catch((err) => {
      throw parseErrors(err);
    });
};



export const httpLogout = () => {
  return httpClient({
    method: 'POST',
    url: `/logout`
  })
    .then((res) => res)
    .catch((err) => {
      console.log(err)
      throw parseErrors(err);
    });
};
