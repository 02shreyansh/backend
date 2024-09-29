import { instance } from "../server.js";
import crypto from "crypto"
import {payment} from "../model/model.js"
export const checkout=async(req,res)=>{
    const options = {
        amount: Number(req.body.amount) *100,
        currency: "INR",
    };
    const order=await instance.orders.create(options);
    res.status(201).json({
        success:true,
        order
    })
}
export const paymentVerify=async(req,res)=>{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
    const body=razorpay_order_id+ "|" + razorpay_payment_id;
    const expected_signature=crypto.createHmac('sha256',process.env.RAZORPAY_SCERET_KEY)
                    .update(body.toString())
                    .digest('hex')
    const auth=expected_signature===razorpay_signature;
    if(auth){
        await payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        })
        res.redirect(`https://payment-frontend-mocha.vercel.app/paymentDone?reference=${razorpay_payment_id}`)
    }else{
        res.status(200).json({
            success:false,
        })
    }
    
}
