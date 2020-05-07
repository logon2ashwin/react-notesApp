const getApi = (url) => {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
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

export default {
  GET: getApi,
};
