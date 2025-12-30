import { useState, useEffect } from "react";
import api from "../../api";
import TaskItem from "./TaskItem";
import { useNavigate } from "react-router-dom";
import { all } from "axios";

const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTasks = () => {
    api
      .get("/tasks")
      .then((res) => {
        setTasks(res.data);
        console.log(res.data);
      })
      .catch(() => setTasks(null))
      .finally(() => setLoading(false));
  };

  // Fetching tasks from backend
  useEffect(() => {
    getTasks();
  }, []);

  // reacts to click, calls updateStatus then updates UI or triggers refetch
  const handleStatus = (taskId, status) => {
    updateStatus(taskId, status);
  };

  // update status and setUpdateStatus to be true if succeeds
  const updateStatus = (taskId, status) => {
    // {status} is short for {status: status}
    api
      .put(`/status_update/${taskId}`, { status })
      .then((res) => {
        if (res.data.success) {
          console.log("successfully updated task status");
          getTasks();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // .finally(() => checkCompleted(tasks));
    // check if all tasks are completed, if yes, redirect user.
  };

  useEffect(() => {
    const checkCompleted = (tasks) => {
      // like for task in tasks from python

      if (!Array.isArray(tasks) || tasks.length === 0) {
        console.log("no tasks found");
        return; // do nothing
      }

      const allCompleted = tasks.every((task) => task.status === "done"); // check if every task's stutus is "done"

      if (allCompleted) {
        navigate("/completed");
        console.log("all completed");
      } else {
        console.log("all not completed");
      }
    };
    checkCompleted(tasks);
  }, [tasks]);

  if (!Array.isArray(tasks) || tasks.length === 0)
    return <p>No Tasks found.</p>;

  return (
    <div className="lg:w-[40vw] md:w-[60vw] w-full mx-12 lg:mt-10 lg:mb-12 my-14">
      <h1 className="font-semibold text-[clamp(1.8rem,1.233rem+3.02vw,3rem)] lg:pb-10 pb-14 text-center underline underline-offset-8 decoration-gray-500 ">
        Your Tasks
      </h1>

      <div className="flex flex-col gap-10">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onStatusChange={handleStatus} />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
