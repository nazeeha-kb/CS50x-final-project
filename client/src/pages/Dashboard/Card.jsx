import { useEffect, useState } from "react";
import RangeSlider from "../../components/RangeSlider";
import { PiWarningCircle } from "react-icons/pi";
import { SlEnergy } from "react-icons/sl";
import { GoClock } from "react-icons/go";
import api from "../../api";
import ToolTipIcon from "../../components/ToolTipIcon";

const Card = ({ onTaskNumChange }) => {
  const [inputTask, setInputTask] = useState({
    id: "8",
    taskName: "",
    urgency: 10,
    time: 10,
    energy: 10,
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Creating New Task
  const handleSubmit = async (event) => {
    // doesn't reload on submission
    event.preventDefault();
    try {
      // if not initialized axios then -> axios.post("full url")

      const new_task = await api.post("/add_task", inputTask);

      // resetting form after submission
      setInputTask({
        taskName: "",
        urgency: 10,
        time: 10,
        energy: 10,
      });

      // setting error message as empty
      setErrorMessage("");

      console.log(new_task);
      console.log("Task added Successfully!");

      //Fetching tasks again - to get number of tasks
      const res = await api.get("/add_task");
      // this updates "dashboard"'s useState TaskNum
      onTaskNumChange(res?.data?.length);
    } catch (err) {
      // Validation - checking for required fields:

      // getting the specific error
      const error = err?.response?.data;
      // status code
      const status = err?.response?.status;

      // alerting the user
      if (
        status == 400 &&
        error?.field == "taskName" &&
        error?.code == "REQUIRED"
      ) {
        setErrorMessage("Please Enter Task Name");
      }
    }
  };

  return (
    <div className="outline-1 lg:px-10 px-8 py-10 bg-teal-green flex flex-col items-center justify-center w-[clamp(18rem,16.909rem+5.45vw,21rem)] rounded-lg shadow-lg">
      <form
        className={`flex flex-col items-center justify-center w-full ${
          errorMessage ? "gap-7" : "gap-8.5"
        } `}
        onSubmit={handleSubmit}
      >
        <div>
          {/* Add Task field */}
          <input
            type="text"
            value={inputTask.taskName}
            name="task"
            id=""
            placeholder="Your Task Here"
            className="bg-gray-50 rounded-lg p-5 placeholder:text-[1.1rem] w-full placeholder:lg:text-xl border-[0.6px] border-gray-400 focus:outline-none lg:text-xl"
            autoFocus
            autoComplete="off"
            required
            // required
            onChange={(e) =>
              setInputTask({ ...inputTask, taskName: e.target.value })
            }
          />
          {errorMessage && (
            <small className="text-red-600 pl-2 text-[0.9rem]">
              {errorMessage}
            </small>
          )}
        </div>
        {/* Sliders */}
        <div className="flex flex-col gap-3 w-full">
          {/* Urgency slider */}
          <div className="slider-container">
            <ToolTipIcon
              Icon={PiWarningCircle}
              TooltipText="urgency"
              size={28}
            />
            <RangeSlider
              min={10}
              max={100}
              value={inputTask.urgency}
              step={1}
              onChange={(val) =>
                setInputTask({ ...inputTask, urgency: Number(val) })
              }
            />
          </div>

          {/* Energy Slider */}
          <div className="slider-container">
            <ToolTipIcon Icon={SlEnergy} TooltipText="Energy" size={28} />
            <RangeSlider
              min={10}
              max={100}
              value={inputTask.energy}
              step={1}
              onChange={(val) =>
                setInputTask({ ...inputTask, energy: Number(val) })
              }
            />
          </div>

          {/* Time slider */}
          <div className="slider-container">
            <ToolTipIcon Icon={GoClock} TooltipText="Time" size={28} />
            <RangeSlider
              min={10}
              max={100}
              value={inputTask.time}
              step={1}
              onChange={(val) =>
                setInputTask({ ...inputTask, time: Number(val) })
              }
            />
          </div>
        </div>

        {/* Add task button */}
        <button className="bg-slate-green hover:bg-slate-green-800 cursor-pointer rounded-full lg:px-10 px-10 py-3.5 lg:text-xl text-white shadow-md hover:shadow-lg active:shadow-inner">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default Card;
