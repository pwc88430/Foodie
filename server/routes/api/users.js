const express = require("express");
const router = express.Router();
const User = require("../../models/User");
var bodyParser = require("body-parser");

router.get("/", bodyParser.json(), (req, res) => {
    console.log("sign up request received");
    res.send("sign up request received");
});

router.post("/signup", async (req, res) => {
    console.log(req.body);
    User.create(req.body)
        .then((user) => {
            res.json({ msg: "New Item added successfully" });
        })
        .catch((err) => {
            res.status(400).json({ error: "Unable to add this item", details: err});
            console.log(err);
        });
});

router.get("/login", bodyParser.json(), (req, res) => {
    console.log("login request received");
    res.send("login request received");
});


module.exports = router;
