import dotenv from "dotenv"
import express from 'express'
import dbConnect from "./db/index.js"
import userRoute from "./routers/user.route.js"
import customerRoute from './routers/customer.route.js'
import productRoute from './routers/product.route.js'
dotenv.config()

const app = express();
app.use(express.json())

app.listen(process.env.PORT, ()=>{
    console.log(`App is running at ${process.env.PORT}`);
})


app.get('/',(req,res)=>{
    res.send("app is running")
})

// routing middleware
app.use('/api/user', userRoute)
app.use('/api/product', productRoute)
app.use('/api/customer', customerRoute)

dbConnect();
