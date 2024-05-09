import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { formatTime } from "../utils/format-time";

export interface SerialiazableTask {
  id: number;
  name: string;
  isCompleted: boolean;
  pomodoroCount: number;
}
export interface Task extends SerialiazableTask {
  startDate: Date;
}

let lastTaskId = 0;
const taskIdPrepare = (taskId: number) => {
  return { payload: { taskId } };
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: [] as SerialiazableTask[],
  reducers: {
    addTask: {
      prepare: (text: string) => {
        const currentDate = new Date();
        return {
          payload: {
            id: lastTaskId++,
            name: text,
            pomodoroCount: 1,
            startDateString: currentDate.toUTCString(),
            isCompleted: false,
          },
        };
      },
      reducer: (state, action: PayloadAction<SerialiazableTask>) => {
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
        const task = tasksSlice.getSelectors().getTask(state, taskId);
        task.name = text;
      },
    },
    completeTask: {
      prepare: (taskId: number) => {
        return { payload: { taskId } };
      },
      reducer: (
        state,
        { payload: { taskId } }: PayloadAction<{ taskId: number }>
      ) => {
        const task = tasksSlice.getSelectors().getTask(state, taskId);
        task.isCompleted = true;
      },
    },
    incrementPomodoro: {
      prepare: taskIdPrepare,
      reducer: (state, action: PayloadAction<{ taskId: number }>) => {
        const task = tasksSlice
          .getSelectors()
          .getTask(state, action.payload.taskId);
        task.pomodoroCount += 1;
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
          const task = tasksSlice
            .getSelectors()
            .getTask(state, action.payload.taskId);
          task.pomodoroCount -= 1;
        }
      },
    },
  },
  selectors: {
    getTask: (sliceState, taskId: number): SerialiazableTask => {
      return sliceState[
        tasksSlice.getSelectors().getTaskIndex(sliceState, taskId)
      ];
    },
    getTaskIndex: (sliceState, taskId: number): number => {
      const taskIndex = sliceState.findIndex(({ id }) => id === taskId);
      if (taskIndex === -1) {
        throw new Error(`Task with id not found ${taskId}`);
      }
      return taskIndex;
    },
    selectCanDecrement: (sliceState, taskId: number): boolean => {
      return (
        tasksSlice.getSelectors().getTask(sliceState, taskId).pomodoroCount > 1
      );
    },
    selectUncompleted: createSelector(
      (state: SerialiazableTask[]) => state,
      (state) => {
        return state.filter(({ isCompleted }) => !isCompleted);
      }
    ),
    selectTotalTime: (sliceState) => {
      const tasks = tasksSlice.getSelectors().selectUncompleted(sliceState);
      const totalTime: number = tasks.reduce(
        (acc, { pomodoroCount: pomodoro_count }) => acc + pomodoro_count,
        0
      );

      return formatTime(new Date(totalTime));
    },
    getNextTask: (sliceState) => {
      return sliceState.find(({ isCompleted }) => !isCompleted);
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
export const {
  selectCanDecrement,
  selectTotalTime,
  getTaskIndex,
  getTask,
  getNextTask,
  selectUncompleted,
} = tasksSlice.selectors;
