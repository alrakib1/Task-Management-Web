require('dotenv').config();
const cors = require('cors');
const express = require('express');


const app = express();

// middle ware 

app.use(cors())

const port = process.env.port || 5000;


app.get('/',(req,res)=>{
    res.status(304).send('Task-manager server is running')
})


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.url;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
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
    // await client.close();
  }
}
run().catch(console.dir);







app.listen(port,()=>{
    console.log(`server running on port : ${port}`)
})

