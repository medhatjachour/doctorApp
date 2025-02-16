// doctorsTypes.ts
export interface Doctor {
  _id: string;
  name: string;
  image: string;
  speciality: string;
  degree: string;
  experience: string;
  about: string;
  fees: number;
  available:boolean;
  address: {
    line1: string;
    line2: string;
  };
}

// doctorsTypes.ts
export interface User {
  _id: string;
  name: string;
  image: string;
  email: string|undefined;
  password: string;
  gender: string;
  phone: string;
  dob: string;
  address: {
    line1: string;
    line2: string;
  };
}




export interface AppointmentInterface {
  _id:string;
  userId: string;
  docId: string;
  slotDate: string;
  slotTime: string;
  userData: User;
  docData: Doctor;
  amount: number;
  date: number;
  cancelled?: boolean;
  payment?: boolean;
  isCompleted?: boolean;

}




export interface DoctorsInterface {


    _id: string;

    name: string;

    image: string;

    speciality: string;

    degree: string;

    experience: string;

    about: string;

    fees: number;
    available:boolean;

    address: {

      line1: string;

      line2: string;

    };



}


 export interface TimeSlotInterface {
  datetime: Date;
  time: string;
}

export interface DashboardInterface {
  doctors ?:number,
  patients ?:number,
  appointments ?:number,
  latestAppointment ?:AppointmentInterface[]
}