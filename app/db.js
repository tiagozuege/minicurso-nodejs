const sqlite3 = require('sqlite3');		//importa o 'sqlite3'

let db = new sqlite3.Database('./database.sqlite');

module.exports = db;