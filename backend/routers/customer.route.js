import express from 'express'
import { customerController } from "../controllers/customer.controller.js";


const router = express.Router();

router.post('/addcustomer',customerController.addCustomer)
router.post('/updatecustomerprofile', customerController.updateCustomerProfile)


export default router