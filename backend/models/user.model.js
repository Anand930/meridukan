import mongoose, {model, Schema} from "mongoose";

const userScheme = new Schema({
    fullName:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:[true, "username is required"],
        unique:true
    },
    email:{
        type:String,
        required:[true, "email is required"],
        unique:[true, "email should be unique for every user"]
    },
    password:{
        type:String,
        required:[true, "Please enter your password"]
    }
},{timestamps:true})

const User = new model("user",userScheme)
export default User