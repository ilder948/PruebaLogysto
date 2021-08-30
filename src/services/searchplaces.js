const axios = require("axios");
const config = require("../config/index");

const searchAddressTomtom = async (query) => {
  try {
    const search = await axios.get(`${config.URL_TOMTOM}`, {
      params: {
        key: `${config.API_KEY_TOMTOM}`,
        countrySet: `CO`,
        query: query,
        limit: 1,
      },
    });
    return search.data;
  } catch (error) {
    return error;
  }
};

const searchAddressHere = async (query) => {
  try {
    const search = await axios.get(`${config.URL_HERE_MAPS}`, {
      params: {
        q: query,
        apiKey: config.API_KEY_HERE,
      },
    });
    return search.data;
  } catch (error) {
    return error;
  }
};

module.exports = {
  searchAddressTomtom,
  searchAddressHere,
};
