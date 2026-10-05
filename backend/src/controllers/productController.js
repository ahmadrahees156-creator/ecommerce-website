const mongoose=require("mongoose");
const Product=require("../models/product");

async function getProducts(req,res,next){
  try{
    const { search, category } = req.query;
    const sortBy = req.query.sort ?? "newest";
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const sortOptions = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      name_asc: { name: 1 },
      name_desc: { name: -1 },
    };

    if (!Number.isInteger(page) || page < 1) {
      return res.status(400).json({ success: false, message: "Page must be a positive integer" });
    }

    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
      return res.status(400).json({ success: false, message: "Limit must be between 1 and 100" });
    }

    if (!Object.prototype.hasOwnProperty.call(sortOptions, sortBy)) {
      return res.status(400).json({
        success: false,
        message: "Sort must be newest, oldest, price_asc, price_desc, name_asc, or name_desc",
      });
    }

    const filter = {};
    if (search?.trim()) {
      const safeSearch = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.name = { $regex: safeSearch, $options: "i" };
    }

    if (category?.trim()) {
      const safeCategory = category.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.category = { $regex: `^${safeCategory}$`, $options: "i" };
    }

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort(sortOptions[sortBy])
        .skip((page - 1) * limit)
        .limit(limit),
      Product.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page,
      limit,
      sort: sortBy,
      totalPages: Math.ceil(total / limit),
      data: products,
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
async function createProduct(req,res,next){
  try{
    const product=await Product.create(req.body);

    res.status(201).json({
      success:true,
      data:product,
    });
   }catch(error){
    if(error.name==="ValidationError"){
      return res.status(400).json({
        success:false,
        message:error.message,
      });
    }
    next(error);
  }
}
async function updateProduct(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    next(error);
  }
}
async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted",
      data: product,
    });
  } catch (error) {
    next(error);
  }
}
module.exports ={ getProducts, getProductById, createProduct, updateProduct ,deleteProduct,};
