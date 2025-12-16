import React from "react";

const Features = () => {
  return (
    <section className="w-screen px-6 pb-30 pt-20 flex flex-col justify-center items-center">
      <h2 className="font-semibold text-4xl pb-16 text-center">3 Steps to Clarity</h2>
      <ol className="flex flex-col lg:w-[60%] md:w-[68%] lg:gap-12 gap-10">
        <li className="feature">
          <span className="bg-green-400">1</span>
          <p>Add top 3 tasks, select urgency, energy and time on bar</p>
        </li>
        <li className="feature">
          <span className="bg-green-600 text-white">2</span>
          <p>
            The taks will be sorted accroding to the input you gave, choices are
            made
          </p>
        </li>
        <li className="feature">
          <span className="bg-green-400">3</span>
          <p>Complete your tasks in order</p>
        </li>
      </ol>
    </section>
  );
};

export default Features;
