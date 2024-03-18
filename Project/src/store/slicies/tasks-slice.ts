import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { formatTime } from "../utils/format-time";

const TIME_OF_ONE_POMODORO = 25 * 60 * 1000;
interface Task {
  id: number;
  name: string;
  pomodoroCount: number;
}

let lastTaskId = 0;
const taskIdPrepare = (taskId: number) => {
  return { payload: { taskId } };
};
export const tasksSlice = createSlice({
  name: "tasks",
  initialState: [] as Task[],
  reducers: {
    addTask: {
      prepare: (text: string) => {
        return { payload: { id: lastTaskId++, name: text, pomodoroCount: 1 } };
      },
      reducer: (state, action: PayloadAction<Task>) => {
        state.push(action.payload);
      },
    },
    deleteTask: {
      prepare: taskIdPrepare,
      reducer: (
        state,
        { payload: { taskId } }: PayloadAction<{ taskId: number }>
      ) => {
        return state.filter((task) => task.id !== taskId);
      },
    },
    changeTask: {
      prepare: (taskId: number, text: string) => {
        return { payload: { taskId, text } };
      },
      reducer: (
        state,
        {
          payload: { text, taskId },
        }: PayloadAction<{ taskId: number; text: string }>
      ) => {
        const taskIndex = tasksSlice.getSelectors().getTaskIndex(state, taskId);
        state[taskIndex].name = text;
      },
    },
    incrementPomodoro: {
      prepare: taskIdPrepare,
      reducer: (state, action: PayloadAction<{ taskId: number }>) => {
        const taskIndex = tasksSlice
          .getSelectors()
          .getTaskIndex(state, action.payload.taskId);
        state[taskIndex].pomodoroCount += 1;
      },
    },
    decrementPomodoro: {
      prepare: taskIdPrepare,
      reducer: (state, action: PayloadAction<{ taskId: number }>) => {
        if (
          tasksSlice
            .getSelectors()
            .selectCanDecrement(state, action.payload.taskId)
        ) {
          const taskIndex = tasksSlice
            .getSelectors()
            .getTaskIndex(state, action.payload.taskId);
          state[taskIndex].pomodoroCount -= 1;
        }
      },
    },
  },
  selectors: {
    getTaskIndex: (sliceState, taskId: number): number => {
      const taskIndex = sliceState.findIndex(({ id }) => id === taskId);
      if (taskIndex === -1) {
        throw new Error(`Task with id not found ${taskId}`);
      }
      return taskIndex;
    },
    selectCanDecrement: (sliceState, taskId: number): boolean => {
      return (
        sliceState[tasksSlice.getSelectors().getTaskIndex(sliceState, taskId)]
          .pomodoroCount > 1
      );
    },
    selectTotalTime: (sliceState) => {
      const allTime = new Date(
        sliceState.reduce(
          (acc, { pomodoroCount: pomodoro_count }) => acc + pomodoro_count,
          0
        ) * TIME_OF_ONE_POMODORO
      );
      return formatTime(allTime);
    },
  },
});

export const {
  addTask,
  changeTask,
  deleteTask,
  incrementPomodoro,
  decrementPomodoro,
} = tasksSlice.actions;
export const { selectCanDecrement, selectTotalTime, getTaskIndex } =
  tasksSlice.selectors;
