const config = require('./config');
const DataStore = require('nedb');
const db = new DataStore();

exports.createDB = () => {
  db.users = new DataStore({
    filename: `${config.dbPath}/users.db`,
    autolaod: true 
  });
}
