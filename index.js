const express = require("express");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);

const favicon = require("serve-favicon");

const port = 3000;

// show the favicon
app.use(favicon(__dirname + "/images/favicon.svg"));
app.use(express.static("public"));

// route
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// socket
io.on("connection", (socket) => {
    console.log("A user connected.");
    socket.on("message", (message) => {
        io.emit("message", message);
    });
    socket.on("disconnect", () => {
        console.log("The user disconnected.");
    });
});

http.listen(port, () => {
    console.log(`listening on port ${port}`);
});
