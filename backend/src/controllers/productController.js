const mongoose=require("mongoose");
const Product=require("../models/product");

async function getProducts(req,res,next){
  try{
    const{search}=req.query;
    const filter=search
      ?{ name:{ $regex:search, $options:"i"}}:{};

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      success:true,
      count:products.length,
      data:products,
    });
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    const{id}=req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success:false,
        message:"Invalid product ID",
      });
    }
    const product=await Product.findById(id);

    if (!product){
      return res.status(404).json({
        success:false,
      message:"Product not found",
      });
    }

      res.status(200).json({
       success:true,
      data:product,
    });
  } catch (error) {
    next(error);
  }
}

module.exports ={ getProducts, getProductById };