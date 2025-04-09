import { Customer } from "../models/customer.model.js";

const customerController = {
  // adding customer
  addCustomer: async (req, res) => {
    try {
      const { fullName, phone, address } = req.body;
      console.log(req.body);

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
      console.log("Error: ", error);
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
      console.log("Error: ", error);
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
      console.log("Error occured while trying to fetch the customers");
    }
  },
  setOverdueAmount: async (req, res) => {
    try {
      const { paidAmount, name } = req.body;
      const customer = await Customer.findOne({ name });
  
      if (!customer) {
        return res.status(400).json({ message: "Customer not found" });
      }
  
      console.log(customer);
  
      // Ensure paymentHistory is an array before calling map
      const totalpaidAmount = (customer.paymentHistory && customer.paymentHistory.length > 0)
        ? customer.paymentHistory.reduce((num, entry) => num + (entry.paidAmount || 0), 0)
        : 0;
  
      console.log("Total Paid Amount:", totalpaidAmount);
  
      if (isNaN(totalpaidAmount)) {
        console.log("totalPaidAmount is NaN, setting to 0");
      }
  
      // Ensure paidAmount is a number
      const parsedPaidAmount = Number(paidAmount) || 0;
  
      customer.dueAmount = customer.totalSpend - (totalpaidAmount + parsedPaidAmount);
      customer.paymentHistory.push({ paidAmount: parsedPaidAmount });
  
      console.log("Updated Due Amount:", customer.dueAmount);
  
      await customer.save();
      res.status(200).json({ message: "Due amount updated", customer });
    } catch (error) {
      console.log("Something went wrong while updating the due amount", error.message);
      res.status(500).json({
        message: "Error occurred while trying to set the overdue amount",
        error,
      });
    }
  }
  ,
};

export { customerController };
