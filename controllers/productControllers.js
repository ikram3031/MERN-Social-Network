const fs = require('fs')
const path = require('path')
const { StatusCodes } = require('http-status-codes')
const multer = require('multer')
const Product = require('../models/Product')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

const storage = multer.diskStorage({

  destination: (req, file, callback) => {
    callback(null, 'img/products')
  },

  filename: (req, file, callback) => {
    const extension = file.mimetype.split('/')[1];
    callback(null, `product-${file.originalname.split('.')[0]}-${Date.now()}.${extension}`)
  }
});


const fileFilter = (req, file, callback) => {

  if (file.mimetype.startsWith('image')) callback(null, true);
  else callback(new AppError('Please upload an Image', 400), false);
}

const upload = multer({ storage, fileFilter });

const uploadAnything = upload.any();

// GET ALL
const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length })
}

// GET SINGLE PRODUCT
const getSingleProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError('Product not found with given ID', 404));
  }
  res.status(StatusCodes.OK).json({ success: true, data: product });
});

// Create Product
const createProduct = catchAsync(async (req, res, next) => {

  const file = req.files[0];
  if (file) req.body.image = file.filename;
  const product = await Product.create(req.body)

  res.status(StatusCodes.CREATED).json({
    success: true,
    data: req.body,
  });

}
)

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
  createProduct, getAllProducts, getSingleProduct, uploadAnything, updateProduct, deleteProduct
}

