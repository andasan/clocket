import { useContext } from "react";
import { TasksContext } from "../../contexts/TasksContext";
import { UserContext } from "../../contexts/UserContext";
import { formatTime } from "../../utils/formatTime";
import { harperSaveTaskTime } from "../../utils/harperdb/saveTaskTime";
import Button from "../Button";
import type { TimerProps, TimerBtnProps } from "../../types";

export const Timer: React.FC<TimerProps> = ({
  seconds,
  setSeconds,
  isTimerOn,
  startTimer,
  pauseTimer,
  setErrorMessage,
  selectedTaskId,
  selectedTaskName,
  setRecentTaskTimes
}) => {
  const { tasks, getAndSetTasks } = useContext(TasksContext);
  const { username } = useContext(UserContext);

  const { formattedHours, formattedMins, formattedSecs } = formatTime(seconds);

  const styleformattedSecs = {
    "--value": formattedSecs
  } as React.CSSProperties;
  const styleformattedMins = {
    "--value": formattedMins
  } as React.CSSProperties;
  const styleformattedHours = {
    "--value": formattedHours
  } as React.CSSProperties;

  const handleStartTimer = () => {
    setErrorMessage("");
    if (selectedTaskId == "") {
      setErrorMessage("Please select a task");
    } else {
      startTimer();
    }
  };

  const handleLogTime = async () => {
    pauseTimer();
    const prevTaskSeconds = getTaskTimeFromId(selectedTaskId);
    const newTaskSeconds = prevTaskSeconds + seconds;
    const { response, result } = await harperSaveTaskTime(
      selectedTaskId,
      newTaskSeconds
    );
    if (response.status === 200) {
      getAndSetTasks(username);
      setSeconds(0);
      setRecentTaskTimes((prev) => [
        { name: selectedTaskName, seconds: seconds },
        ...prev
      ]);
    } else setErrorMessage("Whoops, something went wrong :(");
    console.log({ response, result });
  };

  const getTaskTimeFromId = (id: string) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return 0;
    return task.time_in_seconds;
  };

  const handleResetTimer = () => {
    pauseTimer();
    setSeconds(0);
  };

  return (
    <div>
      {/* {formattedHours} : {formattedMins} : {formattedSecs} */}
      <div className="mt-8 p-14 grid grid-flow-col gap-5 text-center auto-cols-max">
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={styleformattedHours}></span>
          </span>
          hours
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={styleformattedMins}></span>
          </span>
          min
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={styleformattedSecs}></span>
          </span>
          sec
        </div>
      </div>
      <div className="flex justify-center mt-10">
        {/* Pause and start the timer buttons */}
        {isTimerOn ? (
          <>
            <Button color="warning" handleClick={pauseTimer}>
              Pause
            </Button>
          </>
        ) : (
          <Button color="success" handleClick={handleStartTimer}>
            Start
          </Button>
        )}

        {/* Button to update the time in the db for the chosen task */}
        {(seconds > 0 || isTimerOn) && (
          <Button
            color="danger"
            handleClick={handleLogTime}
            extraClasses="ml-4"
          >
            Log time
          </Button>
        )}
      </div>

      {/* Stop timer and reset to 0 secs */}
      {(seconds > 0 || isTimerOn) && (
        <button
          onClick={handleResetTimer}
          className="underline underline-offset-2 mt-8 cursor-pointer text-gray-500 mx-auto block"
        >
          Reset
        </button>
      )}
    </div>
  );
};

export const TimerBtn: React.FC<TimerBtnProps> = ({
  handleClick,
  text,
  extraClasses
}) => {
  return (
    <button
      className={`${
        text === "Start" ? "bg-blue-500" : "bg-red-500"
      } rounded px-4 py-2 text-white mt-8 ${extraClasses}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};
