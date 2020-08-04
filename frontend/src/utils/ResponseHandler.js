const ERROR_TYPE = {
  409: 'ConflictError',
  400: 'BadRequestError',
  422: 'UnprocessableError',
};

const ResponseHandler = {
  handleResponse: async (response) => {
    const json = await response.json();
    if (response.ok) {
      return json;
    }

    const error = Error(json.message ? json.message : response.status);
    const type = ERROR_TYPE[response.status] || 'CommonError';
    error.name = type;

    throw error;
  },
};

export default ResponseHandler;
