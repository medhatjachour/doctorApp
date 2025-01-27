import { useParams } from "react-router-dom"
import { AppContext } from "../context/appContext";
import { useContext, useEffect, useState } from "react";
import CardDoctor from "../components/CardDoctor";
import { DoctorInterface } from "../types/doctorsTypes";

const Doctors = () => {
  const {specialty} = useParams()
  const {doctors} = useContext(AppContext) || {doctors: []}
  const [filterDoc, setFilterDoc] = useState<DoctorInterface[]>([]);

  const applyFilter= () =>{
    if(specialty){
      setFilterDoc(doctors.filter((doctor) => doctor.speciality === specialty))
    }else{
      setFilterDoc(doctors)
    }
  }
  useEffect(() => {
    applyFilter()
  }, [doctors,specialty]);
  return (
    <div>  
      <p className="text-gray-600">Browse through the doctors specialist. </p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <div>
          <p>General physician</p>
          <p>Gynecologist</p>
          <p>Dermatologist</p>
          <p>Pediatricians</p>
          <p>Neurologist</p>
          <p>Gastroenterologist</p>
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y- ">
          {filterDoc.map((doctor, index) => (
           
           <CardDoctor key={index} {...doctor} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors