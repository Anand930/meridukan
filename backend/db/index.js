import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        const response = await mongoose.connect(process.env.URI)    
        if(response) console.log("db Connected");
    } catch (error) {
        console.log(`${error} Db not connected something went wrong`);
    }
}



export default dbConnect