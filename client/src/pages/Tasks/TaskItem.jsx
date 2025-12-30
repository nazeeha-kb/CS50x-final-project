import { useState } from "react";
import ToolTipIcon from "../../components/ToolTipIcon";
import { CiLock } from "react-icons/ci";
import { CiCircleCheck } from "react-icons/ci";
import { VscError } from "react-icons/vsc";

const TaskItem = ({ task, onStatusChange }) => {
  let icon, tooltipText;

  switch (task.status) {
    case "done":
      icon = CiCircleCheck;
      tooltipText = "Completed";
      break;
    case "locked":
      icon = CiLock;
      tooltipText = "Locked";
      break;
    default:
      icon = VscError;
      tooltipText = "Unknown";
  }

  const containerClasses = `container border-[0.5px] shadow flex gap-4 rounded-lg h-25 p-5 
  ${
    task.status === "done"
      ? "bg-done-task text-disabled-text curso line-through"
      : ""
  } 
  ${task.status === "locked" ? "bg-disabled-task text-disabled-text" : ""} 
  ${task.status === "active" ? "bg-active-task" : ""}`;

  <ToolTipIcon Icon={icon} TooltipText={tooltipText} size={36} />;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* x priority */}
      <h2 className="font-bold">{task.priority} Priority</h2>
      {/* task container */}
      <div className={containerClasses}>
        {/* Update Task status */}
        <button
          onClick={() =>
            task.status == "active" ? onStatusChange(task.id, "done") : ""
          }
          className={`w-20 h-full rounded-lg border-[0.5px] border-gray-800 flex items-center justify-center ${
            task.status == "active" ? "bg-white cursor-pointer" : "bg-gray-50"
          } `}
        >
          {/* icon - depends on status */}
          {task.status == "active" ? (
            ""
          ) : (
            <ToolTipIcon Icon={icon} TooltipText={tooltipText} size={36} />
          )}
        </button>
        {/* task */}
        <div
          className={`w-full bg-gray-50 rounded-lg border-[0.5px] border-gray-800 flex items-center justify-start text p-4 md:text-xl font-semibold text-gray-800 ${
            task.status == "active" ? "bg-white" : "bg-gray-50"
          }`}
        >
          {task.taskName}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
