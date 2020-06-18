const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.resolve("public/html/room.html"));
});

module.exports = router;
