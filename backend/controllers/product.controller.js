import Product from '../models/product.model.js'

const addProduct = async (req, res) => {
    try {
        const { name, categories, description, costPrice, sellingPrice, purchaseDate, supplierName, destroyedQuantity, expiryDate } = req.body;

        if (!name || !categories || !description || !costPrice || !sellingPrice || !purchaseDate || !supplierName || !destroyedQuantity || !expiryDate) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const newProduct = new Product({name, categories, description, costPrice, sellingPrice, purchaseDate, supplierName, destroyedQuantity, expiryDate})
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


export { addProduct, deleteProduct, updateProduct }