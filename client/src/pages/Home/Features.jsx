import React from "react";

const Features = () => {
  return (
    <section className="w-screen px-6 pb-30 lg:pt-10 pt-14 flex flex-col justify-center items-center">
      <h2 className="font-semibold text-[clamp(1.8rem,1.233rem+3.02vw,3rem)] pb-18 text-center text-green-900 underline underline-offset-4 decoration-green-300 ">
        3 Steps to Clarity
      </h2>
      <ol className="flex flex-col lg:w-[60%] md:w-[68%] lg:gap-12 gap-10">
        <li className="feature">
          <span className="bg-green-400">1</span>
          <div>
            <h3 className="font-bold">Capture Everything</h3>
            <p>
              Add all your tasks and set their urgency, required energy, and time.
            </p>
          </div>
        </li>
        <li className="feature">
          <span className="bg-green-600 text-white">2</span>
          <div>
            <h3 className="font-bold">Smart Prioritization</h3>
          <p>
            The app analyzes your inputs and selects your top 3 tasks.
          </p>
          </div>
        </li>
        <li className="feature">
          <span className="bg-green-400">3</span>
          <div>
          <h3 className="font-bold">Get It Done</h3>
          <p>Complete your top 3 tasks, one at a time.</p>
          </div>
        </li>
      </ol>
    </section>
  );
};

export default Features;
