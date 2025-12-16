import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="min-h-[50vh] w-screen bg-green-50 flex flex-col justify-center items-center text-center px-4 py-20">
      <div className="lg:w-[55%] sm:w-[70%] w-full flex flex-col gap-8">
        <h1 className="text-[clamp(2rem,1.7rem+2.55vw,4rem)] font-semibold">
          Make Your Decision with MindMint
        </h1>
        <p className="text-[clamp(0.9rem,0.8rem+1.45vw,1.6rem)]">
          Decision Helper when overwhelemd by multiple tasks, stratgically
          protorizes your tasks
        </p>
        <div className="flex justify-center items-center sm:gap-6 gap-2">
          <Link to="/dashboard" className="btn bg-green-800 text-white hover:bg-green-700">Make Decision</Link>
          <Link className="btn border-[0.8px] border-gray-400 hover:bg-green-200">Learn More</Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
