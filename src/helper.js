

module.exports = {
    getRequestURL: (phrase, width, height, color, size) => {
        return `/cat/says/${phrase}?width=${width}&height=${height}&color=${color}&s=${size}`;
    }
};