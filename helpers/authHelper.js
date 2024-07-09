import bcrypt from "bcrypt";
//import { decrypt } from "dotenv";


//we are using bcrypt to hash the password and that hash is what is stored in the database

export const hashPassword = async(password)=> {
    try{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password , saltRounds);
        return hashedPassword;
    }
    catch(error){
        console.log(error)
    }
};

export const comparePassword = async(password, hashedPassword)=>{
    return bcrypt.compare(password , hashedPassword);
}