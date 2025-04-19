let express = require("express");
let cors = require("cors");
let { MongoClient } = require("mongodb");

let app = express();
app.use(cors());
app.use(express.json());
// const url = process.env.mongodb_url;
const url = "mongodb+srv://adityadgawade021:eyFzTqNrPaJaOs1N@cluster0.lrqhrcj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.post("/add", (req, res) => {
  let client = new MongoClient(url);
  client.connect();

  let db = client.db("mern");
  let collection = db.collection("events");

  let obj = {
    name: req.body.name,
    event: req.body.event,
    time: req.body.time,
    phone: req.body.phone,
  };
  collection.insertOne(obj)
    .then((result) => res.send(res))
    .catch((error) => res.send(error));
});

app.get("/get", (req, res) => {
  let client = new MongoClient(url);
  client.connect();

  let db = client.db("mern");
  let collection = db.collection("events");

  collection.find().toArray()
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
});

app.listen(9000, () => console.log("Server is running on port 9000"));
