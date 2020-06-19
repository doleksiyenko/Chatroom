const express = require("express");
const ejs = require("ejs");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.resolve("public/pages/room.ejs"));
});

module.exports = router;
