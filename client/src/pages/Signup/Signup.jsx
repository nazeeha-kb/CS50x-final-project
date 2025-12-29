import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";

const Register = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    username: "",
    password: "",
    confirmation: "",
  });

  const handleSubmit = async (event) => {
    // stops normal submission
    event.preventDefault();
    try {
      const res = api.post("/signup", data);
      console.log("form submitted", res?.data);
      if (res.data.success) navigate("/dashboard")
    } catch (err) {
      console.error(err?.response?.data);
    }
  };

  return (
    <div className="my-16">
      <form
        onSubmit={handleSubmit}
        className="w-[clamp(16rem,9.667rem+33.78vw,30rem)] bg-teal-green lg:px-12 px-7 lg:py-14 py-16 rounded-md flex flex-col justify-center items-center md:gap-12 gap-10"
      >
        <div className="flex flex-col w-full md:gap-8 gap-6">
          <input
            type="text"
            placeholder="username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            name="username"
            required
            className="bg-gray-50 rounded-md px-4 lg:py-4 py-3 placeholder:text-xl"
          />
          <input
            type="text"
            name="password"
            required
            placeholder="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="bg-gray-50 rounded-md px-4 lg:py-4 py-3 placeholder:text-xl"
          />
          <input
            type="text"
            name="confirmation"
            required
            placeholder="confirm password"
            value={data.confirmation}
            onChange={(e) => setData({ ...data, confirmation: e.target.value })}
            className="bg-gray-50 rounded-md px-4 lg:py-4 py-3 placeholder:text-xl"
          />
        </div>
        <button
          type="submit"
          className="bg-dark-green hover:bg-green-900 cursor-pointer rounded-md lg:px-8 px-6 md:py-4 py-2.5 text-white text-xl"
        >
          Sign Up
        </button>
      </form>
      <p className="flex justify-center gap-2 pt-4.5">
        <span className="text-gray-600">Already have an account?</span>
        <Link to="/login" className="text-blue-700 cursor-pointer">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default Register;
