import React, { useContext } from 'react';
import Login from './pages/login';
import { ToastContainer } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import 'react-toastify/dist/ReactToastify.css'; // Ensure to import the CSS for toast notifications
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import { Route, Routes } from 'react-router-dom';
import DashBoard from './pages/Admin/DashBoard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App: React.FC = () => {
  const { aToken } = useContext(AdminContext) || {aToken:null};
  const { dToken } = useContext(DoctorContext) || {dToken:null};

  return (
    <div>
      {aToken || dToken? (
        <div className='bg-[#f8f8f8]'>
          <Navbar/>

          {/* Add any admin dashboard or components here */}
          <div className='flex items-start'>
            <SideBar/>
            <Routes>
              {/* admin */}
             {aToken&&  <Route path='/' element={<DashBoard/>} />}${dToken&& <Route path='/' element={<DoctorDashboard/>} />}
              <Route path='/admin-dashboard' element={<DashBoard/>} />
              <Route path='/all-appointments' element={<AllAppointments/>} />
              <Route path='/add-doctor' element={<AddDoctor/>} />
              <Route path='/doctor-list' element={<DoctorsList/>} />
              {/* doctor */}
              <Route path='/doctor-dashboard' element={<DoctorDashboard/>} />
              <Route path='/doctor-appointments' element={<DoctorAppointment/>} />
              <Route path='/doctor-profile' element={<DoctorProfile/>} />
            </Routes>
          </div>
        </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default App;
