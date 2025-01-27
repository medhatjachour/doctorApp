import  { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/appContext';
import CardDoctor from './CardDoctor';

const TopDoctors = () => {
    const [doctorsNum, setDoctorsNum] = useState(10);
    const navigate= useNavigate()
    const { doctors } = useContext(AppContext) || { doctors: [] };
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
        <p className='sm:w-1/3 text-clip text-sm'>Simply browse through our extensive list of trusted doctors.</p>
        <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {doctors.slice(0, doctorsNum).map((doctor, index) => (
                // <button onClick={()=>navigate(`/appointment/${doctor._id}`)} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-11px] transition-all duration-500'>
                //     <img className='bg-blue-50' src={doctor.image} alt={doctor.name} />
                //     <div className='p-4'>
                //         <div className='flex items-center gap-2 text-sm text-center text-green-500'><p className='w-2 h-2 bg-green-500 rounded-full'></p> <p>available</p></div>
            
                //     <p className='text-gray-900 text-lg font-medium' >{doctor.name}</p>
                //     <p className='text-gray-600 text-sm'>{doctor.speciality}</p>
                // </div>        </button>
                <CardDoctor key={index} {...doctor} />
            ))}
        </div>
        <div>
            {doctorsNum<=doctors.length?
            <button onClick={()=>{setDoctorsNum(doctorsNum + 10)}} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full'>more</button>
            :
            <button onClick={()=>{navigate('/doctors');scrollTo(0,0)}} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full'>See Doctors Page</button>
        }
        </div>
    </div>
  )
}

export default TopDoctors