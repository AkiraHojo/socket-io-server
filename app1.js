"use strict";
exports.__esModule = true;
var crypto_1 = require("crypto");
var express = require("express");
var http = require("http");
var socketIo = require("socket.io");
var index = require("./routes/index");
var port = process.env.PORT || 4001;
var app = express();
app.use(index);
var server = http.createServer(app);
var io = socketIo(server);
io.on("connection", function (socket) {
    var interval;
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(function () { return getApiAndEmit(socket); }, 1000);
    socket.on("disconnect", function () {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});
var getApiAndEmit = function (socket) {
    var response = crypto_1.randomInt(100).toString();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
};
server.listen(port, function () { return console.log("Listening on port " + port); });
