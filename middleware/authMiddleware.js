import JWT, { decode } from "jsonwebtoken";
import userModel from "../models/userModel";

//Protected routes token base

export const requiresSignIn = async (res , req , next)=>{
    //whenever a req is sent then next is validated then a res is sent
    try{
    const Validation = JWT.verify(req.headers.authorizations , process.env.JWT_SECRET);
    next();
    }
    catch(error){
        console.log(error);
    }
}

//admin access
//In the database there is a role field if it is 0 then it is a user if it is a 1 then it is an admin
export const isAdmin = async (req , res , next)=>{
    try{
        const user = await userModel.findById(req.user._id);
        if(user.role !== 1){
            return res.status(401).send({
                success:false,
                message:"Unauthorized access"
            })
        }
        else{
            //decoding user and then moving forward with next() if we do not do that then an error will be arised because JWT token is encoded and not accessible
            req.user = decode;
            next();
           
        }
    }
    catch(error){
        console.log(error);
        res.status(401).send({
            success:false,
            message:"Error in admin middleware",
            error
            
        })
    }
}