import { useState, useContext } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import { UserContext } from "../contexts/UserContext";
import { TasksContext } from "../contexts/TasksContext";
import Header from "../components/PageHeading";
import Link from "../components/Link";
import Alert from "../components/Alert";
import {
  displayTimeString,
  timestampToDayMonthYear
} from "../utils/formatTime";
import { harperDeleteTask } from "../utils/harperdb/deleteTask";

const Stats: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const { username } = useContext(UserContext);
  const { tasks, getAndSetTasks } = useContext(TasksContext);

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
    <div className="container mx-auto">
      <Head>
        <title>Your Clocket Stats</title>
      </Head>

      {!username && (
        <Alert type="warning" extraClasses="mb-12">
          Please <Link href="/login">log in</Link> or{" "}
          <Link href="/signup">create an account</Link> to use Super
          Productivity Timer
        </Alert>
      )}

      <Header extraClasses="mb-6 mx-auto text-center mt-8">
        <h1>Stats</h1>
      </Header>

      {errorMessage && (
        <p className="text-center text-red-500 mb-8">{errorMessage}</p>
      )}

      <div className="overflow-x-auto ">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Task</th>
              <th>Total Time</th>
              <th>Last Updated</th>
              <th>Start Date</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 &&
              tasks.map((task) => (
                <tr key={task.id}>
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

const TH: React.FC<{ children: string }> = ({ children }) => {
  const classes = "border border-slate-300 rounded-top p-4";
  return <th className={classes}>{children}</th>;
};

interface TDProps {
  children: React.ReactNode;
}
const TD = ({ children }: TDProps) => {
  const classes = "border border-slate-300 p-4";
  return <td className={classes}>{children}</td>;
};

export default Stats;
