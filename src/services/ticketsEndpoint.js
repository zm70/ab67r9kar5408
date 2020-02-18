import httpClient from './restService';

import { convertToFormdata, parseErrors } from './helper';

export const createTicket = (body) => {
  return httpClient({
    method: 'POST',
    url: `/panel/tickets`,
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

export const replyTicket = (comment, ticketKey) => {
  return httpClient({
    method: 'POST',
    url: `/panel/tickets/reply/${ticketKey}`,
    data: JSON.stringify({ comment }),
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

export const getSellerTicket = () => {
  return httpClient
    .get('/panel/tickets/sellers')
    .then(({ data }) => {
      console.log(data);
      return data.data;
    })
    .catch((err) => {
      console.log(err);
      throw parseErrors(err);
    });
};

export const getCustomerTicket = () => {
  return httpClient
    .get('/panel/tickets/customers')
    .then(({ data }) => {
      console.log(data);
      return data.data;
    })
    .catch((err) => {
      console.log(err);
      throw parseErrors(err);
    });
};

export const getTicketById = (id) => {
  return httpClient
    .get(`/panel/tickets/show/${id}`)
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
      throw parseErrors(err);
    });
};
