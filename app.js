require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db");

const userRouter = require("./routes/user");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Authorization"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use("/api/user", userRouter);

db()
  .then(() => {
    console.log("MongoDB is connected");
    app.listen(port, () => {
      console.log("Server is listing on port ", port);
    });
  })
  .catch((err) => {
    console.log("MongoDB is not connected");
  });
