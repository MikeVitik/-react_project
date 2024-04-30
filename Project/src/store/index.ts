import { taskEditorSlice } from "./slicies/task-editor";

import { tasksSlice } from "./slicies/tasks-slice";

import { currentTaskSlice } from "./slicies/current-task";
import { timerSlice } from "./slicies/timer-slice";

export type { CurrentTask } from "./slicies/current-task";

export const { getMode } = currentTaskSlice.selectors;

export { configureAppStore, updateTime, useAppDispatch } from "./store";

export { currentTask } from "./selectors/current-task-selector";
export { taskActions } from "./selectors/task-actions-selector";

export type { RootState } from "./store";
export const {
  decrementPomodoro,
  deleteTask,
  incrementPomodoro,
  changeTask,
  addTask,
} = tasksSlice.actions;

export { createTask } from "./actions/task-actions";
export const { selectCanDecrement, selectTotalTime } = tasksSlice.selectors;

export const { cancelTaskEdit, editTask, updateEditTaskName } =
  taskEditorSlice.actions;
export const { getTimerValue } = timerSlice.selectors;

export { generateTasks } from "./utils/tasks-generator";
