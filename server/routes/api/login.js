const express = require("express");
const router = express.Router();
const User = require("../../models/User");
var bodyParser = require("body-parser");

router.get("/", bodyParser.json(), (req, res) => {
    console.log("login request received");
    res.send("login request received");
});

module.exports = router;
