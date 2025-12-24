import { useState, useEffect, useRef } from "react";

const RangeSlider = ({ min, max, value, step, onChange }) => {
  // compute percentage for styling
  const percentage = Math.round(((value - min) / (max - min)) * 100);

  return (
    <div className="w-full flex flex-col justify-center">
      <input
        // running the function when we use slider
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider"
        name=""
        id=""
        value={value}
        type="range"
        min={min}
        max={max}
        // ref={sliderRef}
        step={step}
        style={{ "--slider-value": `${percentage}%` }}
      />
    </div>
  );
};

export default RangeSlider;
