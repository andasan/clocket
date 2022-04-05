import { useState, useContext } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from 'next/router'

import { UserContext } from "../contexts/UserContext";
import type { RecentTaskTimeProps } from "../types";
import useTimer from "../hooks/useTimer";
import LogOfRecentTaskTimes from "../components/home-page/LogOfRecentTaskTimes";
import Taskbar from "../components/home-page/Taskbar";
import { Timer } from "../components/home-page/Timer";
import StatsTable from "../components/dashboard-page/StatsTable";

const Home: NextPage = () => {
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [selectedTaskName, setSelectedTaskName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [recentTaskTimes, setRecentTaskTimes] = useState<RecentTaskTimeProps[]>([]);
  const router = useRouter()

  const { isTimerOn, seconds, setSeconds, startTimer, pauseTimer } = useTimer();

  const { username } = useContext(UserContext);

  if(!username){
    router.push('/')
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      <Head>
        <title>Welcome to Clocket</title>
      </Head>

      {/* {!username && (
        <Alert type="warning" extraClasses="mb-12">
          Please <Link href="/login">log in</Link> or{" "}
          <Link href="/signup">create an account</Link> to use Clocket
        </Alert>
      )} */}

      <div className="col-span-3 w-full">
        <StatsTable setSelectedTaskId={setSelectedTaskId} />
      </div>

      <div className="col-span-1 flex flex-col items-center justify-center pt-4">
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
      </div>

      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
    </div>
  );
};

export default Home;
