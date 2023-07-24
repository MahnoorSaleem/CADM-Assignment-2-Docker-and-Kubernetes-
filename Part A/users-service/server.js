const express = require("express");
const morgan = require("morgan");
const { sendMsg } = require("../lib/rmq");

const USERS_QUEUE_NAME = "users";

const app = express();

app.use(morgan("combined"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/users", (req, res) => {
  console.log(req.body);
  // Send the received payload to the data-service via RabbitMQ
  sendMsg(USERS_QUEUE_NAME, req.body);
  res.send("POST USERS");
});

app.listen(5003, () => {
  console.log("Users service listening on port 5003");
});
