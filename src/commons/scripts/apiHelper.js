const getApi = (url) => {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then(response => { if(response.ok) return response.json(); })
    .then((data) => {
      if(data) {
        return data;
      }
      else {
        return {
          isError : true,
          errorMessage: error
        };
      }
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
  }).then(response => { if(response.ok) return response.json(); })
    .then((data) => {
      if(data) {
        return data;
      }
      else {
        return {
          isError : true,
          errorMessage: error
        };
      }
    })
    .catch(function(error) {
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
  })
    .then(response => { if(response.ok) return response.json(); })
    .then((data) => {
      if(data) {
        return data;
      }
      else {
        return {
          isError : true,
          errorMessage: error
        };
      }
    })
    .catch(function(error) {
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
