import { createSlice } from "@reduxjs/toolkit";
import { TIME_OF_ONE_POMODORO } from "./tasks-slice";

// startTask: () => {
//   //
// },
// pauseTask: () => {},
// continueTask: () => {},
// stopTask: () => {},
// // ??? completeTask: () => {},
// timerEnd: () => {},
// pausePause: () => {},
// continuePause: () => {},

export interface CurrentTask {
  taskId?: number;
  elapsedTime?: number;
  state:
    | "inited" // нет задач
    | "workInited" // задача есть но она не начата
    | "workTimer" // работаем над задачей
    | "workPause" // работа на паузе
    | "workStop" // после паузы выбор продолжаем или слелали
    //    | "workStopEndTask" // работа на паузе последний помидор в задаче
    | "break" // пауза не начата
    | "breakTimer" // пауза
    | "breakStop"; // пауза остановлена
  primaryAction?:
    | "startTask"
    | "pauseTask"
    | "continueTask"
    | "startBreak"
    | "pauseBreak"
    | "continueBreak";
  primaryDisabled?: boolean;
  secondaryAction?: "stopTask" | "completeTask" | "skipBreak";
  secondaryDisabled?: boolean;
  startTime?: Date;
  pause?: number;
}
export const currentTaskSlice = createSlice({
  name: "currentTask",
  initialState: {
    state: "inited",
    primaryDisabled: true,
    secondaryDisabled: true,
    primaryAction: "startTask",
    secondaryAction: "stopTask",
  } satisfies CurrentTask as CurrentTask,
  reducers: {
    initTask: (state, action: { payload: number | undefined }) => {
      if (state.state === "inited") {
        state.state = "workInited";
        state.primaryDisabled = false;
        state.secondaryDisabled = true;
        state.primaryAction = "startTask";
        state.secondaryAction = "stopTask";
        state.taskId = action.payload;
        state.elapsedTime = TIME_OF_ONE_POMODORO;
      }
    },
    startTask: (state) => {
      if (state.state === "workInited") {
        state.state = "workTimer";
        state.primaryDisabled = false;
        state.secondaryDisabled = true;
        state.primaryAction = "pauseTask";
        state.secondaryAction = "stopTask";
      } else {
        throw new Error("Wrong state:" + state.state);
      }
    },
    pauseTask: (state) => {
      state.state = "workPause";
      state.primaryDisabled = false;
      state.secondaryDisabled = false;
      state.primaryAction = "continueTask";
      // state.secondaryAction = action.payload ? "stopTask" : "completeTask";
    },
    stopTask: (state) => {
      state.state = "inited";
      state.primaryDisabled = false;
      state.secondaryDisabled = true;
      state.primaryAction = "pauseTask";
      state.secondaryAction = "stopTask";
    },
    continueTask: (state) => {
      state.state = "workTimer";
      state.primaryDisabled = false;
      state.secondaryDisabled = true;
      state.primaryAction = "pauseTask";
      state.secondaryAction = "stopTask";
    },
    // completeTask: (state) => {
    //   state.state = "breakInited";
    //   state.primaryDisabled = false;
    //   state.secondaryDisabled = true;
    //   state.primaryAction = "startBreak";
    //   state.secondaryAction = "stopTask";
    // },
    startBreak: (state) => {
      state.state = "break";
      state.primaryDisabled = false;
      state.secondaryDisabled = false;
      state.primaryAction = "pauseBreak";
      state.secondaryAction = "skipBreak";
    },
    pauseBreak: (state) => {
      state.state = "breakStop";
      state.primaryDisabled = false;
      state.secondaryDisabled = false;
      state.primaryAction = "continueBreak";
      state.secondaryAction = "skipBreak";
    },
    continueBreak: (state) => {
      state.state = "breakTimer";
    },
    nextOrContinueTask: (state) => {
      state.state = "workStop";
    },
    // skipBreak: (
    //   state,
    //   action: { payload: { isLastPomodoro: boolean; taskId: number } }
    // ) => {
    //   if (action.payload.isLastPomodoro) {
    //     currentTaskSlice.caseReducers.initTask(state, {
    //       payload: action.payload.taskId,
    //     });
    //   } else {
    //     currentTaskSlice.caseReducers.startTask(state);
    //   }
    // },
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
        // workStopEndTask: "work",
        workTimer: "work",
      };
      return stateToModeMap[state.state];
    },
  },
});

export const currentTask = currentTaskSlice.selectSlice;
