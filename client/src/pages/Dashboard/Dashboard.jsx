import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center my-14">
      <div className="">
        <Card />
      </div>
      <h1 className="text-[clamp(1rem,0.8rem+3.02vw,1.3em)] my-8 font-semibold">
        X Tasks Added
      </h1>
      {/* redirects to taks page */}
      <Link
        to="/tasks"
        className="bg-green-900 text-white py-4 px-10 rounded-xl 
        text-center transition transform hover:scale-105 shadow-md font-semibold
        cursor-pointer w-[80%] lg:text-xl"
      >
        {/* <button */}
        {/* type="submit" */}
        {/* > */}
        Prioritize Tasks
        {/* </button> */}
      </Link>
    </div>
  );
};

export default Dashboard;
