import express from 'express'
import { addProduct,deleteProduct,updateProduct } from '../controllers/product.controller.js'

const router = express.Router();


router.post('/addproduct',addProduct)
router.get('/deleteproduct',deleteProduct)
router.get('/updateproduct/updatesellingprice',updateProduct.updateSellingPrice)
router.post('/updateproduct/updatewholeproduct',updateProduct.updateWholeProduct)


export default router