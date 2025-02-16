import React, { useEffect, useState } from "react";
import taskServices from "../../../services/taskServices";

const TaskSection = () => {
  //   const tasks = [
  //     { id: 1, title: "Reels on Intent - for Digital Marketing", date: "10-2022" },
  //     { id: 2, title: "Google Ads - Yanni Immigration - Website Traffic", date: "10-2022" },
  //     { id: 3, title: "Reels on Retail Business Marketing - Store Traffic", date: "10-2022" },
  //   ];
  const [tasks, setTasks] = useState([]);

  // const fetchTasks = async () => {
  //   try {
  //     const data = await taskServices.getMyTasks();
  //     if (Array.isArray(data.tasks)) {
  //       setTasks(data.tasks);
  //     } else {
  //       console.warn("⚠ Invalid Response:", data);
  //     }
  //   } catch (error) {
  //     console.error("❌ Error fetching tasks:", error);
  //   }
  // };

  useEffect(() => {
    // fetchTasks();
  }, []);

  return (
    <div className=" w-[400px] h-[350px] overflow-y-auto p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li
            key={task._id || task._id}
            className="p-2 bg-gray-100 rounded mb-2"
          >
            <span className="text-xl">{task.title}</span>-<span className="text-gray-600">{new Date(task.dueDate).toLocaleDateString()}</span>
            <br />
            <span className="text-gray-600">{task.description}</span> <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskSection;
