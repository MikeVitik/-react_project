import { taskEditorSlice } from "./slicies/task-editor";

import { tasksSlice } from "./slicies/tasks-slice";

import { currentTaskSlice } from "./slicies/current-task";
import { timerSlice } from "./slicies/timer-slice";

export type { CurrentTask } from "./slicies/current-task";

export const { getMode } = currentTaskSlice.selectors;

export { aggrigateStatistic, filterStatistic } from "./slicies/statistic";
export type { FilterType, StatisticValues } from "./slicies/statistic";

export { configureAppStore, useAppDispatch } from "./store";

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
export { updateTime } from "./actions/update-time";
export const { selectCanDecrement, selectTotalTime } = tasksSlice.selectors;

export const { cancelTaskEdit, editTask, updateEditTaskName } =
  taskEditorSlice.actions;
export const { getTimerValue } = timerSlice.selectors;

export { generateStatistics } from "./utils/statistic-generator";
