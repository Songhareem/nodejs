
const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname + '/../config/config.json'))[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  console.log("env run");
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  console.log("env not run");
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./User')(sequelize, Sequelize);

module.exports = db;
