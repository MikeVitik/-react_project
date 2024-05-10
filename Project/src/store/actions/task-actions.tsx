import { createAsyncThunk } from "@reduxjs/toolkit";
import { BREAK_TIME, TASK_TIME } from "../const";
import { currentTask } from "../selectors/current-task-selector";
import { currentTaskSlice } from "../slicies/current-task";
import { statisticInfo } from "../slicies/statistic";
import { addTask, getNextTask, tasksSlice } from "../slicies/tasks-slice";
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
  (_, { dispatch, getState }) => {
    dispatch(currentTaskSlice.actions.startTask());
    dispatch(timerSlice.actions.start());
  }
);

export const pauseTask = createAsyncThunk<void, void, { state: RootState }>(
  "pauseTask",
  (_, { dispatch, getState }) => {
    dispatch(
      statisticInfo.actions.add(getState().currentTask, getState().timer)
    );
    dispatch(currentTaskSlice.actions.pauseTask());
    dispatch(timerSlice.actions.stop());
  }
);
export const continueTask = createAsyncThunk<void, void, { state: RootState }>(
  "continueTask",
  (_, { dispatch, getState }) => {
    dispatch(
      statisticInfo.actions.add(getState().currentTask, getState().timer)
    );
    dispatch(currentTaskSlice.actions.continueTask());
    dispatch(timerSlice.actions.start());
  }
);
export const stopTaskWork = createAsyncThunk<void, void, { state: RootState }>(
  "stopTaskWork",
  (_, { dispatch, getState }) => {
    // if (!currentTaskSlice.selectSlice(getState()).hasPause) {
    //   dispatch(tasksSlice.actions.incrementCurrentPomodoro())
    // }
    dispatch(
      statisticInfo.actions.add(getState().currentTask, getState().timer)
    );
    dispatch(timerSlice.actions.stop());
    dispatch(currentTaskSlice.actions.stopTaskWork());
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
    if (timerSlice.selectSlice(getState()).state === "end") {
      dispatch(timerSlice.actions.create(BREAK_TIME));
    } else {
      dispatch(timerSlice.actions.stop());
    }
  }
);
export const continueBreak = createAsyncThunk<void, void, { state: RootState }>(
  "continueBreak",
  (_, { dispatch, getState }) => {
    dispatch(currentTaskSlice.actions.continueBreak());
    dispatch(timerSlice.actions.start());
  }
);
export const nextTask = createAsyncThunk<void, void, { state: RootState }>(
  "nextTask",
  (_, { dispatch, getState }) => {
    dispatch(currentTaskSlice.actions.nextTaskOrInited());
    if (currentTask(getState()).taskId === undefined) {
      dispatch(timerSlice.actions.reset());
    } else {
      dispatch(timerSlice.actions.create(TASK_TIME));
    }
  }
);
export const completeTask = createAsyncThunk<void, void, { state: RootState }>(
  "completeTask",
  (_, { dispatch, getState }) => {
    dispatch(
      tasksSlice.actions.completeTask(
        currentTaskSlice.selectSlice(getState()).taskId!
      )
    );
    const nextTask = getNextTask(getState());
    console.log(nextTask);
    dispatch(
      currentTaskSlice.actions.completeTask(nextTask ? nextTask.id : undefined)
    );
    dispatch(timerSlice.actions.create(BREAK_TIME));
  }
);
