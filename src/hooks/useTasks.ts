import { useState, useCallback, useEffect } from "react"
import type { TaskProps } from "../types"
import { harperGetTasks } from "../utils/harperdb/getTasks"

export const useTasks = (username: string) => {
  const [tasks, setTasks] = useState<TaskProps[]>([])

  // Get tasks from db then set task state
  const getAndSetTasks = useCallback(
    async (username: string) => {
      try {
        const tasks: TaskProps[] = await harperGetTasks(username)
        setTasks(tasks)
      } catch (err) {
        console.log(err)
      }
    },
    [setTasks]
  )

  useEffect(() => {
    if (!username || tasks.length > 0) return
    getAndSetTasks(username)
  }, [username, tasks.length, getAndSetTasks])

  return { tasks, setTasks, getAndSetTasks }
}