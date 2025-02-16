import express from 'express';
import { bookAppointment, listAppointment,getProfile, loginUser, registerUser, updateProfile, cancelAppointment, payment } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);

userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile);
userRouter.get('/get-profile',authUser,getProfile);
userRouter.post('/book-appointment',authUser,bookAppointment);
userRouter.get('/appointments',authUser,listAppointment);
userRouter.post('/cancel-appointment',authUser,cancelAppointment);
userRouter.post('/pay-appointment',authUser,payment);
userRouter.post('/verify-appointment',authUser,verifyPayment);

export default userRouter;
