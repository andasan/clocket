import { useState, useContext } from "react";

import { UserContext } from "../../contexts/UserContext";
import { TasksContext } from "../../contexts/TasksContext";
import {
  displayTimeString,
  timestampToDayMonthYear
} from "../../utils/formatTime";
import { harperDeleteTask } from "../../utils/harperdb/deleteTask";
import { StatsTableProps } from "../../types";

const StatsTable: React.FC<StatsTableProps> = ({ setSelectedTaskId }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const { username } = useContext(UserContext);
  const { tasks, getAndSetTasks } = useContext(TasksContext);

  const handleClickRow = (taskId: string) => {
    //   console.log("clicked: ", taskId)
    setSelectedTaskId(taskId);
  };

  const handleDeleteRow = async (taskId: string) => {
    setErrorMessage("");
    const areYouSure = confirm("Are you sure you want to delete this row?");
    if (!areYouSure) return;

    try {
      // Delete task from db
      const { response } = await harperDeleteTask(taskId);
      if (response.status === 200) {
        // Get tasks from db and setTasks
        getAndSetTasks(username);
        return;
      }
    } catch (err) {
      console.log(err);
    }
    setErrorMessage("Whoops, something went wrong :(");
  };

  return (
    <div className="flex flex-col" style={{height: 'calc(100vh - 146px)'}}>
      {errorMessage && (
        <p className="text-center text-red-500 mb-8">{errorMessage}</p>
      )}
      <div className="flex-grow overflow-auto  scrollbar-hide">
        <table className="relative table w-full">
          <thead>
            <tr>
              <th className="sticky top-0">Task</th>
              <th className="sticky top-0">Total Time</th>
              <th className="sticky top-0">Last Updated</th>
              <th className="sticky top-0">Start Date</th>
              <th className="sticky top-0">Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 &&
              tasks.map((task) => (
                <tr
                  key={task.id}
                  className="hover"
                  onClick={() => handleClickRow(task.id)}
                >
                  <td>{task.task_name}</td>
                  <td>{displayTimeString(task.time_in_seconds)}</td>
                  <td>{timestampToDayMonthYear(task.__updatedtime__)}</td>
                  <td>{timestampToDayMonthYear(task.__createdtime__)}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteRow(task.id)}
                      className="bg-red-500 text-white rounded px-3 py-1"
                    >
                      x
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatsTable;
