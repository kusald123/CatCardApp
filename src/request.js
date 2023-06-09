// using axios because request is depreacated
// this will help to change only the lib
const axios = require('axios');

const HTTP = function (base) {
    this.base = base;
    this.lib = axios;
};

HTTP.prototype.get = function (url, config) {
    url = `${this.base}${url}`;
    return this.lib.get(url, { responseEncoding: config.encoding });
}

module.exports = HTTP;