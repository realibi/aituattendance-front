let axios = require("axios");

const get = async (url, data) => {
    return await axios.get(url, data);
}

const post = async (url, data) => {
 return await axios.post(url, data);
}

module.exports = {
    get,
    post
}
