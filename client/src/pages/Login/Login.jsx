import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await api.post("/login", data);
      console.log("form submitted", res?.data);
      if (res.data.success) {
        // setting auth state globally
        setUser(res.data);
        // redirecting user
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err.response.data || err.message);
      // Validation - checking for required fields:

      // getting the specific error
      const error = err?.response?.data;
      // status code
      const status = err?.response?.status;

      // alerting the user
      if (
        status == 400 &&
        error?.field == "username" &&
        error?.code == "REQUIRED"
      ) {
        setErrorMessage("Please Enter username");
      } else if (
        status == 400 &&
        error?.field == "password" &&
        error?.code == "REQUIRED"
      ) {
        setErrorMessage("Please Enter password");
      } else if (
        status == 400 &&
        error?.field == "INVALID_CREDENTIALS" &&
        error?.code == "INVALID"
      ) {
        setErrorMessage("Incorrect username or password");
      }
    }
  };

  return (
    <div className="my-16">
      {errorMessage && (
        <small className="text-red-600 pl-2 text-[0.9rem] my-2">
          {errorMessage}
        </small>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-[clamp(16rem,9.667rem+33.78vw,30rem)] bg-teal-green lg:px-12 px-7 lg:py-14 py-16 rounded-md flex flex-col justify-center items-center md:gap-12 gap-10"
      >
        <div className="flex flex-col w-full md:gap-8 gap-6">
          <input
            type="text"
            name="username"
            placeholder="username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            required
            className="bg-gray-50 rounded-md px-4 lg:py-4 py-3 placeholder:text-xl"
          />
          <input
            type="text"
            name="password"
            placeholder="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
            className="bg-gray-50 rounded-md px-4 lg:py-4 py-3 placeholder:text-xl"
          />
        </div>
        <button
          type="submit"
          className="bg-dark-green hover:bg-green-900 cursor-pointer rounded-md lg:px-8 px-6 md:py-4 py-2.5 text-white text-xl"
        >
          Login
        </button>
      </form>
      <p className="flex justify-center gap-2 pt-4.5">
        <span className="text-gray-600">Don't have an account yet?</span>
        <Link to="/signup" className="text-blue-700 cursor-pointer">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
3;
