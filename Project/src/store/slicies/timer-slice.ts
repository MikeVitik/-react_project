import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getTimeFractions } from "../utils/format-time";

export interface Timer {
  state: "created" | "running" | "pause" | "end";
  time: number;
  totalTime: number;
  currentTime: number;
}

export const timerSlice = createSlice({
  name: "timer",
  initialState: {
    state: "end",
    totalTime: 0,
    time: 0,
    currentTime: 0,
  } satisfies Timer as Timer,
  reducers: {
    create: (state, action: PayloadAction<number>) => {
      return {
        isRunning: false,
        time: 0,
        totalTime: action.payload,
        currentTime: 0,
        state: "created",
      };
    },
    start: (state) => {
      state.state = "running";
      state.currentTime = 0;
    },
    stop: (state) => {
      state.state = "pause";
      state.currentTime = 0;
    },
    updateTime: {
      prepare: (delta: number) => ({ payload: { delta } }),
      reducer: (state, action: PayloadAction<{ delta: number }>) => {
        if (state.state === "pause" || state.state === "running") {
          state.currentTime = state.currentTime + action.payload.delta;
        }
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
