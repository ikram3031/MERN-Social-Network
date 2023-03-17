const express = require('express')
const router = express.Router()

const { createProduct, getAllProducts, getSingleProduct, uploadAnything, updateProduct, deleteProduct } = require('../controllers/productControllers')

router.post("/create", uploadAnything, createProduct)
router.patch("/update/:id", uploadAnything, updateProduct)
router.delete("/delete/:id", deleteProduct)
router.get("/getall", getAllProducts)
router.get("/:id", getSingleProduct)


module.exports = router 
