const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

exports.writePackage = (filePath, data) => {
  return fs.writeFileAsync(filePath, JSON.stringify(data, null, 2)).catch(err => {
    console.log(err);
    return Promise.reject(err);
  });
}

exports.readPackage = (filePath) => {
  return fs.readFileAsync(filePath, 'utf-8').catch(err => {
    return Promise.reject(err);
  });
}


