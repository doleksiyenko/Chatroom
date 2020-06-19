const express = require("express");
const ejs = require("ejs");
const path = require("path");
const { nanoid } = require("nanoid");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const { disconnect } = require("process");
const { connect } = require("http2");

const favicon = require("serve-favicon");
const port = process.env.PORT || 3000;

// set view engine (ejs)
app.set("view engine", "ejs");
// show the favicon, use static files
app.use(express.static(path.join(__dirname, "/public")));
app.use(favicon(path.join(__dirname, "favicon.svg")));

// socket
io.on("connection", (socket) => {
    socket.username = `user-${nanoid(4)}`;
    let user = {
        name: `${socket.username}`,
        type: "connect",
    };
    user.message = `${user.name} has connected.`;

    socket.emit("connectionFormed", JSON.stringify(user));

    socket.on("message", (message) => {
        io.to(user.roomId).emit("message", message, user.name);
    });
    socket.on("joined", (roomId) => {
        user.roomId = roomId;
        // socket.broadcast.to(roomId);
        socket.join(`${roomId}`);
        socket.broadcast
            .to(`${roomId}`)
            .emit("connectionFormed", JSON.stringify(user));
        console.log(`${socket.username} has joined ${roomId}`);
    });

    socket.on("disconnect", () => {
        let disconnect = {
            username: `${socket.username}`,
            type: "disconnect",
        };
        disconnect.message = `${disconnect.username} has disconnected.`;
        console.log("The user disconnected.");
        socket.leave(user.roomId);
        io.emit("connectionFormed", JSON.stringify(disconnect));
    });
});

// routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/welcome.html"));
});

app.get("/room", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/room.html"));
});

http.listen(port, () => {
    console.log(`listening on port ${port}`);
});
