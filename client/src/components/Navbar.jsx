import React from "react";
import logo from "../assets/logo.png";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="py-[0.2rem] px-[clamp(0.5rem,5vw,2rem)] border-b-[0.5px] border-gray-300 flex justify-between bg-green-50 items-center">
      <Link to="/" className="cursor-pointer">
        <img src={logo} alt="app logo" className="w-21 h-21" />
      </Link>
      <Link to="/login" className="h-fit w-fit outline-1 px-5 py-3 mr-2 rounded-xl bg-slate-green text-white flex gap-2 items-center cursor-pointer font-semibold hover:bg-green-950">
        <span>Log In</span>{" "}
          <FiLogIn className="text-xl" strokeWidth={2.5} />
      </Link>
    </nav>
  );
};

export default Navbar;
