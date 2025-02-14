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

const App: React.FC = () => {
  const { aToken } = useContext(AdminContext) || {aToken:null};

  return (
    <div>
      {aToken ? (
        <div className='bg-[#f8f8f8]'>
          <Navbar/>

          {/* Add any admin dashboard or components here */}
          <div className='flex items-start'>
            <SideBar/>
            <Routes>
              <Route path='/' element={<></>} />
              <Route path='/admin-dashboard' element={<DashBoard/>} />
              <Route path='/all-appointments' element={<AllAppointments/>} />
              <Route path='/add-doctor' element={<AddDoctor/>} />
              <Route path='/doctor-list' element={<DoctorsList/>} />
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
