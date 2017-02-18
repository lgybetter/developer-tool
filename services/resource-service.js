const DataStore = require('nedb');
const Promise = require('bluebird');
const co = require('co');
const db = new DataStore();
const config = require('../config')

const get = (name, query) => {
  db[name] = new DataStore(`${config.dbPath}/${name}.db`);
  return new Promise((resolve, reject) => {
    db[name].loadDatabase(err => {
      if(err) {
        return reject(err)
      }
      return db.find(query, (err, docs) => {
        if(err) {
          return reject(err)
        }
        return resolve(docs);
      })
    })
  })
}

const post = (name, insert) => {
  db[name] = new DataStore(`${config.dbPath}/${name}.db`);
  return new Promise((resolve, reject) => {
    db[name].loadDatabase(err => {
      if(err) {
        return reject(err)
      }
      return db.insert(insert, (err, newDocs) => {
        if(err) {
          return reject(err)
        }
        return resolve(newDocs)
      })
    })
  })
}

const put = (name, query, update, options) => {
  db[name] = new DataStore(`${config.dbPath}/${name}.db`);
  return new Promise((resolve, reject) => {
    db[name].loadDatabase(err => {
      if(err) {
        return reject(err)
      }
      return db.update(query, update, options, (err, numReplaced) => {
        if(err) {
          return reject(err)
        }
        return resolve(numReplaced);
      })
    })
  })
}

const remove = (name, query, options) => {
  db[name] = new DataStore(`${config.dbPath}/${name}.db`);
  return new Promise((resolve, reject) => {
    db[name].loadDatabase(err => {
      if(err) {
        return reject(err)
      }
      return db.update(query, options, (err, numRemoved) => {
        if(err) {
          return reject(err)
        }
        return resolve(numRemoved);
      })
    })
  })
}

module.exports = {
  get,
  post,
  remove,
  put
}
