import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import cookieParser from'cookie-parser'
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary()
// middleware
app.use(express.json())
// for admin token
app.use(cookieParser());
app.use(cors());

// api routing 
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
// api endpoints
app.get('/',(req,res)=>{
    res.send('apu woirnd')
})

app.listen(port,()=>console.log(`Server is running on port ${port}`))