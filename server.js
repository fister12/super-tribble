import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import ConnectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

// Database config
ConnectDB();

// Create an express app
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use("/api/v1/auth", authRoutes);

// Rest APIs
app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to ecommerce app'
    });
});

// Define the port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.DEV_MODE} mode`);
});
