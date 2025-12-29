import { useState, useEffect } from "react";
import api from "../../api";
import TaskItem from "./TaskItem";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching tasks from backend
  useEffect(() => {
    api
      .get("/prioritize")
      .then((res) => {
        setTasks(res.data);
        console.log(res.data);
      })
      .catch(() => setTasks(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!Array.isArray(tasks) || tasks.length === 0)
    return <p>No Tasks found.</p>;

  return (
    <div className="lg:w-[40vw] md:w-[60vw] w-full mx-12 lg:mt-10 lg:mb-12 my-14">
      <h1 className="font-semibold text-[clamp(1.8rem,1.233rem+3.02vw,3rem)] lg:pb-10 pb-14 text-center underline underline-offset-8 decoration-gray-500 ">
        Your Tasks
      </h1>

      <div className="flex flex-col gap-10">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            priority={task.priority}
            taskName={task.taskName}
            status="Locked"
          />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
