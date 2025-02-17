import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  
  const navigate= useNavigate()

  const appContext = useContext(AppContext);
  const { token, backendUrl, setToken } = appContext || {};

  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (state === "Sign Up" && setToken) {
        const { data } = await axios.post(backendUrl + "api/user/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          toast.success(data.message);
          setToken(data.token);
        }
      } else {
        const { data } = await axios.post(backendUrl + "api/user/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          toast.success(data.message);
          if (setToken) {
            setToken(data.token);
          }
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    if(token){
      navigate('/')
    }
  }, [token]);

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={submitHandler}>
      <div className="flex flex-col gap-4 m-auto items-start p-8 min-w-[350px] sm:min-w-96 border rounded-xl text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create An Account" : "Log In"}
        </p>
        <p>
          Please {state === "Sign Up" ? "Sign Up" : "Log In"} to book an
          appointment
        </p>
        {state === "Sign Up" && (
          <div className="w-full">
            <p>full name</p>
            <input
              className="border border-zinc-300 w-full p-2 mt-1"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              required
            />
          </div>
        )}
        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 w-full p-2 mt-1"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 w-full p-2 mt-1"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          {state === "Sign Up" ? "Create An Account" : "Log In"}
        </button>
        {state === "Sign Up" ? (
          <p>
            {" "}
            Already have an account?{" "}
            <button
              onClick={() => setState("Log In")}
              className="text-primary underline cursor-pointer"
            >
              {" "}
              Login here
            </button>
          </p>
        ) : (
          <p>
            {" "}
            Create new account{" "}
            <button
              onClick={() => setState("Sign Up")}
              className="text-primary underline cursor-pointer"
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
