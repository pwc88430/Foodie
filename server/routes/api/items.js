const express = require("express");
const router = express.Router();
const Item = require("../../models/Item");
const jwt = require('jsonwebtoken');
const JWT_SECRET = "secret";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded.user; 
      next(); 
    } catch (error) {
      // Token verification failed
      return res.status(403).json({ message: "Invalid token" });
    }
  };


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

router.post("/", verifyToken, (req, res) => {
    console.log(req.body);
    Item.create(req.body)
        .then((item) => {
            res.json({ msg: "New Item added successfully" });
        })
        .catch((err) => {
            res.status(400).json({ error: "Unable to add this item" });
            console.log(err);
        });
});

router.put("/:id", verifyToken, (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    Item.findByIdAndUpdate(req.params.id, req.body)
        .then((item) => res.json({ msg: "Updated successfully" }))
        .catch((err) => res.status(400).json({ error: "Unable to update the database" }));
});

router.delete("/:id", verifyToken, (req, res) => {
    console.log(req.params.id);
    Item.findByIdAndDelete(req.params.id)
        .then((item) => res.json({ mgs: "Item entry deleted successfully" }))
        .catch((err) => res.status(400).json({ error: "No such item" }));
});

module.exports = router;
