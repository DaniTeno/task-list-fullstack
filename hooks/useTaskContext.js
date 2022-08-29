import { useContext } from "react";
import { isTasksUpdatedContext, setTaskContext, tasksContext } from "../context/TasksListProvider";

export const useTaskContext = () => useContext(tasksContext)
export const useSetTaskContext = () => useContext(setTaskContext)
export const useIsTasksUpdatedContext = () => useContext(isTasksUpdatedContext)