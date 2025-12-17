import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div>
      <form className="w-[clamp(16rem,9.667rem+33.78vw,30rem)] bg-teal-green lg:px-12 px-7 lg:py-14 py-16 rounded-md flex flex-col justify-center items-center md:gap-12 gap-10">
        <div className="flex flex-col w-full md:gap-8 gap-6">
          <input
            type="text"
            placeholder="username"
            className="bg-gray-50 rounded-md px-4 lg:py-4 py-3 placeholder:text-xl"
          />
          <input
            type="text"
            placeholder="password"
            className="bg-gray-50 rounded-md px-4 lg:py-4 py-3 placeholder:text-xl"
          />
          <input
            type="text"
            placeholder="confirm password"
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
