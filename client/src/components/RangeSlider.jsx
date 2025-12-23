import { useState, useEffect, useRef } from "react";

const RangeSlider = ({ min, max, value, step }) => {
  const [sliderRange, setSliderRange] = useState(value);
  const [inputValue, setInputValue] = useState(value);
  const sliderRef = useRef(null);

  //   function that handles controllign of range slider.
  function handleSliderInput() {
    // vars to count percentage

    // Get the range between min and max
    const range = max - min;
    // Get distance between curr value and min value
    const currValue = sliderRef.current.value;
    const distance = currValue - min;

    // Turn into percentage
    const percentage = Math.round((distance / range) * 100);
    // set slider range to
    setSliderRange(percentage);
    // set this as slider value
    setInputValue(currValue);
  }

  // Run funciton when slider reference is set
  useEffect(() => {
    handleSliderInput();
  }, [sliderRef]);

  return (
    <div className="w-full flex flex-col justify-center">
      <input
        // running the function when we use slider
        onInput={handleSliderInput}
        className="slider"
        name=""
        id=""
        value={inputValue}
        type="range"
        min={min}
        max={max}
        ref={sliderRef}
        step={step}
        style={{ "--slider-value": `${sliderRange}%` }}
      />
    </div>
  );
};

export default RangeSlider;
