import { combineSlices } from "@reduxjs/toolkit";
import { currentTaskSlice } from "./slicies/current-task";
import { taskEditorSlice } from "./slicies/task-editor";
import { tasksSlice } from "./slicies/tasks-slice";
import { timerSlice } from "./slicies/timer-slice";

export const rootReducer = combineSlices(
  taskEditorSlice,
  tasksSlice,
  currentTaskSlice,
  timerSlice
);
