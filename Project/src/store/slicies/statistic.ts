import { createSlice } from "@reduxjs/toolkit";

export interface StatisticItem {
  taskId: number;
  type: "work" | "pause";
  startDateString: string;
  completedPomodoro?: number;
  workTime?: number;
  pauseTime?: number;
}

export const statisticInfo = createSlice({
  name: "statisticInfo",
  initialState: [] as StatisticItem[],
  reducers: {
    add: (
      state,
      action: { payload: Omit<StatisticItem, "startDateString"> }
    ) => {
      state.push({
        ...action.payload,
        startDateString: new Date().toUTCString(),
      });
    },
  },
});
