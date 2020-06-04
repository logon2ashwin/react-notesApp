const getApi = (url) => {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return {
        isError : true,
        errorMessage: error
      };
    });
};

const postAPI = (url, options) => {
  return fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options)
  }).then(function(response) {
    return response.json();
  }).then(function(error) {
    return {
      isError : true,
      errorMessage: error
    };
  });
};

const putAPI = (url, options) => {
  return fetch(url, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options)
  }).then(function(response) {
    return response.json();
  }).then(function(error) {
    return {
      isError : true,
      errorMessage: error
    };
  });
};

const api = {
  GET: getApi,
  POST: postAPI,
  PUT: putAPI
};
export default api;
