const express = require("express");
const router = express.Router();
const Item = require("../../models/Item");
var bodyParser = require("body-parser");

router.get("/", (req, res) => {
    Item.find()
        .then((item) => res.json(item))
        .catch((err) => res.status(404).json({ noitemsfound: "No Items found" }));
});
router.get("/:id", (req, res) => {
    Item.findById(req.params.id)
        .then((item) => res.json(item))
        .catch((err) => res.status(400).json({ noitemfound: "No Item found" }));
});

router.post("/", bodyParser.json(), (req, res) => {
    Item.create(req.body)
        .then((item) => {
            res.json({ msg: "New Item added successfully" });
        })
        .catch((err) => {
            res.status(400).json({ error: "Unable to add this item" });
            console.log(err);
        });
});

router.put("/:id", bodyParser.json(), (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    Item.findByIdAndUpdate(req.params.id, req.body)
        .then((item) => res.json({ msg: "Updated successfully" }))
        .catch((err) => res.status(400).json({ error: "Unable to update the database" }));
});

router.delete("/:id", (req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then((item) => res.json({ mgs: "Item entry deleted successfully" }))
        .catch((err) => res.status(400).json({ error: "No such item" }));
});

module.exports = router;
