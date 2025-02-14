import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAToken, backendUrl } = useContext(AdminContext)|| {
    backendUrl: "$VITE_BACKEND_URL='http://localhost:4000/'",
  };;

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      if (state === "Admin" && setAToken) {
        const {data} = await axios.post(backendUrl + "api/admin/login", {
          email,
          password,
        })
        if (data.success) {
            localStorage.setItem('aToken',data.token)
            toast.success(data.message)
            setAToken(data.token);
        }else{
            toast.error(data.message )
        }
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

  return (
    <form onSubmit={handleSubmit} className="min-h-[80vh] flex items-center w-full">
      <div className="flex flex-col gap-3 rounded-xl m-auto items-start p-8 min-w-[350px] sm:min-w-96 text-[#5e5e5e] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            name="email"
            required
            onChange={(e) => {
              setEmail((e.target as HTMLInputElement).value);
            }}
            value={email}
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
            name="password"
            onChange={(e) => {
              setPassword((e.target as HTMLInputElement).value);
            }}
            value={password}
          />
        </div>
        <button className="bg-primary text-white w-full rounded-md py-2 text-base cursor-pointer">
          Login
        </button>

        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <button
              className="text-primary underline cursor-pointer"
              onClick={() => {
                setState("Doctor");
              }}
            >
              Click here
            </button>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <button
              className="text-primary underline cursor-pointer"
              onClick={() => {
                setState("Admin");
              }}
            >
              {" "}
              Click here
            </button>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
