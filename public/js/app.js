const sendButton = document.getElementById("send");
const messageBox = document.getElementById("message-box");
const messageList = document.getElementById("messages");
let socket = io();

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

socket.on("message", (message) => {
    // show a regular message on the screen
    newList = document.createElement("li");
    newList.textContent = message;
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
