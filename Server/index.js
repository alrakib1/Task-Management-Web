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

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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
    
    const myDB = client.db("task-manager-DB");
    const usersCollection = myDB.collection("users");
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    
    
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res
      .status(201)
      .send({ message: "user has been added", success: true, result });
    });
    
    app.get('/users', async(req,res)=>{
      const result = await usersCollection.find().toArray();;
      res.send(result);
    })
    
    console.log("connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Task-manager server is running");
});

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
