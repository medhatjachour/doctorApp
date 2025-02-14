
import validator from 'validator';
import bcrypt from 'bcrypt';
import {v2 as cloudinary} from 'cloudinary';
import jwt from 'jsonwebtoken'
import doctorModel from './../models/doctorModel.js';
// api for adding doctor
const addDoctor = async (req, res) => {
    try {
        const {name,email,password,speciality,degree,experience,about,fees,address} = req.body;
        const fileImage = req.file
        if( !name||!email||!password||!speciality||!degree||!experience||!about||!fees||!address){
            
        return res.status(400).json({success:false, message: `missing data`});
        }
        if (!validator.isEmail(email)){
        return res.status(400).json({success:false, message: `please enter a valid email`});

        }
        if (password.length < 8 ){
        return res.status(400).json({success:false, message: `please enter a strong password`});
        }
        // hash password
        const salty = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salty);
        
        // upload image to cloudinary
        const imageUploaded = await cloudinary.uploader.upload(fileImage.path,{resource_type:'image'});
        const imageUrl = imageUploaded.secure_url;

        // save date in db
        const doctorData = {
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            about,
            fees ,
            address:JSON.parse(address),
            date:Date.now(),
            experience,
        }

        const newDoc = new doctorModel(doctorData)
        await newDoc.save()
        return res.status(200).json({success:true, message: ` doctor ${doctorData.name} added `});

    } catch (error) {
        res.status(500).json({success:false,message: `Server Error ${error}`});
        
    }
}

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.cookie('authToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Ensure the cookie is only sent over HTTPS in production
                sameSite: 'strict', // Prevents CSRF attacks
            });
            const message = "Login successful. Token has been set.";
            return res.status(200).json({ success: true, token, message });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
};

export{addDoctor,loginAdmin}