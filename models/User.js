import mongoose, { model, models } from "mongoose";

const userSchema =mongoose.Schema({
    user:{
        type:String, 
    },
    emai:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },

    emailVerified:{
        type:Date,
    }
     
}) 

export const UserModel = models?.Users || model('Users',userSchema)

// export const PageModel =models?.Page|| model('Page',PageSchema)