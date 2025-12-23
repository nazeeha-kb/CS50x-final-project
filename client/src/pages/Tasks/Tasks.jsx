import React from "react";
import TaskItem from "./TaskItem";

const Tasks = () => {
  return (
    <div className="lg:w-[40vw] md:w-[60vw] w-full mx-12 lg:mt-10 lg:mb-12 my-14">
      <h1 className="font-semibold text-[clamp(1.8rem,1.233rem+3.02vw,3rem)] lg:pb-10 pb-14 text-center underline underline-offset-8 decoration-gray-500 ">
        Your Tasks
      </h1>

      <div className="flex flex-col gap-10">
        <TaskItem priority={"First"} taskName={"clean room"} status="done" />
        <TaskItem priority={"Second"} taskName={"clean room"} status="active" />
        <TaskItem
          priority={"Third"}
          taskName={"clean room"}
          status="disabled"
        />
      </div>
    </div>
  );
};

export default Tasks;
