require("dotenv").config();
const mongoose = require("mongoose");
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const host_url = `mongodb+srv://${user}:${password}@cluster0.39thu.gcp.mongodb.net/${database}?retryWrites=true&w=majority`;

const db = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(host_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((connection) => {
        resolve(connection);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
module.exports = db;

//request, response
