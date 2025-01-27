
export interface DoctorsInterface {

  doctors: {

    _id: string;

    name: string;

    image: string;

    speciality: string;

    degree: string;

    experience: string;

    about: string;

    fees: number;

    address: {

      line1: string;

      line2: string;

    };

  }[];

}



export interface DoctorInterface {


    _id: string;

    name: string;

    image: string;

    speciality: string;

    degree: string;

    experience: string;

    about: string;

    fees: number;

    address: {

      line1: string;

      line2: string;

    };



}
