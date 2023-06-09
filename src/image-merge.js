const mergeImg = require('merge-img');
const CONFIG = require("../config.json");

const ImageMerge = function (mimeType) {
    this.mimeType = mimeType || CONFIG.FILE.MIME;
};

ImageMerge.prototype.merge = function (imgSrcArr) {
    if (imgSrcArr && !imgSrcArr.length) throw 'invalid img array';
    return mergeImg(imgSrcArr)
        .then((mergedImg) => {
            return new Promise((resolve, reject) => {
                mergedImg.getBuffer(this.mimeType, (err, data) => {
                    if (err) reject(err);
                    resolve(data);
                })
            });
        })
};

module.exports = ImageMerge;