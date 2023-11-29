const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json({ extended: false }));
app.use(cors({ origin: true, credentials: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const uri = "mongodb+srv://foodie:Password1234@cluster0.p58zp9l.mongodb.net/?retryWrites=true&w=majority";

const items = require("./routes/api/items");
const users = require("./routes/api/users");
const signUp = require("./routes/api/signUp");
const login = require("./routes/api/items");
app.use("/api/items", items);
app.use("/api/signUp", signUp);
app.use("/api/login", login);

app.use(
    cors({
        allowedHeaders: ["Content-Type", "Access-Control-Allow-Methods"],
        exposedHeaders: ["Content-Type", "Access-Control-Allow-Methods"],
        origin: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: true,
    })
);
app.use("/api/users", users);

mongoose.set("strictQuery", false);
mongoose
    .connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => {
        app.listen(port);
        console.log(`MongoDB Connection Suceeded`);
        console.log("server started on port " + port);
    })
    .catch((err) => {
        console.log(`Error in DB Connection ${err}`);
    });
