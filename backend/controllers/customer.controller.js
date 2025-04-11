import { Customer } from "../models/customer.model.js";

const customerController = {
  // adding customer
  addCustomer: async (req, res) => {
    try {
      const { fullName, phone, address } = req.body;
      

      const newCustomer = new Customer({ name: fullName, phone, address });
      if (!newCustomer) {
        return res
          .status(404)
          .json("customer not created check provided data please");
      }
      const result = await newCustomer.save();
      if (result) {
        return res
          .status(200)
          .json({ message: "customer added successfully", newCustomer });
      }
    } catch (error) {

      return res.status(500).json({ message: "customer not added" });
    }
  },

  // update customers profile (personal info)
  updateCustomerProfile: async (req, res) => {
    try {
      const { name, phone, address } = req.body;
      const selectedCustomer = await Customer.findOne({ name });
      if (!selectedCustomer) {
        return res.status(400).json({ message: "no customer with given name" });
      }
      selectedCustomer.phone = phone;
      selectedCustomer.address = address;
      const result = await selectedCustomer.save();
      if (result) {
        return res
          .status(200)
          .json({ message: "customer updated successfully" });
      }
    } catch (error) {
      return res.status(500).json({ message: "customer's info not updated" });
    }
  },
  getCustomer: async (req, res) => {
    try {
      const customers = await Customer.find();
      if (customers) {
        res.status(200).json({ message: "customer fetched ", customers });
      }
    } catch (error) {
      res.status(500).json({message:"Error occure while getting the customer", error})
    }
  },
  setOverdueAmount: async (req, res) => {
    try {
      const { paidAmount, name } = req.body;
      const customer = await Customer.findOne({ name });
  
      if (!customer) {
        return res.status(400).json({ message: "Customer not found" });
      }
  
      // Ensure paymentHistory is an array before calling map
      const totalpaidAmount = (customer.paymentHistory && customer.paymentHistory.length > 0)
        ? customer.paymentHistory.reduce((num, entry) => num + (entry.paidAmount || 0), 0)
        : 0;
  
  
      if (isNaN(totalpaidAmount)) {
        return res.status(500).json({message:"total paid amount is not a number"})
      }
  
      // Ensure paidAmount is a number
      const parsedPaidAmount = Number(paidAmount) || 0;
  
      customer.dueAmount = customer.totalSpend - (totalpaidAmount + parsedPaidAmount);
      customer.paymentHistory.push({ paidAmount: parsedPaidAmount });
  
    
  
      await customer.save();
      res.status(200).json({ message: "Due amount updated", customer });
    } catch (error) {
      return res.status(500).json({
        message: "Error occurred while trying to set the overdue amount",
        error,
      });
    }
  }
  ,
};

export { customerController };
