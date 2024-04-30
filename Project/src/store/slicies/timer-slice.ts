import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getTimeFractions } from "../utils/format-time";
export interface Statistic {
  startTime: Date;
  duration: number;
  isWork: boolean;
}
export interface Timer {
  state: "created" | "running" | "pause" | "end";
  time: number;
  totalTime: number;
}

export const timerSlice = createSlice({
  name: "timer",
  initialState: {
    totalTime: 0,
    time: 0,
    state: "end",
  } satisfies Timer as Timer,
  reducers: {
    create: (state, action: PayloadAction<number>) => {
      return {
        isRunning: false,
        time: 0,
        totalTime: action.payload,
        state: "created",
      };
    },
    start: (state) => {
      state.state = "running";
    },
    stop: (state) => {
      state.state = "pause";
    },
    updateTime: {
      prepare: (delta: number) => ({ payload: { delta } }),
      reducer: (state, action: PayloadAction<{ delta: number }>) => {
        if (state.state === "running") {
          const newTime = state.time + action.payload.delta;
          if (newTime >= state.totalTime) {
            state.state = "end";
          }
          state.time = newTime;
        } else {
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
