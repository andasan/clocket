import React from 'react'

export interface LogOfRecentTaskTimesProps {
  recentTaskTimes: RecentTaskTimeProps[];
}

export interface RecentTaskTimeProps {
  name: string;
  seconds: number;
}

export interface TimerProps {
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  isTimerOn: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  selectedTaskId: string;
  selectedTaskName: string;
  setRecentTaskTimes: React.Dispatch<
    React.SetStateAction<RecentTaskTimeProps[]>
  >;
}


export interface TimerBtnProps {
  handleClick: () => void
  text: string
  extraClasses?: string
}

export interface TasksContextProps {
  tasks: TaskProps[]
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>
  getAndSetTasks: (username: string) => Promise<void>
}

export interface TaskProps {
  __createdtime__: number;
  __updatedtime__: number;
  username: string;
  time_in_seconds: number;
  id: string;
  task_name: string;
}

export interface TaskBarProps {
  selectedTaskId: string;
  setSelectedTaskId: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTaskName: React.Dispatch<React.SetStateAction<string>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  pauseTimer: () => void;
}

export interface InputProps {
  inputType: "text" | "email" | "password";
  inputName: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export interface LabelAndInputProps extends InputProps {
  label: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  color: "primary" | "success" | "secondary" | "warning" | "danger";
  handleClick?: () => void;
  type?: "button" | "submit";
  extraClasses?: string;
}

export interface AlertProps {
  children: React.ReactNode;
  type: "success" | "warning" | "danger";
  key?: number;
  extraClasses?: string;
}

export interface PageHeadingProps {
  extraClasses: string
}

export interface NavLinkProps {
  href: string;
  children: string;
}

export interface LinkProps {
  href: string
  children: React.ReactNode
}
