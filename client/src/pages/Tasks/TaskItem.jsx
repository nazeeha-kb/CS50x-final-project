import { useState } from "react";
import ToolTipIcon from "../../components/ToolTipIcon";
import { CiLock } from "react-icons/ci";

const TaskItem = ({ priority, taskName, status }) => {


  const handleStatus = () => {
    console.log(status)
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {/* x priority */}
      <h2 className="font-bold">{priority} Priority</h2>
      {/* task container */}
      <div className="container border-[0.5px] border-gray-800 shadow flex gap-4 rounded-lg h-25 p-5 bg-disabled-task text-disabled-text">
        {/* marking square */}
        <div className="w-20 h-full bg-gray-50 rounded-lg border-[0.5px] border-gray-800 flex items-center justify-center" onClick={handleStatus}>
          {/* icon - depends on status */}
          <ToolTipIcon Icon={CiLock} TooltipText={"Locked"} size={36} />
        </div>
        {/* task */}
        <div className="w-full bg-gray-50 rounded-lg border-[0.5px] border-gray-800 flex items-center justify-start text p-4 md:text-xl font-semibold text-gray-800">
          {taskName}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
