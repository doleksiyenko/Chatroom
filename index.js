const express = require("express");
const favicon = require("serve-favicon");
const app = express();
const port = 3000;

// show the favicon
app.use(favicon(__dirname + "/images/favicon.svg"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
