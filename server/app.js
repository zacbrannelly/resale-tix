const express = require("express");
const api = require("./api");

const hostname = "0.0.0.0";
const port = 8080;

const app = express();

// API - used by the front-end app
app.use('/api', api);

// Static serving
app.use(express.static('../client/static'));

// Start the web server
app.listen(port, hostname);

console.log("Started ResaleTix Backend Server...");
console.log("Press CTRL+C to close.");