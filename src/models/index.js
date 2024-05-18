'use strict';
import dotenv from 'dotenv'

dotenv.config()

const fs = require('fs');
const path = require('path');
const Sequelize= require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const db = {};

let sequelize;

const customizeConfig = {
  "host": process.env.DB_HOST,
  "dialect": "postgres",
  "logging": false,
  "query": {
    "raw": true,
  },
  "dialectOptions": {
    "ssl": {
      "require": true,
      "rejectUnauthorized": false
    }
  }
}

sequelize = new Sequelize(
  process.env.DB_DATABASE_NAME,
  process.env.DB_USERNAME, 
  process.env.DB_PASSWORD, 
  customizeConfig
);


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.sequelize.sync().then(
//   (req) => {
//       console.log("Connected to daily_reflect_database")
//   }
// )

module.exports = db;
