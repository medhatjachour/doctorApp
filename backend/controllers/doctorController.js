import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    return res.json({ success: true, message: "Availability Updated" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password,-email"]);

    return res.json({ success: true, doctors });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.status(404).json({ success: false, message: `doesn't exist` });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      return res.status(200).json({ success: true, token });
    } else {
      return res
        .status(403)
        .json({ success: false, message: `wrong password` });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Server Error ${error.message}` });
  }
};

const doctorAppointments = async (req, res) => {
  try {
    const { docId } = req.body;

    const appointments = await appointmentModel.find({ docId });
    return res.json({ success: true, appointments });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const completeAppointment = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId );
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res
        .status(200)
        .json({ success: true, message: `Appointment completed` });
    } else {
      return res.status(404).json({ success: false, message: `Mark Failed` });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


const cancelAppointment = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId );
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res
        .status(200)
        .json({ success: true, message: `Appointment cancelled` });
    } else {
      return res.status(404).json({ success: false, message: `cancellation Failed` });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({docId} );

    let earnings = 0
    appointments.map((item)=>{
      if(item.isCompleted||item.payment){
        earnings += item.amount
      }
    })
    let patients =[]
    appointments.map((item)=>{
      if(!patients.includes(item.userId)){
        patients.push(item.userId)
      }
    })
    const dashData = {
      earnings,
      appointments:appointments.length,
      patients:patients.length,
      latestAppointments:appointments.reverse().slice(0,5)
    }
      return res
        .status(200)
        .json({ success: true, dashData});
 
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


const doctorProfile = async (req, res) => {
  try {
    const {docId} = req.body

    const profileData = await doctorModel.findById(docId).select(["-password"]);
    return res.json({ success: true, profileData });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const updateDoctorProfile = async (req, res) => {
  try {
    const {docId,fees,address,available} = req.body

    await doctorModel.findByIdAndUpdate(docId,{fees,address,available})
    return res.json({ success: true, message:"updated successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export {
  changeAvailability,
  doctorList,
  loginDoctor,
  doctorAppointments,
  completeAppointment,cancelAppointment,doctorDashboard,doctorProfile,updateDoctorProfile
};
