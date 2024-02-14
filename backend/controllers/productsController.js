const Products = require("../models/products");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

//Get products by category => /api/v1/products/:category
exports.getAllProdcutsByCat = catchAsyncErrors(async (req, res, next) => {
  try {
    if (
      ![
        "shoe",
        "woman cloths",
        "man cloths",
        "gym accessories",
        "electronics",
        "jewelry",
      ].includes(req.params.category)
    ) {
      return next(new ErrorHandler("Category not found", 404));
    }

    const productsData = await Products.find({
      category: req.params.category, 
    });

    if (productsData.length === 0) {
      return next(new ErrorHandler("Products not found", 404));
    }


    res.status(200).json({
      success: true,
      products: productsData,
    });
  } catch (error) {
    console.error(error);
  }
});

//Get single product by Id => /api/v1/products/:category/:id

exports.getSingleProductByID = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;

  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  if (!objectIdRegex.test(id)) {
    return next(new ErrorHandler("Invalid product ID", 404));
  }

  const productData = await Products.findById(id);

  if (!productData) {
    return next(new ErrorHandler("Ops !!! Product not found.", 404));
  }

  res.status(200).json({
    success: true,
    product: productData,
  });
});
//Admin add product => /api/v1/admin/product/new
exports.addNewProduct = catchAsyncErrors(async (req, res, next) => {
  //body must include name, img, price, category
  const product = new Products(req.body);

  await product.save();

  res.status(200).json({
    success: true,
    product: product,
    message: "Order added successfully",
  });
});
