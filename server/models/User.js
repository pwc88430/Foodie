const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    email: { required: true, type: String, unique: true, trim: true },
    username: {
        required: true,
        type: String,
        trim: true,
    },
    password: { required: true, type: String, minLength: 6 },
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = User = mongoose.model("user", userSchema);
