import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import Stripe from 'stripe'
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
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

    // save date in db
    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new userModel(userData);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({ success: true, token });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Servers Error ${error}` });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: `doesn't exist` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.status(200).json({ success: true, token });
    } else {
      return res
        .status(403)
        .json({ success: false, message: `wrong password` });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Server Error ${error}` });
  }
};

const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    return res.status(200).json({ success: true, userData });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Server Error ${error}` });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const ImageFile = req.file;

    if (!name || !phone  || !dob || !gender) {
      return res
        .status(500)
        .json({ success: false, message: `data is messing` });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (ImageFile) {
      // uplaod Image to clouadinray

      const imageUploaded = await cloudinary.uploader.upload(ImageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUploaded.secure_url;
       await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }
   
    return res.status(200).json({ success: true, message: "profile updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Server Error ${error}` });
  }
};


const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;
 
    
    const docData = await doctorModel.findById(docId).select('-password')
    
    if(!docData.available){
      return res
      .status(409)
      .json({ success: false, message: `doctor isn't available` });
    }

    let slots_booked = docData.slots_booked
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res
        .status(409)
        .json({ success: false, message: `slot not available` });
      }else{
        slots_booked[slotDate].push(slotTime)
      }
    }else{
      slots_booked[slotDate]=[]
      slots_booked[slotDate].push(slotTime)
    }
    const userData = await userModel.findById(userId).select('-password')
    delete docData.slots_booked

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount:docData.fees,
      slotTime,
      slotDate,
      date:Date.now()
    }
    const newAppointment = new appointmentModel(appointmentData)
    await newAppointment.save()

    // save slot in doc 
    await doctorModel.findByIdAndUpdate(docId,{slots_booked})

    return res
    .status(200)
    .json({ success: true, message: `Appointment booked successfully ` });


  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Server Error ${error}` });
  }
};


// get user appointment for frontend 
const listAppointment = async (req,res)=>{
  try {
    const {userId} = req.body

    const appointments = await appointmentModel.find({userId})
    return res
      .status(200)
      .json({ success: true,appointments});

  }catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Server Error ${error}` });
  }
}

const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData.userId !== userId) {
      return res
        .status(401)
        .json({ success: false, message: "unauthorized action" });
    }
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

const payment = async (req,res)=>{
  try {

    const { appointmentId } = req.body;
    const appointmentData= await appointmentModel.findById(appointmentId)
    if(!appointmentData || appointmentData.cancelled){
      
    res.status(500).json({success:false,massage:"appointment cancelled or not found" });
    }

    const option = {
      amount:appointmentData.amount*100,
      currency: process.env.CURRENCY,
    }
    console.log(option);
    
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
    console.log("option1");

    const paymentIntent = await stripe.paymentIntents.create(option);
    console.log("option2");

    res.status(200).json({  success: true,paymentIntent: paymentIntent,message:"paid successfully "});
  }  catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Server Error ${error}` });
  }
}
const verifyPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      await appointmentModel.findByIdAndUpdate(paymentIntent.id,{payment:true})
      return res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Payment not verified" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: `Server Error ${error}` });
  }
};

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, payment, verifyPayment };

