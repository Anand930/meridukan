import { Customer } from "../models/customer.model.js";
import Product from "../models/product.model.js";
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

    console.log("req", req.body);

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
    });

    if (newProduct) {
      console.log("before save", newProduct);

      const data = await newProduct.save().catch(err => {
        console.log("Save error:", err);
        return res.status(500).json({ message: "DB Save error", error: err });
      });
      if (data) {
        console.log("after Save", data);
      }
      return res
        .status(201)
        .json({ message: "new product added successfully" });
    }
    if (!newProduct) {
      return res
        .status(500)
        .json({ message: "Failed to create product object" });
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
        categories,
        description,
        costPrice,
        sellingPrice,
        purchaseDate,
        supplierName,
        destroyedQuantity,
        expiryDate,
      } = req.body;

      if (
        !name ||
        !categories ||
        !description ||
        !costPrice ||
        !sellingPrice ||
        !purchaseDate ||
        !supplierName ||
        !destroyedQuantity ||
        !expiryDate
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const productToUpdate = await Product.findOne({ name });
      productToUpdate.categories = categories;
      productToUpdate.description = description;
      productToUpdate.costPrice = costPrice;
      productToUpdate.sellingPrice = sellingPrice;
      productToUpdate.purchaseDate = purchaseDate;
      productToUpdate.supplierName = supplierName;
      productToUpdate.destroyedQuantity = destroyedQuantity;
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
    const products = await Product.find({});
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

  try {
    const requiredProduct = await Product.findOne({ name });

    if (!requiredProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const requiredCustomer = await Customer.findOne({ name: customer });
    if (!requiredCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Update available quantity
    requiredProduct.availableQuantity =
      parseInt(requiredProduct.availableQuantity) - parseInt(quantity);

    await requiredProduct.save();

    // Update customer purchase history
    requiredCustomer.saleHistory = requiredCustomer.saleHistory || [];
    requiredCustomer.saleHistory.push({
      products: requiredProduct._id,
      quantity,
    });

    const saleHistory = await Promise.all(
      requiredCustomer.saleHistory.map(async (item) => {
        const product = await Product.findById(item.products);
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
    const updatedRequiredProduct = await Product.findOne({ name });
    const updatedRequiredCustomer = await Customer.findOne({ customer });

    return res.status(200).json({
      message: "Product sold",
      updatedProduct: updatedRequiredProduct,
      updatedCustomer: updatedRequiredCustomer,
    });
  } catch (error) {
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
