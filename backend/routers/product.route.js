import express from 'express'
import { addProduct,deleteProduct } from '../controllers/product.controller.js'

const router = express.Router();


router.post('/addproduct',addProduct)
router.get('/deleteproduct',deleteProduct)


export default router