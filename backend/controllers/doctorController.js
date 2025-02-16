import doctorModel from "../models/doctorModel.js";

const changeAvailability = async (req, res) => {
  try {
    const { docId} = req.body;
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
    const doctors = await doctorModel.find({}).select(['-password,-email'])
  
    return res.json({ success: true, doctors });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


export { changeAvailability,doctorList };
