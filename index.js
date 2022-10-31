const express = require("express");
const server = express();

const apiRouter = require("./API");
server.use("/API", apiRouter);

const morgan = require("morgan");
server.use(morgan("dev"));

server.use(express.json());

const PORT = 3000;

//Middleware

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("_____Body Logger END_____");

  next();
});

const { client } = require("./db");
client.connect();
server.listen(PORT, () => {
  console.log("The server is up!", PORT);
});
