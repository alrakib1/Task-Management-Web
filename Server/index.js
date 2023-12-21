require('dotenv').config();
const express = require('express');


const app = express();
const port = process.env.port || 5000;

app.get('/',(req,res)=>{
    res.send('Task-manager server is running')
})




app.listen(port,()=>{
    console.log(`server running on port : ${port}`)
})