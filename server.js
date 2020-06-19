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
const port = 3000;

// load in the routes
const roomRouter = require("./routers/room");
const welcomeRouter = require("./routers/welcome");

// set view engine (ejs)
app.set("view engine", "ejs");
// show the favicon, use static files
app.use(express.static(path.join(__dirname, "/public")));
app.use(favicon(path.join(__dirname, "favicon.svg")));

// routes
app.use("/", welcomeRouter);
app.use("/room", roomRouter);

// socket
let usersOnline = [];
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
