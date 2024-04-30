import { createSelector } from "@reduxjs/toolkit";
import { currentTaskSlice } from "../slicies/current-task";
import { tasksSlice } from "../slicies/tasks-slice";
import { RootState } from "../store";
import { fakeTask } from "./task-actions-selector";

export const currentTask = createSelector(
  currentTaskSlice.selectSlice,
  (state: RootState) => {
    const currentTask = currentTaskSlice.selectSlice(state);
    if (currentTask.taskId !== undefined) {
      return tasksSlice.selectors.getTask(state, currentTask.taskId);
    } else {
      return fakeTask;
    }
  },
  (currentTask, task) => {
    return {
      ...currentTask,
      ...task,
    };
  }
);
