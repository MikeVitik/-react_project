import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getTimeFractions } from "../utils/format-time";

export interface Timer {
  isRunning: boolean;
  time: number;
  totalTime: number;
}
export const timerSlice = createSlice({
  name: "timer",
  initialState: { isRunning: false, totalTime: 0, time: 0 } as Timer,
  reducers: {
    create: (state, action: PayloadAction<number>) => {
      return { isRunning: false, time: 0, totalTime: action.payload };
    },
    toggle: (state) => {
      return { ...state, isRunning: !state.isRunning };
      // if (state.isRunning) {
      //   return { ...state, isRunning: !state.isRunning };
      // } else {
      //   return { ...state, ...action.payload };
      // }
    },
    updateTime: {
      prepare: (delta: number) => ({ payload: { delta } }),
      reducer: (state, action: PayloadAction<{ delta: number }>) => {
        if (state.isRunning)
          return {
            ...state,
            time: state.time + action.payload.delta,
          };
        else {
          return state;
        }
      },
    },
  },
  selectors: {
    getTimerValue: ({ totalTime, time }) => {
      const elapsedTime = new Date(totalTime - time);
      const { m, s } = getTimeFractions(elapsedTime);
      return { m, s: s < 10 ? "0" + s : s };
    },
  },
});

export const { getTimerValue } = timerSlice.selectors;
