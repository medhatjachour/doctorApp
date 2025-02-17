import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import doctorModel from "./../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
// api for adding doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const fileImage = req.file;
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.status(400).json({ success: false, message: `missing data` });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: `please enter a valid email` });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: `please enter a strong password` });
    }
    // hash password
    const salty = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salty);

    // upload image to cloudinary
    const imageUploaded = await cloudinary.uploader.upload(fileImage.path, {
      resource_type: "image",
    });
    const imageUrl = imageUploaded.secure_url;

    // save date in db
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
      experience,
    };

    const newDoc = new doctorModel(doctorData);
    await newDoc.save();
    return res
      .status(200)
      .json({ success: true, message: ` doctor ${doctorData.name} added ` });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Server Error ${error}` });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Ensure the cookie is only sent over HTTPS in production
        sameSite: "strict", // Prevents CSRF attacks
      });
      const message = "Login successful. Token has been set.";
      return res.status(200).json({ success: true, token, message });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Server error: ${error.message}` });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    return res.json({ success: true, doctors });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    return res.json({ success: true, appointments });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
const appointmentCancel = async (req, res) => {
    try {
      const {  appointmentId } = req.body;
  
      const appointmentData = await appointmentModel.findById(appointmentId);
  
      
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
  
      // releasing doctor slot
      const { docId, slotDate, slotTime } = appointmentData;
      const doctorData = await doctorModel.findById(docId);
      let slots_booked = doctorData.slots_booked;
  
      if (slots_booked[slotDate]) {
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
      } else {
        // Initialize slots_booked[slotDate] as an empty array if it doesn't exist
        slots_booked[slotDate] = [];
      }
  
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
  
      return res
        .status(200)
        .json({ success: true, message: "Appointment Cancelled" });
  
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: `Server Error ${error}` });
    }
};
const adminDashboardData  = async (req, res) => {
    try {
      const doctors = await doctorModel.find({})
      const users = await userModel.find({})
      const appointments = await appointmentModel.find({})
      
      const dashData = {
        doctors :doctors.length,
        patients :users.length,
        appointments :appointments.length,
        latestAppointment:appointments.reverse().slice(0,5)
      } 
      
      return res.json({ success: true, dashData });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  };

export { addDoctor, loginAdmin, getAllDoctors, getAllAppointments ,appointmentCancel,adminDashboardData};
