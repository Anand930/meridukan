import { Customer } from '../models/customer.model.js';
import Product from '../models/product.model.js'
import User from '../models/user.model.js'

const addProduct = async (req, res) => {
    try {
        const { name,id, categories, description, costPrice, sellingPrice, purchaseDate, supplierName, destroyedQuantity, expiryDate, productImage, productQuantity } = req.body;

        if(!req.file){
            return res.status(500).json({message:"file not uploaded"})
        }
        
        if (!name || !id || !categories || !description || !costPrice || !sellingPrice || !purchaseDate || !supplierName  || !expiryDate) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const newProduct = new Product({name, id, categories, description, costPrice, sellingPrice, purchaseDate,availableQuantity:productQuantity, supplierName, expiryDate, productImage:req.file?.path})
        console.log(newProduct);
        
        if (newProduct) {
             await newProduct.save()
             return res.status(201).json({message:"new product added successfully"}) 
            }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "product not added" })
    }
}


const deleteProduct = async (req,res) => {
    try {
        const { name } = req.body;
        const result = await Product.deleteOne({ name:name })
        console.log(result);
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "product not found" })
        }
        return res.status(200).json({message:"product deleted successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json("product not deleted")
    }
}

const updateProduct={
    updateSellingPrice:async(req,res)=>{
        try {
            const {name,updatedSellingPrice} = req.body
            const selectedProduct = await Product.findOne({name})

            if(!selectedProduct){
                return res.status(404).json({message:"product not found"})
            }

            selectedProduct.sellingPrice = updatedSellingPrice
            const result = await selectedProduct.save()
            if(result){
                return res.status(201).json({message:"selling price updated successfully"})
            }
        } catch (error) {
            console.log("Error: ", error);
            return res.status(500).json({message:"selling price not updated"})
        }
    },
    updateWholeProduct:async(req,res)=>{
        try {
            const { name, categories, description, costPrice, sellingPrice, purchaseDate, supplierName, destroyedQuantity, expiryDate } = req.body;

            if (!name || !categories || !description || !costPrice || !sellingPrice || !purchaseDate || !supplierName || !destroyedQuantity || !expiryDate) {
                return res.status(400).json({ message: "All fields are required" })
            }
            const productToUpdate = await Product.findOne({name})
            productToUpdate.categories = categories
            productToUpdate.description = description
            productToUpdate.costPrice = costPrice
            productToUpdate.sellingPrice = sellingPrice
            productToUpdate.purchaseDate = purchaseDate
            productToUpdate.supplierName = supplierName
            productToUpdate.destroyedQuantity = destroyedQuantity
            productToUpdate.expiryDate = expiryDate
            const result = await productToUpdate.save()
            console.log(result);
            if(result){
                return res.status(201).json({message:"Product updated Successfully"})
            }

        } catch (error) {
            console.log("Error: ",error);
            return res.status(500).json({message:"Product not Updated"})
        }
    }
}

const getProduct = async (req,res) =>{
    try {
        const products = await Product.find({})
        res.status(201).json({message:"product fetched", products})
    } catch (error) {
        console.log(error);
    }

}

const getProductByProductId = async(req,res)=>{
    const id = req.body;
    try {
        const product = await Product.findOne({id});
        if(!product){
            console.log("product not get fetched by given id")
            return res.status(500).json({message:"something went wrong while fetching the product with given id"})
        }else{
            res.status(200).json({message:"product fetched successfully by given id ", product})
        }
        console.log(product);
        
    } catch (error) {
        console.log("Error while trying to fetch the product with given id ", error);
        
    }
}

const sellProduct = async (req, res) => {
    const { name, quantity, customer } = req.body;
    
    console.log(req.body);
    
    try {
        const requiredProduct = await Product.findOne({name})    
        
        if (!requiredProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        const requiredCustomer = await Customer.findOne({ name: customer });
        if (!requiredCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        // Update available quantity
        requiredProduct.availableQuantity -= quantity;
        await requiredProduct.save();

        // Update customer purchase history
        console.log(typeof quantity)
        requiredCustomer.saleHistory?.push({ product:requiredProduct._id, quantity});
        await requiredCustomer.save();

        return res.status(200).json({ message: "Product sold", updatedProduct: requiredProduct, updatedCustomer: requiredCustomer });
    } catch (error) {
        console.log("Error while selling the product:", error);
        return res.status(500).json({ message: "Error while selling product" });
    }
};


export { addProduct, deleteProduct, updateProduct , getProduct, getProductByProductId, sellProduct}