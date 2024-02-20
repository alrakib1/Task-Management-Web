require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(
  cors({
    origin: ["https://taskify-web-app.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

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

const verifyToken = async (req, res, next) => {
  const token = await req.cookies?.token;
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).send("Invalid Token");
  }
};

async function run() {
  try {
    await client.connect();

    const myDB = client.db("task-manager-DB");
    const todoCollection = myDB.collection("to-do");

    await client.db("admin").command({ ping: 1 });

    //! auth related api

    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          maxAge: 3600000,
        })
        .send({ success: true });
    });

    //* post todo

    app.post("/todo", verifyToken, async (req, res) => {
      console.log(req.user, "inside new todo");

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

    //* get current user's todo

    app.get("/usersTodo", verifyToken, async (req, res) => {
      const user = req.query;
      let query = {};
      if (user?.email) {
        query = { email: user?.email };
      }

      const result = await todoCollection.find(query).toArray();

      res.status(200).send(result);
    });

    //* update todo status

    app.patch("/tasks/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };

      const updateDocument = {
        $set: {
          status: req.body.status,
        },
      };

      const result = await todoCollection.updateOne(filter, updateDocument);

      res.send({ message: "Task updated successfully", result });
    });

    //* delete one todo

    app.delete("/tasks/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await todoCollection.deleteOne(query);
      res.status(200).send({
        message: "Task has been deleted",
        success: true,
        result,
      });
    });

    //* get one todo

    app.get("/edit/:id",verifyToken, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await todoCollection.findOne(filter);
      res.status(200).send({ message: "got it", success: true, result });
    });

    //* patch todo

    app.patch("/edit/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };

      const update = req.body;

      const updateDocument = {
        $set: {
          title: update.title,
          priority: update.priority,
          deadline: update.deadline,
          description: update.description,
          status: update.status,
        },
      };

      const result = await todoCollection.updateOne(filter, updateDocument);

      res.send({ message: "Task updated successfully", result });
    });

    app.get("/profile", verifyToken, async (req, res) => {
      let query = {};
      if (req.query?.email) {
        query = { email: req.query.email };
      }
      const cursor = usersCollection.find(query);
      const result = await cursor.toArray();
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
