const { receiveMsg, sendMsg } = require("../Part A/lib/rmq");

const ORDERS_QUEUE_NAME = "orders";
const USERS_QUEUE_NAME = "users";
const WEBHOOK_QUEUE_NAME = "webhook";

// Start listening to messages from the shipping-service
receiveMsg(ORDERS_QUEUE_NAME, (message) => {
  console.log("Received message from shipping-service:", message);
  // Further processing logic for the data-service goes here...

  // Once processing is done, if needed, send the message to the webhook-service
  sendMsg(WEBHOOK_QUEUE_NAME, message);
});

// Start listening to messages from the users-service
receiveMsg(USERS_QUEUE_NAME, (message) => {
  console.log("Received message from users-service:", message);
  // Further processing logic for the data-service goes here...

  // Once processing is done, if needed, send the message to the webhook-service
  sendMsg(WEBHOOK_QUEUE_NAME, message);
});
