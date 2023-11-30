const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    updated_date: { type: Date, default: Date.now },
    location: { type: String },
    user: { type: String },
    stars: {},
});

module.exports = Item = mongoose.model("item", ItemSchema);
