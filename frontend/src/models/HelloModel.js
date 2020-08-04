import ResponseHandler from '../utils/ResponseHandler';

const log = { console };

export default {
  list(params = {}) {
    const url = `/api/hello?page=${params.page - 1}&size=${params.size}`;

    return fetch(url)
      .then((response) => response.json())
      .catch((err) => log(err));
  },
  get(helloId) {
    const url = `/api/hello/${helloId}`;

    return fetch(url)
      .then(ResponseHandler.handleResponse);
  },
  add(params) {
    const url = '/api/hello';

    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(params),
    }).then(ResponseHandler.handleResponse);
  },
};
