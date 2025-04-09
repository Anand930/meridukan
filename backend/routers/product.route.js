import express from 'express'
import { verifyAuthToken } from '../middleware/verifyAuthToken.js';
import { addProduct,deleteProduct,getProduct,sellProduct,updateProduct } from '../controllers/product.controller.js'
import { upload } from '../utils/cloudinary.js';
// import { verifyAuthToken } from '../middleware/verifyAuthToken.js';

const router = express.Router();


router.post('/addproduct',upload.single('productImage'), verifyAuthToken, addProduct)
router.get('/deleteproduct',verifyAuthToken, deleteProduct)
router.post('/updateproduct/updatesellingprice',verifyAuthToken,updateProduct.updateSellingPrice)
router.post('/updateproduct/updatecostprice',verifyAuthToken,updateProduct.updateCostPrice)
router.post('/updateproduct/updatewholeproduct',verifyAuthToken,updateProduct.updateWholeProduct)
router.post('/updateproduct/updatequantity',verifyAuthToken,updateProduct.updateQuantity)
router.post('/updateproduct/updatedescription',verifyAuthToken,updateProduct.updateDescription)
router.get('/getproduct', verifyAuthToken, getProduct)
router.get('/getproductbyproductid' );
router.post('/sellproduct',verifyAuthToken, sellProduct)



export default router