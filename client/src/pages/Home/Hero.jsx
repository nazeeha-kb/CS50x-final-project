import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="min-h-[50vh] w-screen bg-green-50 flex flex-col justify-center items-center text-center px-4 lg:py-16 py-20">
      <div className="lg:w-[55%] sm:w-[70%] w-full flex flex-col lg:gap-4 gap-8">
        <h1 className="text-[clamp(2rem,1.7rem+2.55vw,4rem)] font-semibold">
          Make Your Decision with MindMint
        </h1>
        <p className="text-[clamp(1.3rem,0.8rem+1.45vw,1.6rem)] text-gray-700">
          Decision helper that strategically prioritizes your tasks when you’re overwhelmed.
        </p>
        <Link
          to="/dashboard"
          className="btn text-[1.2rem] sm:px-10 px-8 mt-8 py-4 bg-green-800 text-white hover:bg-green-700"
        >
          Make Decision
        </Link>
      </div>
    </div>
  );
};

export default Hero;
