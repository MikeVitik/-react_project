import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TIME_OF_ONE_POMODORO, TOTAL_MILLISECONDS_IN_DAY } from "../const";
import { formatTime } from "../utils/format-time";
import { normalizeDay } from "../utils/normalize-day";

export interface SerialiazableTask {
  id: number;
  name: string;
  startDateString: string;
  isCompleted: boolean;
  pomodoroCount: number;
  completedPomodoro?: number;
  workTime?: number;
  pauseCount?: number;
  pauseTime?: number;
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
    selectTotalTime: (sliceState) => {
      const allTime = new Date(
        sliceState.reduce(
          (acc, { pomodoroCount: pomodoro_count }) => acc + pomodoro_count,
          0
        ) * TIME_OF_ONE_POMODORO
      );
      return formatTime(allTime);
    },
    filterTasks: (
      sliceState,
      filter: "currentWeek" | "pastWeek" | "twoWeeksAgo",
      currentDate = new Date()
    ) => {
      const filterMap = {
        currentWeek: {
          startDate: (currentDate: Date) => {
            return (
              +currentDate -
              normalizeDay(currentDate.getDate()) * TOTAL_MILLISECONDS_IN_DAY
            );
          },
          endDate: (currentDate: Date) => {
            const daysToWeekend = 7 - normalizeDay(currentDate.getDay());
            return +currentDate + daysToWeekend * TOTAL_MILLISECONDS_IN_DAY;
          },
        },
        pastWeek: {
          startDate: (currentDate: Date) => {
            return (
              filterMap["currentWeek"].startDate(currentDate) -
              7 * TOTAL_MILLISECONDS_IN_DAY
            );
          },
          endDate: (currentDate: Date) => {
            return (
              filterMap["currentWeek"].endDate(currentDate) -
              7 * TOTAL_MILLISECONDS_IN_DAY
            );
          },
        },
        twoWeeksAgo: {
          startDate: (currentDate: Date) => {
            return (
              filterMap["currentWeek"].startDate(currentDate) -
              14 * TOTAL_MILLISECONDS_IN_DAY
            );
          },
          endDate: (currentDate: Date) => {
            return (
              filterMap["currentWeek"].endDate(currentDate) -
              14 * TOTAL_MILLISECONDS_IN_DAY
            );
          },
        },
      };

      const startDate = new Date(filterMap[filter].startDate(currentDate));
      const endDate = new Date(filterMap[filter].endDate(currentDate));
      return sliceState
        .map(
          (t): Task => ({
            ...t,
            startDate: (t as Task).startDate || new Date(t.startDateString),
          })
        )
        .filter(
          (t) =>
            t.isCompleted && t.startDate >= startDate && t.startDate < endDate
        );
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
  filterTasks,
} = tasksSlice.selectors;
