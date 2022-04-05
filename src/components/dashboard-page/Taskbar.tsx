import { useState, useContext } from "react";

import { harperAddNewTask } from "../../utils/harperdb/addNewTask";
import { UserContext } from "../../contexts/UserContext";
import { TasksContext } from "../../contexts/TasksContext";
import { TaskBarProps } from "../../types";

import Button from "../Button";

const TaskBar = ({
  selectedTaskId,
  setSelectedTaskId,
  setSelectedTaskName,
  setErrorMessage,
  setSeconds,
  pauseTimer
}: TaskBarProps) => {
  const { username } = useContext(UserContext);
  const [isUserAddingNewTask, setIsUserAddingNewTask] = useState(false);
  const [taskInputValue, setTaskInputValue] = useState("");
  const { tasks, getAndSetTasks } = useContext(TasksContext);

  const handleChangeTaskInput = (e: { target: HTMLInputElement }) => {
    setTaskInputValue(e.target.value);
  };

  const handleSelectTask = (e: { target: HTMLSelectElement }) => {
    setErrorMessage("");
    setSelectedTaskId(e.target.value);
    setSeconds(0);
    pauseTimer();
  };

  const handleClickAddNewTask = () => {
    if (taskInputValue.trim() === "") {
      setErrorMessage("Type a task!");
      return;
    }
    addNewTask();
    resetAddingNewTask();
  };

  const addNewTask = async () => {
    try {
      const { response } = await harperAddNewTask(username, taskInputValue);
      if (response.status === 200) {
        // Task added to db successfully
        getAndSetTasks(username);
      } else setErrorMessage("Whoops, something went wrong");
    } catch (err) {
      console.log(err);
      setErrorMessage("Whoops, something went wrong");
    }
  };

  const resetAddingNewTask = () => {
    setTaskInputValue("");
    setIsUserAddingNewTask(false);
  };

  return (
    <div>
      {isUserAddingNewTask ? (
        <>
          <input
            type="text"
            placeholder="Enter task here..."
            value={taskInputValue}
            onChange={handleChangeTaskInput}
            className="border p-2 mr-2"
          />
          <Button color="primary" handleClick={handleClickAddNewTask}>
            Add task
          </Button>
          <Button
            color="secondary"
            handleClick={() => setIsUserAddingNewTask(false)}
            extraClasses="ml-1"
          >
            Cancel
          </Button>
        </>
      ) : (
        <>
          <select
            className="mr-4 p-2 border"
            name="task"
            id="task"
            // value={selectedTaskId}
            onChange={handleSelectTask}
          >
            {selectedTaskId === "" && (
              <option disabled selected value="" hidden>
                -- Select a task --
              </option>
            )}
            {tasks.map((task) => (
              <option
                key={task.id}
                value={task.id}
                selected={task.id === selectedTaskId}
              >
                {task.task_name}
              </option>
            ))}
          </select>
          <Button
            handleClick={() => setIsUserAddingNewTask(true)}
            color="primary"
          >
            New Task
          </Button>
        </>
      )}
    </div>
  );
};

export default TaskBar;
