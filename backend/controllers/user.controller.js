import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'

const SignInUser = async (req,res) => {
    try {
        const { fullName, username, email, password } = req.body;

        console.log("request",req.body);
        
        if (!fullName || !username || !email || !password) {
            return res.status(400).json({ message: "all the fields are required" })
        }

        // checking for existing user wiht same email 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "user already exist" })
        }

        // creating new user
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({ fullName, username, email, password:hashedPassword })
        await newUser.save();
        return res.status(201).json({ message: "user created Successfully", user: newUser })

    } catch (error) {
        console.error("Error in creating User: ", error)
        return res.status(500).json({ message: "internal server error", error: error.message })
    }
}


const LoginUser = async(req,res)=>{
    try {
        const {email, password} = req.body;
        console.log(req.body);
        
        if(!email||!password){
          return res.status(400).json({message:"please enter email and password"})
        }

        // getting the user registered with email
        const user = await User.findOne({email})
        if(user){
            const result = await bcrypt.compare(password, user.password)
            if(!result){
                return res.status(400).json({message:"Please enter valid password"})
            }
            console.log("logged in");
            return res.status(201).json({message:"user logged in successfully", user})
        }
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({message:"some issue occur while try to login the user"})
    }
}

export {SignInUser, LoginUser}