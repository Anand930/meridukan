import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    id: {
      type: String,
      required: [true, "id is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "name is required"],
      unique: [true, "product name should be unique for each product"],
    },
    categories: {
      type: String,
      required: [true, "product's category is required"],
      enum: [
        "Dairy",
        "Snacks",
        "Children's Snacks",
        "Toffes and Candys",
        "Biscuit",
        "Stationary",
        "Cereals",
        "Cold Drinks",
        "Others",
      ],
    },
    description: {
      type: String,
    },
    costPrice: {
      type: Number,
      required: [true, "cost price is required for every products"],
    },
    sellingPrice: {
      type: Number,
      required: [true, "selling price is required for every products"],
    },
    purchaseDate: {
      type: String,
      // required:true,
      default: "",
    },
    supplierName: {
      type: String,
      // required:[true, "Supplier name is required"],
    },
    availableQuantity: {
      type: String,
      required: true,
      default: 0,
    },
    destroyedQuantity: {
      type: Number,
      default: 0,
    },
    expiryDate: {
      type: Date,
    },
    productImage: {
      type: String,
      required: true,
    },
    updateHistory: [
      {
        fieldName: {
          type: String,
          required: [true, "field name is required"],
        },
        oldValue:{type:String},
        updatedValue:{type:String},
      },
    ],
    createdBy:{
      type:Schema.Types.ObjectId,
      ref:'User'
      // required:[true, "users schema id is required to save the product"]
    }
  },
  { timestamps: true }
);

const Product = new model("product", productSchema);

export default Product;
