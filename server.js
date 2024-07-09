import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import ConnectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"


//create a .env file which should contain the following before running this
//PORT = 8080 //this port should be added to the proxy of the react app's package.json file
//DEV_MODE = development  //For now we are in the development environment
//MONGODB_URI = //your mongodb url you should create a cluster first on shared profile and create a user database there
//JWT_SECRET = MAINHOON_GIAN_MAIN_HOON_BADA_TAKATWAR //can be anything else you like



dotenv.config();

//databse config

ConnectDB(); 

//rest object
const app = express()

//middleware
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/auth" , authRoutes)

//rest apis
app.get('/' , (req , res)=>{
    res.send({
        message:'Welcome to ecommerce app'
    })

    const PORT = process.env.PORT||8080;

    app.listen(PORT , ()=>{
        console.log(`Server running on ${PORT} in ${process.env.DEV_MODE} mode`);
    })
})