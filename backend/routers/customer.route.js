import express from 'express'
import { customerController } from "../controllers/customer.controller.js";
import { verifyAuthToken } from '../middleware/verifyAuthToken.js';


const router = express.Router();

router.post('/addcustomer', verifyAuthToken, customerController.addCustomer)
router.post('/updatecustomerprofile', verifyAuthToken, customerController.updateCustomerProfile)
router.get('/getcustomer', verifyAuthToken, customerController.getCustomer)
router.post('/setdueamount', verifyAuthToken, customerController.setOverdueAmount)

export default router
