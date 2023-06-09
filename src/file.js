const { writeFile } = require('fs').promises;
const { join } = require('path');

const File = function () { };

File.prototype.save = function (buff, cwd, fileName) {
    const path = join(cwd, fileName);
    return writeFile(path, buff);
}

module.exports = File;