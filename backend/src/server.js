require("dotenv").config();
const express= require("express");
const connectDB = require("./config/db");
const app= express();
const port =process.env.PORT||5000;

app.use(express.json());
app.get("/api/health",(req,res)=>{
    res.json({status:"ok",message:"backend API is running"});
});

async function startServer() {
  await connectDB();

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
}
startServer();