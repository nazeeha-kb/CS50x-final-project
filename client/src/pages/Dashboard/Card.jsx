import React from "react";
import RangeSlider from "../../components/RangeSlider";
import { PiWarningCircle } from "react-icons/pi";
import { SlEnergy } from "react-icons/sl";
import { GoClock } from "react-icons/go";
import ToolTipIcon from "../../components/ToolTipIcon";

const Card = () => {
  return (
    <div className="outline-1 lg:px-10 px-8 py-10 bg-teal-green flex flex-col items-center justify-center w-[clamp(18rem,16.909rem+5.45vw,21rem)] rounded-lg shadow-lg">
      <form
        action=""
        className="flex flex-col items-center justify-center w-full gap-9"
      >
        {/* Add Task field */}
        <input
          type="text"
          name="task"
          id=""
          placeholder="Your Task Here"
          className="bg-gray-50 rounded-lg p-5 placeholder:text-[1.1rem] w-full placeholder:lg:text-xl border-[0.6px] border-gray-400 focus:outline-none lg:text-xl"
          autoFocus
        />
        {/* Sliders */}
        <div className="flex flex-col gap-3 w-full">
          {/* Urgency slider */}
          <div className="slider-container">
            <ToolTipIcon Icon={PiWarningCircle} TooltipText="urgency" size={28} />
            <RangeSlider min={10} max={100} value={0} step={1} />
          </div>

          {/* Energy Slider */}
          <div className="slider-container">
            <ToolTipIcon Icon={SlEnergy} TooltipText="Energy" size={28} />
            <RangeSlider min={10} max={100} value={0} step={1} />
          </div>

          {/* Time slider */}
          <div className="slider-container">
            <ToolTipIcon Icon={GoClock} TooltipText="Time" size={28} />
            <RangeSlider min={10} max={100} value={0} step={1} />
          </div>
        </div>

        {/* Add task button */}
        <button
          type="submit"
          className="bg-slate-green hover:bg-slate-green-800 cursor-pointer rounded-full lg:px-10 px-10 py-3.5 lg:text-xl text-white"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default Card;
