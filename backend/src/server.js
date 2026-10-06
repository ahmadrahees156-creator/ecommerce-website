require("dotenv").config();
const express= require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const app= express();
const port =process.env.PORT||5000;

app.use(express.json());
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);  
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.get("/api/health",(req,res)=>{
    res.json({status:"ok",message:"backend API is running"});
});

async function startServer() {
  await connectDB();

  app.listen(port, () => {
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

startServer().catch((error) => {
  console.error(`Server startup failed: ${error.message}`);
  process.exit(1);
});
