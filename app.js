const express = require("express");
const app = express();

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://foodie:Password1234@cluster0.p58zp9l.mongodb.net/?retryWrites=true&w=majority";

app.get("/", (req, res) => res.send("Hello world!"));

app.get("/home", (req, res) => res.send(""));

const port = process.env.PORT || 8082;
app.listen(port, () =>
    console.log(`Server running on port
${port}`)
);

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);
