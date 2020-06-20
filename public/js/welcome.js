const generateIdButton = document.getElementById("generate-room-id");
const input = document.querySelector("input");
const span = document.querySelector("span");

generateIdButton.onclick = (e) => {
    e.preventDefault();
    let randomRoomId = makeId(15);
    input.value = randomRoomId;
    span.textContent = `Click Join/Create Room to join room. Send this code to others for them to join the room : ${randomRoomId}`;
};

makeId = (length) => {
    let result = "";
    let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let characterNum = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characterNum));
    }
    return result;
};
