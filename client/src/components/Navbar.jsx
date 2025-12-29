import { use, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const logOut = () => {
    console.log("logging out");
    api
      .post("/logout")
      .then((res) => {
        if (res.data.success) {
          setUser(null);
          navigate("/");
        }
      })
      .catch((err) => console.error(err.response?.data));
  };

  return (
    <nav className="py-[0.2rem] px-[clamp(0.5rem,5vw,2rem)] border-b-[0.5px] border-gray-300 flex justify-between bg-green-50 items-center">
      <Link to="/" className="cursor-pointer">
        <img src={logo} alt="app logo" className="w-21 h-21" />
      </Link>
      {user ? (
        <div
          onClick={logOut}
          className="h-fit w-fit outline-1 px-5 py-3 mr-2 rounded-xl text-white flex gap-2 items-center bg-slate-green cursor-pointer font-semibold hover:bg-green-950"
        >
          <span>Log Out</span>
          <FiLogOut className="text-xl" strokeWidth={2.5} />
        </div>
      ) : (
        <div className="flex">
          <Link
            to="/login"
            className="h-fit w-fit outline-1 px-5 py-3 mr-2 rounded-xl border-[0.4px] border-gray-100 flex gap-2 items-center cursor-pointer font-semibold hover:bg-green-100"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="h-fit w-fit outline-1 px-5 py-3 mr-2 rounded-xl text-white flex gap-2 items-center bg-slate-green cursor-pointer font-semibold hover:bg-green-950"
          >
            <span>Sign Up</span>{" "}
            <FiLogIn className="text-xl" strokeWidth={2.5} />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
