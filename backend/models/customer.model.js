import mongoose, { Schema, model } from "mongoose";

const customerSchema = new Schema({
    name: {
        type: String,
        required: [true, "customers name is true"]
    },
    phone: {
        type: String,
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
    saleHistory:{
        type:[{
            products:{
                type:Schema.Types.ObjectId,
                ref:"product"
            },
            quantity:{
                type:String,
                default:0   
            },
            saleDate:{
                type:Date,
                required:[true, "Date is required"],
                default:Date.now()
            }
        }],
        default:[]
    },
    totalSpend:{
        type:Number,
        default:0
    }
},{timestamps:true})



const Customer = new model("customer",customerSchema);

export {Customer}