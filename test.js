const Promise = require('bluebird');
const electron = require('electron');
const childProcess = require('child_process');
const fs = Promise.promisifyAll(require('fs'));

function compressDir(dirPath, name, file) {
  return new Promise((resolve, reject) => {
    if(file != null) {
      childProcess.exec(`cd ${dirPath} && 7z a -ttar ${name}.tar ${file}`, err => {
        if(err) {
          return Promise.reject(err);
        }
        return Promise.resolve();
      });
    } else {
      childProcess.exec(`cd ${dirPath} && 7z a -ttar ${name}.tar *`, err => {
        if(err) {
          return Promise.reject(err);
        }
        return Promise.resolve();
      });
    }
  })
}


compressDir('/Users/Administrator/Desktop/lgybetter', 'lgybetter');