const express= require("express");
const app= express();
const port =process.env.PORT||5000;

app.use(express.json());
app.get("/api/health",(req, res)=>{
    res.json({status:"ok",message:"backend API is running"});
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});