import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import {router} from "./routes/userRoutes.js";
import {propertyRouter} from "./routes/propertyRoutes.js";
import {bookingRouter} from "./routes/bookingRouter.js";
import {tripRouter} from "./routes/tripRouter.js";

import connectDB from "./utils/db.js";

dotenv.config();

const app=express();

app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174"],
    credentials: true
}));

app.use(express.json({limit:"100mb"}))
app.use(express.urlencoded({limit:"100mb",extended:true}))
app.use(cookieParser())
app.use(cors({
    origin:process.env.ORIGIN_ACCESS_URL,
    credentials:true
}))
const PORT=process.env.PORT;

app.get("/",(req,res)=>{
    res.send("Homelyhub server is running")
})
app.use("/api/v1/rent/user",router)
app.use("/api/v1/rent/listing",propertyRouter)
app.use("/api/v1/rent/booking",bookingRouter)
app.use("/api/v1/rent/trip",tripRouter)
connectDB();

app.listen(PORT,()=>{
    console.log(`App is running on port no: ${PORT}`);
})