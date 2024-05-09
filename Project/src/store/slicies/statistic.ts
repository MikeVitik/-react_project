import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ONE_MINUTES, TOTAL_MILLISECONDS_IN_DAY } from "../const";
import { normalizeDay } from "../utils/normalize-day";
import { CurrentTask } from "./current-task";
import { Timer } from "./timer-slice";

export interface StatisticValues {
  day: number;
  completedPomodoro: number;
  workTime: number;
  pauseCount: number;
  pauseTime: number;
}

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
    add: {
      prepare: (
        {
          taskId,
          hasPause,
          state: currentTaskState,
        }: Pick<CurrentTask, "taskId" | "hasPause" | "state">,
        { currentTime, state: timerState }: Pick<Timer, "state" | "currentTime">
      ) => {
        const type = timerState !== "pause" ? "work" : "pause";
        const name = timerState !== "pause" ? "workTime" : "pauseTime";
        const completedPomodoro =
          currentTaskState === "break" && type === "work" && hasPause !== true
            ? currentTime
            : undefined;
        return {
          payload: {
            taskId: taskId!,
            type,
            completedPomodoro,
            startDateString: new Date().toUTCString(),
            [name]: currentTime,
          } satisfies StatisticItem,
        };
      },
      reducer: (state, action: PayloadAction<StatisticItem>) => {
        state.push(action.payload);
      },
    },
  },
  selectors: {
    filter: (
      sliceState,
      filter: "currentWeek" | "pastWeek" | "twoWeeksAgo",
      currentDate = new Date(new Date().toDateString())
    ): StatisticItem[] => {
      const filterMap = {
        currentWeek: {
          startDate: (currentDate: Date) => {
            return (
              +currentDate -
              normalizeDay(currentDate.getDay()) * TOTAL_MILLISECONDS_IN_DAY
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
        .map((item) => ({
          ...item,
          startDate: (item as any).startDate || new Date(item.startDateString),
        }))
        .filter((t) => t.startDate >= startDate && t.startDate < endDate);
    },
  },
});

export const aggrigateStatistic = (
  items: StatisticItem[]
): StatisticValues[] => {
  const result = Object.values(
    items
      .map((item) => ({
        ...item,
        startDate: new Date(item.startDateString),
      }))
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
      .reduce<{
        [key: string]: StatisticValues;
      }>((aggrigate, item) => {
        const key = normalizeDay(item.startDate.getDay());
        const pauseCount = item.type === "pause" ? 1 : 0;
        type TimeNameType = `${StatisticItem["type"]}Time`;
        const timeName: TimeNameType = `${item.type}Time`;
        if (aggrigate[key]) {
          aggrigate[key] = {
            ...aggrigate[key],
            completedPomodoro:
              aggrigate[key].completedPomodoro +
              (item.completedPomodoro ?? 0) / ONE_MINUTES,
            [timeName]:
              aggrigate[key][timeName] + (item[timeName] ?? 0) / ONE_MINUTES,
            pauseCount: aggrigate[key].pauseCount + pauseCount,
          };
        } else {
          aggrigate[key] = {
            day: key,
            completedPomodoro: (item.completedPomodoro ?? 0) / ONE_MINUTES,
            workTime: (item.workTime ?? 0) / ONE_MINUTES,
            pauseCount,
            pauseTime: (item.pauseTime ?? 0) / ONE_MINUTES,
          };
        }
        return aggrigate;
      }, {})
  );
  const dayRemains = 7 - result.length;
  if (dayRemains > 0) {
    const days = [...Array(dayRemains)].map((_, i) => ({
      day: i + 1,
      completedPomodoro: 0,
      workTime: 0,
      pauseCount: 0,
      pauseTime: 0,
    }));
    return [...result, ...days];
  }
  return result;
};

export type FilterType = Parameters<typeof statisticInfo.selectors.filter>[1];
export const { filter: filterStatistic } = statisticInfo.selectors;
