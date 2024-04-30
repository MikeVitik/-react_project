import { createAsyncThunk } from "@reduxjs/toolkit";
import { BREAK_TIME, TASK_TIME } from "../const";
import { currentTask } from "../selectors/current-task-selector";
import { currentTaskSlice } from "../slicies/current-task";
import { addTask } from "../slicies/tasks-slice";
import { timerSlice } from "../slicies/timer-slice";
import { RootState } from "../store";

export const createTask = createAsyncThunk<void, string, { state: RootState }>(
  "createTask",
  (text, { dispatch, getState }) => {
    const addTaskAction = addTask(text);
    dispatch(addTaskAction);
    if (currentTask(getState()).taskId === undefined) {
      dispatch(currentTaskSlice.actions.initTask(addTaskAction.payload.id));
      dispatch(timerSlice.actions.create(TASK_TIME));
    }
  }
);

export const startTask = createAsyncThunk<void, void, { state: RootState }>(
  "startTask",
  (_, { dispatch }) => {
    dispatch(currentTaskSlice.actions.startTask());
    dispatch(timerSlice.actions.start());
  }
);

export const pauseTask = createAsyncThunk<void, void, { state: RootState }>(
  "pauseTask",
  (_, { dispatch }) => {
    dispatch(currentTaskSlice.actions.pauseTask());
    dispatch(timerSlice.actions.stop());
  }
);
export const stopTask = createAsyncThunk<void, void, { state: RootState }>(
  "stopTask",
  (_, { dispatch }) => {
    dispatch(currentTaskSlice.actions.stopTask());
    dispatch(timerSlice.actions.stop());
  }
);
export const continueTask = createAsyncThunk<void, void, { state: RootState }>(
  "continueTask",
  (_, { dispatch }) => {
    dispatch(currentTaskSlice.actions.continueTask());
    dispatch(timerSlice.actions.start());
  }
);

export const startBreak = createAsyncThunk<void, void, { state: RootState }>(
  "startBreak",
  (_, { dispatch, getState }) => {
    dispatch(currentTaskSlice.actions.startBreak());
    dispatch(timerSlice.actions.create(BREAK_TIME));
  }
);

export const pauseBreak = createAsyncThunk<void, void, { state: RootState }>(
  "pauseBreak",
  (_, { dispatch, getState }) => {
    dispatch(currentTaskSlice.actions.pauseBreak());
    dispatch(timerSlice.actions.stop());
  }
);
export const continueBreak = createAsyncThunk<void, void, { state: RootState }>(
  "continueBreak",
  (_, { dispatch, getState }) => {
    dispatch(currentTaskSlice.actions.continueBreak());
    dispatch(timerSlice.actions.start());
  }
);
export const nextOrContinueTask = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("nextOrContinueTask", (_, { dispatch, getState }) => {
  dispatch(currentTaskSlice.actions.nextOrContinueTask());
});
export const completeTask = createAsyncThunk<void, void, { state: RootState }>(
  "completeTask",
  (_, { dispatch, getState }) => {
    // dispatch(task ) getState()
    dispatch(currentTaskSlice.actions.pauseBreak());
    // dispatch(timerSlice.actions.stop());
  }
);
