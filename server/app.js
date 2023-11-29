const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require("mongoose");
const cors = require("cors");
const uri = "mongodb+srv://foodie:Password1234@cluster0.p58zp9l.mongodb.net/?retryWrites=true&w=majority";
const items = require("./routes/api/items");
const signUp = require("./routes/api/signUp");
const login = require("./routes/api/login");
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

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
