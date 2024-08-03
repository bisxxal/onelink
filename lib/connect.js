'use server'
import mongoose from "mongoose";

const ConnectDb = async()=>{
    try {
      await  mongoose.connect(process.env.MONGO_URI).then( console.log("db connected"))
    } catch (error) {
        console.log('mongoooo errror' , error);
    }
    
}

export default ConnectDb