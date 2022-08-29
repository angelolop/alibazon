const axios = require("axios");
const key = '$2a$08$p3my8MGizWp3L8f6sn0PCO2c4mLv.mewFcpcfy8pGxHFi0iT4cUX.'

exports.api = axios.create({
    baseURL: "https://backend-academy-osf.herokuapp.com/api/"
});

exports.secretKey = key

exports.param = {
    params: {
        secretKey: key
    }
};




