import mongoose, { Schema, model } from "mongoose";

const customerSchema = new Schema({
    name: {
        type: String,
        required: [true, "customers name is true"]
    },
    phone: {
        type: Number,
        required: [true, "phone no. is required for customers"],
        unique: [true, "Phone number should be unique"],
        match: [
            /^\d{10}$/,
            "Phone number must be a 10-digit number",
        ],
    },
    address:{
        type:String,
        required:[true, "address is required"],
        default:"TajNagar"
    },
    purchaseHistory:{
        type:[{
            product:{
                type:Schema.Types.ObjectId,
                ref:"product"
            },
            quantity:{
                type:Number,
                required:true
            },
            purchaseDate:{
                type:Date,
                required:true
            }
        }]
    },
    totalSpend:{
        type:Number,
        default:0
    }
},{timestamps:true})



export default Customer = new model("customer",customerSchema);