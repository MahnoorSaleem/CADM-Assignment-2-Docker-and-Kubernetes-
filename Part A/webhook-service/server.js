const express = require("express");
const morgan = require("morgan");
const { receiveMsg } = require("../lib/rmq");

const WEBHOOK_QUEUE_NAME = "webhook";

const app = express();

app.use(morgan("combined"));
app.use(express.json());

app.listen(5005, () => {
  console.log("Webhook service listening on port 5005");
});

// Start listening to messages from the data-service
receiveMsg(WEBHOOK_QUEUE_NAME, (message) => {
  console.log("Received message from data-service:", message);
  // Further processing logic for the webhook-service goes here...
});
