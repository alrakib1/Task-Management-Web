require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// middle ware

app.use(cors());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.url;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const myDB = client.db("task-manager-DB");
    const usersCollection = myDB.collection("users");
    const todoCollection = myDB.collection("to-do");

    await client.db("admin").command({ ping: 1 });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res
        .status(201)
        .send({ message: "user has been added", success: true, result });
    });

    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    // post todo

    app.post("/todo", async (req, res) => {
      const todo = req.body;
      const result = await todoCollection.insertOne(todo);
      res
        .status(201)
        .send({ message: "todo has been added", success: true, result });
    });

    app.get("/todo", async (req, res) => {
      const result = await todoCollection.find().toString();
      res.send(result);
    });




    console.log("connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Task-manager server is running");
});

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
