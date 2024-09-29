import express from "express"
import cors from "cors"
import Router from "./routes/PaymentRoutes.js";
import mongoose from "mongoose";
const co=async()=>{
    try {
        const {connection} =await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected with ${connection.host}`);
    } catch (error) {
        console.log(error.message);
    }
}
co();
const app=express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/api",Router)
app.get("/",(req,res)=>{
    res.send("payment gateway")
})
app.listen(process.env.PORT,()=>{
    console.log("server is running on port",+process.env.PORT);
})