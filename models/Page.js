import mongoose, { model, models } from "mongoose";

const PageSchema  = mongoose.Schema({
    uri: {type: String, required: true, min: 1, unique: true},
    owner:{type:String , required:true},
    displayName:{type:String , default:''},
    location:{type:String ,default:''},
    bio:{type:String ,default:''},
    bgType:{type:String ,default:'color'},
    bgColor:{type:String ,default:'#e5e7eb'},
    bgImage: {type: String, default: ''},
    avater: {type: String, default: ''},
    buttons: {type: Object, default: {}},
    links: {type: Object, default: []},
}, {timestamps: true});

export const PageModel =models?.Page|| model('Page',PageSchema)