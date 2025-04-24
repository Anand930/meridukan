import { Customer } from "../models/customer.model.js";
import Product from "../models/product.model.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      id,
      categories,
      description,
      costPrice,
      sellingPrice,
      purchaseDate,
      supplierName,
      expiryDate,
      productQuantity,
    } = req.body;

    const token = req?.headers?.authorization?.split(" ")[1];

    console.log("token ", token);

    const user = token ? jwt.decode(token) : "";
    if (!user) {
      return res
        .status(400)
        .json({ message: "user details not decoded from the given token" });
    }
    const userDetails = await User.findById({ _id: user.id });
    console.log("user decoded ", user);
    console.log("user fetched ", userDetails);

    if (!req.file) {
      return res.status(500).json({ message: "file not uploaded" });
    }

    if (
      !name ||
      !id ||
      !categories ||
      !description ||
      !costPrice ||
      !sellingPrice ||
      !purchaseDate ||
      !supplierName ||
      !expiryDate
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product({
      name,
      id,
      categories,
      description,
      costPrice,
      sellingPrice,
      purchaseDate,
      availableQuantity: productQuantity,
      supplierName,
      expiryDate,
      productImage: req.file?.path,
      createdBy: user.id,
    });

    if (newProduct) {
      console.log("before save", newProduct);
      const data = await newProduct.save();

      if (data) {
        console.log("after Save", data);
      }
      return res
        .status(201)
        .json({ message: "new product added successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: "product not added", error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await Product.deleteOne({ name: name });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "product not found" });
    }
    return res.status(200).json({ message: "product deleted successfully" });
  } catch (error) {
    return res.status(500).json("product not deleted");
  }
};

const updateProduct = {
  // selling price updated on selling the product
  updateSellingPrice: async (req, res) => {
    try {
      const { productName, updatedValue } = req.body;

      const selectedProduct = await Product.findOne({ name: productName });

      if (!selectedProduct) {
        return res.status(404).json({ message: "product not found" });
      }

      selectedProduct.updateHistory.push({
        fieldName: "Selling Price",
        oldValue: selectedProduct.sellingPrice,
        updatedValue,
      });
      selectedProduct.sellingPrice = updatedValue;
      const result = await selectedProduct.save();
      if (result) {
        return res
          .status(201)
          .json({ message: "selling price updated successfully" });
      }
    } catch (error) {
      return res.status(500).json({ message: "selling price not updated" });
    }
  },

  // update cost price of the product
  updateCostPrice: async (req, res) => {
    try {
      const { productName, updatedValue } = req.body;

      const selectedProduct = await Product.findOne({ name: productName });

      if (!selectedProduct) {
        return res.status(404).json({ message: "product not found" });
      }

      selectedProduct.updateHistory.push({
        fieldName: "Cost Price",
        oldValue: selectedProduct.costPrice,
        updatedValue,
      });
      selectedProduct.costPrice = updatedValue;
      const result = await selectedProduct.save();
      if (result) {
        return res
          .status(201)
          .json({ message: "Cost Price updated successfully" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Cost Price not updated" });
    }
  },

  // update product description
  updateDescription: async (req, res) => {
    try {
      const { productName, updatedValue } = req.body;

      const selectedProduct = await Product.findOne({ name: productName });

      if (!selectedProduct) {
        return res.status(404).json({ message: "product not found" });
      }

      selectedProduct.updateHistory.push({
        fieldName: "Description",
        oldValue: selectedProduct.description,
        updatedValue,
      });
      selectedProduct.description = updatedValue;
      const result = await selectedProduct.save();
      if (result) {
        return res
          .status(201)
          .json({ message: "Description updated successfully" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Description not updated" });
    }
  },

  // update product quantity
  updateQuantity: async (req, res) => {
    try {
      const { productName, updatedValue } = req.body;

      const selectedProduct = await Product.findOne({ name: productName });

      if (!selectedProduct) {
        return res.status(404).json({ message: "product not found" });
      }

      selectedProduct.updateHistory.push({
        fieldName: "Quantity",
        oldValue: selectedProduct.availableQuantity,
        updatedValue,
      });
      selectedProduct.availableQuantity = updatedValue;
      const result = await selectedProduct.save();
      if (result) {
        return res
          .status(201)
          .json({ message: "Quantity updated successfully" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Quantity is not updated", error });
    }
  },

  // update Whole Product
  updateWholeProduct: async (req, res) => {
    try {
      const {
        name,
        description,
        costPrice,
        sellingPrice,
        availableQuantity,
        expiryDate,
      } = req.body;
      console.log(req.body);

      if (
        !name ||
        !description ||
        !costPrice ||
        !sellingPrice ||
        !availableQuantity ||
        !expiryDate
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const productToUpdate = await Product.findOne({ name });
      if (
        productToUpdate.description === description &&
        productToUpdate.costPrice === costPrice &&
        productToUpdate.sellingPrice === sellingPrice &&
        productToUpdate.availableQuantity === availableQuantity &&
        productToUpdate.expiryDate === expiryDate
      ) {
        return res.status(302).json({ message: "Not modified" });
      }

      productToUpdate.description = description;
      productToUpdate.costPrice = costPrice;
      productToUpdate.sellingPrice = sellingPrice;
      productToUpdate.availableQuantity = availableQuantity;
      productToUpdate.expiryDate = expiryDate;

      const result = await productToUpdate.save();

      if (result) {
        return res
          .status(201)
          .json({ message: "Product updated Successfully" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Product not Updated" });
    }
  },
};

const getProduct = async (req, res) => {
  try {
    const accessToken = req.headers.split(" ")
    const products = await Product.find({createdBy:user._id});
    res.status(201).json({ message: "product fetched", products });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error occured while getting the product", error });
  }
};

const getProductByProductId = async (req, res) => {
  const id = req.body;
  try {
    const product = await Product.findOne({ id });
    if (!product) {
      return res.status(500).json({
        message:
          "unable to find the product by id either product is not available or wrong id",
      });
    } else {
      res.status(200).json({
        message: "product fetched successfully by given id ",
        product,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "error occured while getting the product by id",
      error,
    });
  }
};

const sellProduct = async (req, res) => {
  const { name, quantity, customer } = req.body;
  const token = req?.headers?.authorization?.split(" ")[1];
  const verified = jwt.verify(token, process.env.AUTH_SECRET)
  if(!verified){
    return res.status(402).json({message:"Invalid or Expired Token"})
  }

  try {
    const requiredProduct = await Product.findOne({ name });

    if (!requiredProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (requiredProduct?.availableQuantity <= 0) {
      return res.status(400).json({ message: "not enough stock available" });
    }

    if (token) {
      
      const user = jwt.decode(token);
      const requiredUser = await User.findOne({ email: user.email });
      if (!requiredUser) {
        return res.status(401).json({ message: "user not found" });
      }
      requiredUser.soldProducts = requiredUser.soldProducts || [];
      requiredUser.soldProducts.push({
        product:requiredProduct?._id,
        name:requiredProduct?.name,
        quantity,
        sellingPrice:requiredProduct?.sellingPrice
      })

      await requiredUser.save()
    }

    // Update available quantity
    requiredProduct.availableQuantity =
      parseInt(requiredProduct.availableQuantity) - parseInt(quantity);

    await requiredProduct.save();

    if (customer) {
      const requiredCustomer = await Customer.findOne({ name: customer });

      // Update customer purchase history
      if(!requiredCustomer){
        return res.status(400).json({message:"customer not found"})
      }
      requiredCustomer.saleHistory = requiredCustomer.saleHistory || [];

      requiredCustomer.saleHistory.push({
        name: requiredProduct.name,
        id: requiredProduct._id,
        quantity,
      });

      const saleHistory = await Promise.all(
        requiredCustomer.saleHistory.map(async (item) => {
          const product = await Product.findOne({ name: item.name });
          return product
            ? Number(product.sellingPrice || 0) * Number(item.quantity || 0)
            : 0;
        })
      );

      requiredCustomer.totalSpend = saleHistory.reduce(
        (acc, curr) => acc + curr,
        0
      );

      const totalpaidAmount =
        requiredCustomer.paymentHistory &&
        requiredCustomer.paymentHistory.length > 0
          ? requiredCustomer.paymentHistory.reduce(
              (num, entry) => num + (Number(entry.paidAmount) || 0),
              0
            )
          : 0;

      if (isNaN(totalpaidAmount) || isNaN(requiredCustomer.totalSpend)) {
        requiredCustomer.dueAmount = 0;
      } else {
        requiredCustomer.dueAmount =
          requiredCustomer.totalSpend - totalpaidAmount;
      }

      await requiredCustomer.save();
    }
    
    const updatedRequiredProduct = await Product.findOne({ name });
    const updatedRequiredCustomer = await Customer.findOne({ name:customer });

    return res.status(200).json({
      message: "Product sold",
      updatedProduct: updatedRequiredProduct,
      updatedCustomer: updatedRequiredCustomer,
    });
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ message: "Error while selling product" });
  }
};

export {
  addProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  getProductByProductId,
  sellProduct,
};
