require("dotenv").config();
// dotenv loads environment variables from a .env file into process.env
const express = require("express");
const cors = require("cors");
require("./dbConfig");
const router = require("./routes");

const server = new express();
server.use(cors());
server.use(express.json());

server.use('/uploads',express.static('./uploads'))
// This is a built-in middleware function in Express. It serves static files and is based on serve-static.


server.use(router);

const Port = 3000;
server.listen(Port, () => {
  console.log("server is successfully running in port", Port);
});
