import {Customer} from "../models/customer.model.js";

const customerController = {

    // adding customer
    addCustomer: async(req,res)=>{
        try {
            const{fullName,phone,address} = req.body
            console.log(req.body);
            
            const newCustomer = new Customer({name:fullName,phone,address})
            if(!newCustomer){
                return res.status(404).json("customer not created check provided data please")
            }
            const result = await newCustomer.save();
            if(result){
                return res.status(200).json({message:"customer added successfully"})
            }
        } catch (error) {
            console.log("Error: ",error);
            return res.status(500).json({message:"customer not added"})
        }
    },

    // update customers profile (personal info)
    updateCustomerProfile: async(req,res)=>{
        try {
            const{name,phone,address} = req.body;
            const selectedCustomer = await Customer.findOne({name});
            if(!selectedCustomer){
                return res.status(400).json({message:"no customer with given name"})
            }
            selectedCustomer.phone = phone
            selectedCustomer.address = address
            const result = await selectedCustomer.save()
            if(result){
                return res.status(200).json({message:"customer updated successfully"})
            }
        } catch (error) {
            console.log("Error: ",error);
            return res.status(500).json({message:"customer's info not updated"})                        
        }
    },
    getCustomer: async(req,res)=>{
        try {
            const customers = await Customer.find();
            if(customers){
                res.status(200).json({message:"customer fetched ", customers})
            }
        } catch (error) {
            console.log("Error occured while trying to fetch the customers")
        }

    }
}

export {customerController}