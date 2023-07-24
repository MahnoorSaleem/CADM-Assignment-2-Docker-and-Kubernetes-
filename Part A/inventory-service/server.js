// imports
const express = require("express");
const morgan = require("morgan");
const { sendMsg } = require("../Part A/lib/rmq");

const WEBHOOK_QUEUE_NAME = "webhook";

// init express app
const app = express();

// use morgan middleware
app.use(morgan("combined"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World from inventory service");
});

// ! INVENTORY CRUD OPERATIONS
app.get("/inventory", (req, res) => {
  res.send("GET INVENTORY");
});

app.post("/inventory", (req, res) => {
  sendMsg(WEBHOOK_QUEUE_NAME, req.body.productId);

  res.send("POST INVENTORY");
});

app.put("/inventory", (req, res) => {
  res.send("PUT INVENTORY");
});

app.delete("/inventory", (req, res) => {
  res.send("DELETE INVENTORY");
});

app.listen(5001);
