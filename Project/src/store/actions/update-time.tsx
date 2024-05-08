import { createAsyncThunk } from "@reduxjs/toolkit";
import { timerSlice } from "../slicies/timer-slice";
import { RootState } from "../store";
import { stopTaskWork } from "./task-actions";

export const updateTime = createAsyncThunk<void, number, { state: RootState }>(
  "updateTimer",
  (delta: number, { dispatch, getState }) => {
    dispatch(timerSlice.actions.updateTime(delta));
    if (timerSlice.selectSlice(getState()).state === "end") {
      dispatch(stopTaskWork());
    }
  }
);
