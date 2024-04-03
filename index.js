const express = require('express');
const  app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const jwt = require("jsonwebtoken");
app.use(express.json());
const server = http.createServer(app);


const workerRouter = require("./routes/userRoutes");
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});