const express = require('express')
const router = express.Router()

const { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productControllers')

router.post("/create", createProduct)
router.patch("/:id", updateProduct)
router.delete("/:id", deleteProduct)
router.get("/", getAllProducts)
router.get("/:id", getSingleProduct)


module.exports = router 
