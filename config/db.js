import mongoose from "mongoose";
import colors from "colors";

const ConnectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connected to MongoDB database ${conn.connection.host}`);
    }catch(error){
        console.log(`Error in MongoDB ${error}`.bgRed.white)
    }
}

export default ConnectDB;