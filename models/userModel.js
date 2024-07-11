import mongoose from "mongoose";

//creating scheama for the mongodb mongoose database which is a noSQL database the data is stored in like kind of json object like structure

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        require:true,
    },
    question:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:0
    }


} , {timestamps:true});

export default mongoose.model('users' , userSchema)