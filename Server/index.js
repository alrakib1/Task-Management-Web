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
const { ObjectId } = require("mongodb");
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

    // post user to database

    app.post("/users", async (req, res) => {
      const user = req.body;
      // console.log(user)
      const result = await usersCollection.insertOne(user);
      // console.log(result)
      res
        .status(201)
        .send({ message: "user has been added", success: true, result });
    });

    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.status(200).send(result);
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
      const result = await todoCollection.find().toArray();
      res.status(200).send(result);
    });

    // get current user's todo

    app.get("/usersTodo", async (req, res) => {
      const user = req.query;
      let query = {};
      if (user?.email) {
        query = { email: user?.email };
      }

      const result = await todoCollection.find(query).toArray();
      // console.log(result)
      res.status(200).send(result);
    });

    // update todo status

    app.patch("/tasks/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      // console.log(req.body);

      const update = req.body;

      const updateDocument = {
        $set: {
          status: req.body.status,
        },
      };

      const result = await todoCollection.updateOne(filter, updateDocument);

      res.send({ message: "Task updated successfully", result });
    });

    // delete one todo

    app.delete("/tasks/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await todoCollection.deleteOne(query);
      res.status(200).send({
        message: "Task has been deleted",
        success: true,
        result,
      });
    });

    // get one todo

    app.get("/edit/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      const filter = { _id: new ObjectId(id) };
      const result = await todoCollection.findOne(filter);
      res.status(200).send({ message: "got it", success: true, result });
    });

    // patch todo

    app.patch("/edit/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };

      const update = req.body;

      const updateDocument = {
        $set: {
          title: update.title,
          priority: update.priority,
          deadline: update.deadline,
          description: update.description,
         status: update.status
        },
      };

      const result = await todoCollection.updateOne(filter, updateDocument);

      res.send({ message: "Task updated successfully", result });
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
