import express from "express";
import { checkout ,paymentVerify} from "../Controllers/Payment.js";
const Router=express.Router();
Router.post("/checkout",checkout)
Router.post("/paymentSuccess",paymentVerify)
export  default Router;
