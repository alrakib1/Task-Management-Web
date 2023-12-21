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




app.listen(port,()=>{
    console.log(`server running on port : ${port}`)
})