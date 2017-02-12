import Promise from 'bluebird';
import electron from 'electron';

const fs = Promise.promisifyAll(require('fs'));
const {dialog} = electron.remote

exports.openDialog = () => {
  return new Promise((resolve, reject) => {
    dialog.showOpenDialog({
      properties: [
        'openDirectory',
      ]
    }, (res) => {
      if(!res) {
        return reject('404');
      }
      return resolve(res[0]);
    });
  })
}

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


