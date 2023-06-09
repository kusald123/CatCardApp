const argv = require('minimist')(process.argv.slice(2));
const CONFIG = require("./config.json");
const HTTP = require("./src/request");
const ImageMerge = require("./src/image-merge");
const helper = require("./src/helper");
const File = require("./src/file");

// default values unless no arguments
let {
    greeting = 'Hello', who = 'You',
    width = 400, height = 500, color = 'Pink', size = 100,
} = argv;

const http = new HTTP(CONFIG.CONNECTION.BASE);
const httpConfig = {
    encoding: CONFIG.CONNECTION.ENCODING.BINARY
}
const reqPromises = [
    http.get(helper.getRequestURL(greeting, width, height, color, size), httpConfig),
    http.get(helper.getRequestURL(who, width, height, color, size), httpConfig)
];

// getting the images parallerly
Promise.all(reqPromises)
    .then((response) => {
        const [firstImg, secondImg] = response;
        const mergeImgArr = [
            { src: Buffer.from(firstImg.data, CONFIG.CONNECTION.ENCODING.BINARY), x: 0, y: 0 },
            { src: Buffer.from(secondImg.data, CONFIG.CONNECTION.ENCODING.BINARY), x: width, y: 0 }
        ]
        //sending the source to merge
        return new ImageMerge(CONFIG.FILE.MIME).merge(mergeImgArr);
    }).then((buff) => {
        // merged buffer savving to a file
        return new File().save(buff, process.cwd(), CONFIG.FILE.NAME);
    }).then((res) => {
        console.log('success');
    })
    .catch((err) => {
        console.error(err);
    });
