const express = require("express");
const morgan = require("morgan");
const { sendMsg } = require("../lib/rmq");

const ORDERS_QUEUE_NAME = "orders";
const WEBHOOK_QUEUE_NAME = "webhook";

const app = express();

app.use(morgan("combined"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/order", (req, res) => {
  console.log(req.body);
  // Send the received payload to the data-service via RabbitMQ
  sendMsg(ORDERS_QUEUE_NAME, req.body);
  // Send the orderId to the webhook-service via RabbitMQ
  sendMsg(WEBHOOK_QUEUE_NAME, req.body.orderId);
  res.send("POST ORDER");
});

app.listen(5004, () => {
  console.log("Order service listening on port 5004");
});
