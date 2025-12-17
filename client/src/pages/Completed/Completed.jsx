import React from "react";
import { Link } from "react-router-dom";
import Lottie from "../../components/Lottie";

const Completed = () => {
  return (
    <div className="w-[clamp(18rem,12.333rem+30.22vw,36rem)] flex flex-col items-center justify-center gap-6 text-center lg:px-6 lg:py-10 p-10 rounded-md bg-green-100 border-[0.8px] border-gray-300">
      <div className="flex flex-col lg:gap-3 gap-4">
        <h1 className="text-[clamp(2rem,0.867rem+2.84vw,2.8rem)] font-semibold">
          Congragulations!
        </h1>
        <p className="lg:text-2xl md:text-xl text-[1.15rem]">
          You have successfully completed your tasks.
        </p>
      </div>
      <div>
        <Lottie className="md:h-30 h-25 md:w-30 w-25" />
      </div>
      <Link
        to="/dashboard"
        className="btn sm:px-10 px-8 py-4 mt-4 bg-green-800 text-white hover:bg-green-700 md:text-[1.05rem] text-[1rem]"
      >
        New Session
      </Link>
    </div>
  );
};

export default Completed;
