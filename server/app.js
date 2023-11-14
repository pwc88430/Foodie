const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require("mongoose");
const cors = require("cors");
const uri = "mongodb+srv://foodie:Password1234@cluster0.p58zp9l.mongodb.net/?retryWrites=true&w=majority";

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Hello world!"));

app.get("/home", (req, res) => res.send(""));

mongoose.set("strictQuery", false);
mongoose
    .connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => {
        app.listen(port);
        console.log(`MongoDB Connection Suceeded`);
    })
    .catch((err) => {
        console.log(`Error in DB Connection ${err}`);
    });
