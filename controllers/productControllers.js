const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Product = require('../models/Product');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Create Product
const createProduct = async (req, res) => {
  try {
    const {
      title,
      image,
      gallery,
      category,
      price,
      salePrice,
      colors,
      features,
      description,
      shortDesc,
    } = req.body;

    const newProduct = new Product({
      title,
      image,
      gallery,
      category,
      price,
      salePrice,
      colors,
      features,
      description,
      shortDesc,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

module.exports = { createProduct };


// GET ALL
const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products, count: products.length })
}

// GET SINGLE PRODUCT
const getSingleProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError('Product not found with given ID', 404));
  }
  res.status(200).json({ success: true, data: product });
});

// Update
const updateProduct = catchAsync(async (req, res, next) => {

  let product = await Product.findById(req.params.id);
  if (!product) return next(new AppError('product not found with given ID', 404));

  const file = req.files[0];

  if (file) {
    req.body.image = file.filename;

    fs.stat(path.join(__dirname, `../img/products/${product.image}`), (err, stats) => {
      if (err) return;
      fs.unlink(path.join(__dirname, `../img/products/${product.image}`), (err) => {
        if (err) return;
      })
    })
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    data: product,
  });

})

// DELETE
const deleteProduct = catchAsync(async (req, res, next) => {

  let product = await Product.findById(req.params.id);
  if (!product) return next(new AppError('product not found with given ID', 404));

  fs.stat(path.join(__dirname, `../img/products/${product.image}`), (err, stats) => {
    if (err) return;
    fs.unlink(path.join(__dirname, `../img/products/${product.image}`), (err) => {
      if (err) return;
    })
  })


  await Product.findByIdAndRemove(req.params.id);

  res.status(StatusCodes.CREATED).json({
    success: true,
    data: null,
  });

})



module.exports = {
  createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct
}

