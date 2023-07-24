const express = require("express");
const morgan = require("morgan");
const amqp = require('amqplib');

const { receiveMsg, sendMsg } = require("../lib/rmq");

const ORDERS_QUEUE_NAME = "orders";

const app = express();

app.use(morgan("combined"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/shipping", (req, res) => {
  console.log(req.body);
  // Send the received payload to the data-service via RabbitMQ
  sendMsg(ORDERS_QUEUE_NAME, req.body);
  res.send("POST SHIPPING");
});

app.listen(5002, () => {
  console.log("Shipping service listening on port 5002");
});

// Start listening to messages from the data-service (if needed)
receiveMsg(ORDERS_QUEUE_NAME, (message) => {
  console.log("Received message from data-service:", message);
  // Further processing logic for the shipping-service goes here...
});
