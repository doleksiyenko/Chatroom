const sendButton = document.getElementById("send");
const messageBox = document.getElementById("message-box");
const messageList = document.getElementById("messages");

let socket = io();

// when the socket is formed, broadcast to the room
const urlParams = new URLSearchParams(window.location.search);
let roomId = urlParams.get("id");

socket.emit("joined", roomId);

sendButton.onclick = (e) => {
    e.preventDefault();
    // emit the event if the message is not empty
    if (messageBox.value.trim() !== "") {
        socket.emit("message", messageBox.value);
    }
    // reset the box
    messageBox.value = "";
    return false;
};

socket.on("message", (message, user) => {
    // show a regular message on the screen
    newList = document.createElement("li");
    newList.textContent = user + ": " + message;
    messageList.appendChild(newList);
});

socket.on("connectionFormed", (connectionReq) => {
    // this response show a user connecting / disconnecting on the screen
    const connectionDetails = JSON.parse(connectionReq);
    newConnectionMessage = document.createElement("li");
    newConnectionMessage.textContent = connectionDetails.message;
    newConnectionMessage.setAttribute("id", connectionDetails.type);
    messageList.appendChild(newConnectionMessage);
});
