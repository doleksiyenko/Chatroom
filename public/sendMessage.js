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
    newList = document.createElement("li");
    newList.textContent = message;
    messageList.appendChild(newList);
});

socket.on("connected", (message) => {
    console.log("connected");
    newList = document.createElement("li");
    newList.textContent = message;
    messageList.appendChild(newList);
});
