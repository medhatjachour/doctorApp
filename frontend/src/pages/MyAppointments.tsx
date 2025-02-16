import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import axios from "axios";
import { toast } from "react-toastify";
import { AppointmentInterface } from "../types/doctorsTypes";

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.STRIPE_PUBLISH_KEY); // Replace with your Stripe publishable key

function formatDate(dateStr: string): string {
  const [day, month, year] = dateStr.split("-").map(Number);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formattedDate = `${day} ${months[month - 1]}, ${year}`;
  return formattedDate;
}
const MyAppointments = () => {
  const context = useContext(AppContext);
  const { backendUrl, token, getDoctorsData } = context || {};

  const [appointments, setAppointments] = useState<AppointmentInterface[]>([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>('');
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "api/user/appointments", {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const cancelAppointment = async (appointmentId: string) => {
    try {
      const { data } = await axios.post(
        backendUrl + "api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        getUserAppointments();
        if (getDoctorsData) {
          getDoctorsData();
        }
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };


  const payAppointment = async (appointmentId: string) => {
    try {
      const { data } = await axios.post(
        backendUrl + "api/user/pay-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        console.log(data.paymentIntent);
        
        setShowPaymentForm(true);
        setClientSecret(data.paymentIntent.clientSecret);
        getUserAppointments();
        if (getDoctorsData) {
          getDoctorsData();
        }
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  


  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);
  return (
    <div>
      <p className="pb-3 mt-12 font-medium">My appointments</p>
      <div>
        {appointments.slice(0, 5).map((appointment, index) => (
          <div
            className="w-full grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={appointment.docData.image}
                alt="appointment"
              />
            </div>

            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {appointment.docData.name}
              </p>
              <p>{appointment.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address</p>
              <p className="text-xs">{appointment.docData.address.line1}</p>
              <p className="text-xs">{appointment.docData.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>{" "}
                {appointment?.slotDate ? formatDate(appointment?.slotDate) : ""}{" "}
                | {appointment.slotTime}
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              {!appointment.cancelled && (
                <button onClick={()=>payAppointment(appointment._id)} className="text-sm text-stone-500 sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300">
                  Pay Online{" "}
                </button>
              )}

              {appointment.cancelled ? (
                <p className="text-sm  text-center sm:min-w-48 py-2  border  rounded-sm border-red-600 text-red-600  transition-all duration-300">
                  Appointment cancelled
                </p>
              ) : (
                <button
                  onClick={() => cancelAppointment(appointment?._id)}
                  className="text-sm text-stone-500 sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel Appointment
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
        {showPaymentForm && clientSecret && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg">
                  <button
                    className="absolute top-2 right-2 text-gray-600"
                    onClick={() => setShowPaymentForm(false)}
                  >
                    X
                  </button>
                  <Elements stripe={stripePromise}>
                    <CheckoutForm clientSecret={clientSecret} />
                  </Elements>
                </div>
              </div>
            )}
    </div>
  );
};

export default MyAppointments;
