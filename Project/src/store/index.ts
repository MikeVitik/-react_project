import { taskEditorSlice } from "./slicies/task-editor";

import { tasksSlice } from "./slicies/tasks-slice";

import { currentTaskSlice } from "./slicies/current-task";
import { timerSlice } from "./slicies/timer-slice";

export type { CurrentTask } from "./slicies/current-task";

export const { getMode } = currentTaskSlice.selectors;

export {
  configureAppStore,
  currentTask,
  updateTime,
  useAppDispatch,
} from "./store";

export { taskActions } from "./store";

export type { RootState } from "./store";
export const {
  decrementPomodoro,
  deleteTask,
  incrementPomodoro,
  changeTask,
  addTask,
} = tasksSlice.actions;

export { createTask } from "./store";
export const { selectCanDecrement, selectTotalTime } = tasksSlice.selectors;

export const { cancelTaskEdit, editTask, updateEditTaskName } =
  taskEditorSlice.actions;
export const { getTimerValue } = timerSlice.selectors;
