const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
    res.render(path.resolve("public/pages/welcome.ejs"));
});

router.post("/room/:id", (req, res) => {
    console.log("made a post request.");
});

module.exports = router;
