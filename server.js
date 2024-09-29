import {config} from "dotenv"
config({path:".env"})
import Razorpay from "razorpay"
export const  instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SCERET_KEY,
});