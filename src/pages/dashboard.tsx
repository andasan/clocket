import { useState, useContext } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import { UserContext } from "../contexts/UserContext";
import type { RecentTaskTimeProps } from "../types";
import useTimer from "../hooks/useTimer";
import LogOfRecentTaskTimes from "../components/home-page/LogOfRecentTaskTimes";
import Taskbar from "../components/home-page/Taskbar";
import { Timer } from "../components/home-page/Timer";
import Alert from "../components/Alert";
import Link from "../components/Link";

const Home: NextPage = () => {
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [selectedTaskName, setSelectedTaskName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [recentTaskTimes, setRecentTaskTimes] = useState<RecentTaskTimeProps[]>(
    []
  );

  const { isTimerOn, seconds, setSeconds, startTimer, pauseTimer } = useTimer();

  const { username } = useContext(UserContext);

  return (
    <>
      <Head>
        <title>Welcome to Clocket</title>
      </Head>

      <div className="flex flex-col items-center justify-center pt-4 grow">
        {!username && (
          <Alert type="warning" extraClasses="mb-12">
            Please <Link href="/login">log in</Link> or{" "}
            <Link href="/signup">create an account</Link> to use Clocket
          </Alert>
        )}

        <Taskbar
          selectedTaskId={selectedTaskId}
          setSelectedTaskId={setSelectedTaskId}
          setSelectedTaskName={setSelectedTaskName}
          setErrorMessage={setErrorMessage}
          setSeconds={setSeconds}
          pauseTimer={pauseTimer}
        />
        <Timer
          seconds={seconds}
          setSeconds={setSeconds}
          setRecentTaskTimes={setRecentTaskTimes}
          selectedTaskName={selectedTaskName}
          isTimerOn={isTimerOn}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
          setErrorMessage={setErrorMessage}
          selectedTaskId={selectedTaskId}
        />

        {recentTaskTimes.length > 0 && (
          <LogOfRecentTaskTimes recentTaskTimes={recentTaskTimes} />
        )}

        {errorMessage && (
          <div className="text-red-500 mt-4">{errorMessage}</div>
        )}
        
      </div>
    </>
  );
};

export default Home;
