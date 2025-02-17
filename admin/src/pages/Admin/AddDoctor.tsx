import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("");
  const [fees, setFees] = useState(0);
  const [about, setAbout] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { aToken, backendUrl } = useContext(AdminContext) || {
    backendUrl: "$VITE_BACKEND_URL='http://localhost:4000/'",
  };

  const onSubmitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      if (!docImg) {
        toast.error("Image isn't selected");
      } else {
        const formData = new FormData();
        formData.append("image", docImg);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("experience", experience);
        formData.append("fees",fees.toString()); // Convert fees to string
        formData.append("about", about);
        formData.append("speciality", specialty);
        formData.append("degree", degree);
        formData.append(
          "address",
          JSON.stringify({ line1: address1, line2: address2 })
        );
        // Logging each key-value pair for debugging
        // formData.forEach((value, key) => {
        //   console.log(`${key} == ${value}`);
        // });

        const { data } = await axios.post(
          backendUrl + "api/admin/add-doctor",
          formData,
          { headers: { aToken } }
        );
        if (data.success) {
          toast.success(data.message);
          setDocImg(null)
          setName('')
          setEmail('')
          setPassword('')
          setAbout('')
          setAddress1('')
          setAddress2('')
          setSpecialty('')
          setExperience('')
          setFees(0)
          setDegree('')
        }else{
          
          toast.error(data.message);
        }
      }
    } 
    catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">AddDoctor </p>

      <div className="bg-white px-8 py-8 border border-gray-200 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 object-cover bg-gray-100 rounded-full cursor-pointer"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="upload"
            />
          </label>
          <input
            onChange={(e) => {
              if (e.target.files) {
                setDocImg(e.target.files[0]);
              }
            }}
            type="file"
            id="doc-img"
            hidden
          />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600 ">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Name</p>
              <input
                className="border rounded px-3 py-2  border-gray-200"
                type="text"
                name="name"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                className="border rounded px-3 py-2  border-gray-200"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                className="border rounded px-3 py-2  border-gray-200"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experiences</p>
              <select
                className="border rounded px-3 py-2  border-gray-200"
                name=""
                id=""
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                className="border rounded px-3 py-2  border-gray-200"
                type="number"
                placeholder="Fees"
                required
                value={fees}
                onChange={(e) => setFees(Number(e.target.value))}
              />
            </div>
          </div>
          <div className=" w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Specialty</p>

              <select
                className="border rounded px-3 py-2  border-gray-200"
                name=""
                id=""
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
                <option value="All">All</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                className="border rounded px-3 py-2  border-gray-200"
                type="text"
                placeholder="Education"
                required
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                className="border rounded px-3 py-2  border-gray-200"
                type="text"
                placeholder="address 1 "
                required
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
              <input
                className="border rounded px-3 py-2  border-gray-200"
                type="text"
                placeholder="address 2 "
                required
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            className="w-full border rounded px-3 py-2  border-gray-200"
            placeholder="Write about Doctor "
            rows={5}
            required
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-primary px-10 py-3 mt-4 text-white rounded-full cursor-pointer"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
