require('dotenv').config();
const multer = require('multer');
const path = require('path');

const express = require('express');
const mongoose = require("mongoose")
const app = express();

const PORT = process.env.PORT || 3000;

// Packages
const cors = require('cors');
const cookieParser = require('cookie-parser')

// Configuration for CORS
const corsOptions = {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200
};

//database
const connectDB = require('./db/connect')

const authRouter = require('./routes/authRoutes')
const productRouter = require('./routes/productRoutes')

// Express Middleware
app.use(express.json());

// Use cors middleware
app.use(cors(corsOptions));

// Suppress the deprecation warning
mongoose.set('strictQuery', false)

//home route
app.get('/', (req, res) => {
    res.send('<h1>Welcome To the API</h1>')
})

app.use('/img', express.static(path.join(__dirname, 'img')));

// Print URL Request from client
app.use((req, res, next) => {
    console.log(`URL Requested: ${req.originalUrl}`);
    next();
});

//cookie parser
app.use(cookieParser(process.env.JWT_SECRET));

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/products', productRouter)


app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        status: err.status || 'error',
        message: err.message
    })
})

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(PORT, console.log(`Server in listening on port ${PORT}...`))
    } catch (error) {
        console.log(error)
    }
}

start()