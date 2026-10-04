require("dotenv").config();
const express= require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const app= express();
const port =process.env.PORT||5000;

app.use(express.json());
app.use("/api/products", productRoutes);
app.get("/api/health",(req,res)=>{
    res.json({status:"ok",message:"backend API is running"});
});

async function startServer() {
  await connectDB();

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
}
app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message,
  });
});
startServer();