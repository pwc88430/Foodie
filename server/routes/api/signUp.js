const express = require("express");
const router = express.Router();
const User = require("../../models/User");
var bodyParser = require("body-parser");

router.get("/", bodyParser.json(), (req, res) => {d
    console.log("sign up request received");
    res.send("sign up request received");
});

module.exports = router;
