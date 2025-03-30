import express from 'express'
import { addProduct,deleteProduct,getProduct,sellProduct,updateProduct } from '../controllers/product.controller.js'
import { upload } from '../utils/cloudinary.js';
// import { verifyAuthToken } from '../middleware/verifyAuthToken.js';

const router = express.Router();


router.post('/addproduct',upload.single('productImage'),addProduct)
router.get('/deleteproduct',deleteProduct)
router.get('/updateproduct/updatesellingprice',updateProduct.updateSellingPrice)
router.post('/updateproduct/updatewholeproduct',updateProduct.updateWholeProduct)
router.get('/getproduct', getProduct)
router.get('/getproductbyproductid' );
router.post('/sellproduct', sellProduct)


export default router