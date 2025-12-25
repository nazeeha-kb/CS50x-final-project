import { Link } from "react-router-dom";
import Card from "./Card";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [taskNum, setTaskNum] = useState(0);
  const [canClick, setCanClick] = useState(false);

  useEffect(() => {
    if (taskNum > 0) {
      setCanClick(true);
    } else {
      setCanClick(false);
    }
  }, [taskNum]);

  return (
    <div className="flex flex-col items-center justify-center my-14">
      <div className="">
        <Card onTaskNumChange={setTaskNum} />
      </div>
      <h1 className="text-[clamp(1rem,0.8rem+3.02vw,1.3em)] my-8 font-semibold">
        {taskNum} Task(s) Added
      </h1>
      {/* redirects to taks page */}
      <Link
        to={canClick ? "/tasks" : "#"}
        onClick={(e) => !canClick && e.preventDefault()} //blocks click if not ready
        className={` text-white py-4 px-10 rounded-xl 
        text-center  font-semibold
         w-[80%] lg:text-xl ${
           canClick
             ? "bg-green-900 shadow-md cursor-pointer transition transform hover:scale-105"
             : "bg-slate-600 cursor-auto"
         }`}
      >
        Prioritize Tasks
      </Link>
    </div>
  );
};

export default Dashboard;
