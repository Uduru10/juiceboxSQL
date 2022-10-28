const { application } = require("express");
const express = require("express");
const server = express();
const apiRouter = require("./api");
const morgan = require("morgan");
server.use(morgan("dev"));

server.use(express.json());
server.use("/api", apiRouter);
const PORT = 3000;
const { client } = require("./db");
client.connect();

//Middleware

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("_____Body Logger END_____");

  next();
});

server.listen(PORT, () => {
  console.log("The server is up!", PORT);
});
