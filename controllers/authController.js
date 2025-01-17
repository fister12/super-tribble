import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const RegisterController = async(res , req)=>{
    try{
        const {name , email , password , phone , address} = req.body;
        //validation
        if(!name){
            return res.send({error:"Name is required"});
        }
        if(!email){
            return res.send({error:"Email is required"});
        }
        if(!password){
            return res.send({error:"Password is required"});
        }
        if(!phone){
            return res.send({error:"Phone number is required"});
        }
        if(!address){
            return res.send({error:"Address is required"});
        }
        //check user
        const existinguser = await userModel.findOne({email});

        if(existinguser){
            return res.status(200).send({
                success:true,
                message:"Error in registration",
                error
            });
        }

        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = new userModel({name , email , phone , address , password: hashedPassword}).save();

        res.status(201).send({
            success:true,
            message:"User registered successfull",
            user
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message: "Error in registration",
            error
        })
    }
}


//POST LOGIN
export const loginController = async (req , res)=>{
    try{
        const {email , password} = req.body

        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Invalid email or password",
                

            })
        }
        //check user
        const user = await userModel.findOne({email});

        if(!user){
            
                res.status(404).send({
                    success:false,
                    message:"Email is not registered"
                });
        }


        const match = await comparePassword(password , user.password);

        if(!match){
            res.status(200).send({
                success:false,
                message:"Invalid password"
            });
        }

        //token
        const token = await JWT.sign({user_id:id} , process.env.JWT_SECRET , {expiresIn: "7d"});


        res.status(201).send({
            success:true,
            message:"logged in Successfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
            },
            token
        });

    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:fail,
            message:"Error in login",
            error
        })
    }
}

//forgot password controller

export const forgotPasswordController = async(req , res)=>{
        try{
            const {email , question , newPassword} = req.body;

            if(!email){
                res.status(400).send({message:'Email is requires'});
            }
            if(!question){
                res.status(400).send({message:'question is requires'});
            }
            if(!newPassword){
                res.status(400).send({message:'newPassword is required'})
            }
            //checking for the user
            const user = await userModel.findOne({email , question});

            //validate
            if(!user){
                return res.status(404).send({message:'User not found', success:false});
            }

            const hashed = await hashPassword(newPassword);
            await userModel.findByIdAndUpdate(user._id) , {password: hashed};

            res.status(200).send({
                success:true,
                message:'password reset successfull'
            });
        }
        catch(error){
            console.log(error);
            res.status(500).send({
                success:false,
                message:'Something went wrong',
                error
            })
        }

}


//test controller
export const testController = (res , req)=>{
    console.log("protected route");
}