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

      <div className="hero h-full my-auto">
        {/* {!username && (
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
        )} */}

  <div className="hero-content flex-col lg:flex-row">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium dolor aliquam architecto pariatur odit numquam adipisci suscipit eos corporis voluptatibus ea temporibus libero officiis dolorem neque, quidem quisquam soluta ut?
      </p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" placeholder="email" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="text" placeholder="password" className="input input-bordered" />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </div>
    </div>
  </div>
      </div>
    </>
  );
};

export default Home;
