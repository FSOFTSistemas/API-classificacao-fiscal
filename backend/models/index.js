'use strict';

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};

let sequelize;
console.log("antes da conexão");
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
  console.log("conectando com os seguintes dados:")
  console.log("DB_DATABASE: ", process.env.DB_DATABASE);
  console.log("DB_USERNAME: ", process.env.DB_USERNAME);
  console.log("DB_PASSWORD: ", process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "senha vazia");
  console.log("DB_HOST: ", process.env.DB_HOST);
  console.log("DB_PORT: ", process.env.DB_PORT);
  sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD || null,  // Adicionei a verificação para tratar senha vazia
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'mysql'
    }
  );
  console.log("depois da conexão");
}

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

module.exports = db;
