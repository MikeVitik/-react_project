import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CurrentTask {
  taskId?: number;
  state:
    | "inited" // нет задач
    | "workInited" // задача есть но она не начата
    | "workTimer" // работаем над задачей
    | "workPause" // работа на паузе
    | "workStop" // после паузы выбор продолжаем или сделали
    | "break" // пауза не начата
    | "breakTimer" // пауза
    | "breakStop"; // пауза остановлена
  hasPause?: boolean;
  startTime?: Date;
  pause?: number;
}
export const currentTaskSlice = createSlice({
  name: "currentTask",
  initialState: {
    state: "inited",
    hasPause: false,
  } satisfies CurrentTask as CurrentTask,
  reducers: {
    initTask: (state, action: { payload: number | undefined }) => {
      if (state.state === "inited") {
        state.state = "workInited";
        state.taskId = action.payload;
      }
    },
    startTask: (state) => {
      if (state.state === "workInited") {
        state.state = "workTimer";
      } else {
        throw new Error("Wrong state:" + state.state);
      }
    },
    pauseTask: (state) => {
      state.state = "workPause";
      state.hasPause = true;
    },
    stopTask: (state) => {
      state.state = "inited";
    },
    continueTask: (state) => {
      state.state = "workTimer";
    },
    stopTaskWork: (state) => {
      state.state = "workStop";
    },
    startBreak: (state) => {
      state.state = "break";
    },
    pauseBreak: (state) => {
      state.state = "breakStop";
    },
    continueBreak: (state) => {
      state.state = "breakTimer";
    },
    nextTaskOrInited: (state) => {
      if (state.taskId !== undefined) {
        state.state = "workInited";
      } else {
        state.state = "inited";
      }
    },
    completeTask: (state, action: PayloadAction<number | undefined>) => {
      state.taskId = action.payload;
      state.state = "break";
    },
  },
  selectors: {
    getMode: (state) => {
      const stateToModeMap: {
        [key in CurrentTask["state"]]: "prepare" | "work" | "pause";
      } = {
        inited: "prepare",
        break: "pause",
        breakStop: "pause",
        breakTimer: "pause",
        workInited: "prepare",
        workPause: "work",
        workStop: "work",
        workTimer: "work",
      };
      return stateToModeMap[state.state];
    },
  },
});

export const currentTask = currentTaskSlice.selectSlice;
