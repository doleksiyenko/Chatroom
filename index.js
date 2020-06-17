const express = require("express");
const app = express();
const { nanoid } = require("nanoid");

const http = require("http").createServer(app);
const io = require("socket.io")(http);
const { disconnect } = require("process");
const { connect } = require("http2");

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
    socket.username = `temp_${nanoid(4)}`;
    let connect = {
        username: `${socket.username}`,
        type: "connect",
    };
    connect.message = `${connect.username} has connected.`;

    console.log("A user connected");
    // create an item for users showing that a user has connected
    io.emit("connectionFormed", JSON.stringify(connect));

    socket.on("message", (message) => {
        io.emit("message", message);
    });
    socket.on("disconnect", () => {
        let disconnect = {
            username: `${socket.username}`,
            type: "disconnect",
        };
        disconnect.message = `${disconnect.username} has disconnected.`;
        console.log("The user disconnected.");
        io.emit("connectionFormed", JSON.stringify(disconnect));
    });
});

http.listen(port, () => {
    console.log(`listening on port ${port}`);
});
