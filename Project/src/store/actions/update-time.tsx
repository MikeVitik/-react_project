import { createAsyncThunk } from "@reduxjs/toolkit";
import { currentTaskSlice } from "../slicies/current-task";
import { timerSlice } from "../slicies/timer-slice";
import { RootState } from "../store";
import { pauseBreak, stopTaskWork } from "./task-actions";

export const updateTime = createAsyncThunk<void, number, { state: RootState }>(
  "updateTimer",
  (delta: number, { dispatch, getState }) => {
    dispatch(timerSlice.actions.updateTime(delta));
    if (timerSlice.selectSlice(getState()).state === "end") {
      if (currentTaskSlice.selectSlice(getState()).state === "breakTimer") {
        dispatch(pauseBreak());
      } else {
        dispatch(stopTaskWork());
      }
    }
  }
);
