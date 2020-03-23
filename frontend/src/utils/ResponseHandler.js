const ResponseHandler = {};

ResponseHandler.handleResponse = async (response) => {
    const json = await response.json();
    if (response.ok) {
        return json;
    }

    const error = Error(json.message ? json.message : response.status);
    switch (response.status) {
        case 409:
            error.name = "ConflictError";
            break;
        case 400:
            error.name = "BadRequestError";
            break;
        case 422:
            error.name = "UnprocessableError";
    }
    throw error;
};

export default ResponseHandler;