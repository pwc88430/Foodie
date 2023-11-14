const express = require("express");
const router = express.Router();
const Item = require("../../models/Item");

router.get("/", (req, res) => {
    res.send("testing get / item route");
});
router.get("/:id", (req, res) => {
    res.send("testing get /:id route");
});

router.post("/", (req, res) => {
    Item.create(req.body)
        .then((item) => res.json({ msg: "Item added successfully" }))
        .catch((err) => res.status(400).json({ error: "Unable to add this item" }));
});

router.put("/:id", (req, res) => {
    res.send("testing put /:id route");
});

router.delete("/:id", (req, res) => {
    res.send("testing delete /:id route");
});

module.exports = router;
