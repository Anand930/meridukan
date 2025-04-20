import mongoose, {model, Schema} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    fullname:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:[true, "username is required"],
        unique:[true, "username should be unique for every user"]
    },
    email:{
        type:String,
        required:[true, "email is required"],
        unique:[true, "email should be unique for every user"]
    },
    password:{
        type:String,
        required:[true, "Please enter your password"]
    },
    profileImage:{
        type:String
    },
    soldProducts:[{
        product:{
            type:Schema.Types.ObjectId,
            ref:'Product',
            require:[true, "product object id is required"]
        },
        name:{
            type:String
        },
        quantity:{
            type:Number,
            required:[true, "quantity is required"]
        },
        sellingPrice:{
            type:Number,
            required:[true, "selling Price is required"]
        },
        soldDate:{
            type:Date,
            required:[true,"sold date is required"],
            default:Date.now()
        }
    }],
    accessToken:{
        type:String
    },
    refreshToken:{
        type:String
    }

},{timestamps:true})


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})



userSchema.methods.generateAccessToken = function(){
    const secret = process.env.AUTH_SECRET;
    const payload = {id:this._id, email:this.email, username:this.username, fullname:this.fullname, profileImage:this.profileImage}
    const token = jwt.sign(payload,secret,{expiresIn:"1h"})
    return token;
}

userSchema.methods.generateRefreshToken = function(){
    const secret = process.env.REFRESH_SECRET;
    const payload = {id:this._id, email:this.email, username:this.username, fullname:this.fullname, profileImage:this.profileImage}
    const token = jwt.sign(payload,secret,{expiresIn:"7d"})
    return token;
}

const User = new model("user",userSchema)
export default User