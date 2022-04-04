import type { AppProps } from "next/app";

import "../styles/globals.css";

import Layout from "../components/layout/Layout";
import { UserContext } from "../contexts/UserContext";
import { TasksContext } from "../contexts/TasksContext";
import { useUser } from "../hooks/useUser";
import { useTasks } from "../hooks/useTasks";

function MyApp({ Component, pageProps }: AppProps) {
  const { username, setUsername } = useUser();
  const { tasks, setTasks, getAndSetTasks } = useTasks(username);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      <TasksContext.Provider value={{ tasks, setTasks, getAndSetTasks }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TasksContext.Provider>
    </UserContext.Provider>
  );
}

export default MyApp;
