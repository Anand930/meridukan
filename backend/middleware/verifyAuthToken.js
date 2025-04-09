import jwt from 'jsonwebtoken'
// import User from '../models/user.model.js';

const verifyAuthToken = (req,res,next) =>{
    const token = req.headers.authorization?.split(" ")[1]
    const secretkey = process.env.AUTH_SECRET;
    if(!token){
        return res.status(401).json({message:"No token found"})
    }
    try {
        const decoded = jwt.verify(token, secretkey)
        req.user = decoded
        next();
    } catch (error) {
        return res.status(403).json({message:"Invalid or expiredToken"})
    }
}

export {verifyAuthToken}
