import mongoose,{Schema, model} from "mongoose";

const productSchema = new Schema({
    name:{
        type:String,
        required:[true, "name is required"],
        unique:[true, "product name should be unique for each product"]
    },
    categories:{
        type:String,
        required:[true,"product's category is required"],
        enum:["Dairy","Snacks","Children's Snacks", "Toffes and Candys", "Biscuit","Stationary","Cereals","Others"]
    },
    description:{
        type:String,
        minlength:[20, "product discription should be minimum 20 characters"]
    },
    costPrice:{
        type:Number,
        required:[true, "cost price is required for every products"]
    },
    sellingPrice:{
        type:Number,
        required:[true, "selling price is required for every products"]
    },
    purchaseDate:{
        type:[Date],
        required:true,
        default:[]
    },
    supplierName:{
        type:[String],
        required:[true, "Supplier name is required"]
    },
    destroyedQuantity:{
        type:Number,
        default:0
    },
    expiryDate:{
        type:Date
    }
},{timestamps:true})



const Product = new model('product', productSchema)

export default Product