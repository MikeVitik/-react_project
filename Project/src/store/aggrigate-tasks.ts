import { Task } from "./slicies/tasks-slice";
import { normalizeDay } from "./utils/normalize-day";
export type FilterType = "currentWeek" | "pastWeek" | "twoWeeksAgo";
export interface StatisticValues {
  day: number;
  completedPomodoro: number;
  workTime: number;
  pauseCount: number;
  pauseTime: number;
}

export const aggrigateTasks = (tasks: Task[]): StatisticValues[] => {
  const result = Object.values(
    tasks
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
      .reduce<{
        [key: string]: StatisticValues;
      }>((aggrigate, task) => {
        const key = normalizeDay(task.startDate.getDay());
        if (aggrigate[key]) {
          aggrigate[key] = {
            day: key,
            completedPomodoro:
              aggrigate[key].completedPomodoro + task.completedPomodoro! / 1000,
            workTime: aggrigate[key].workTime + task.workTime! / 1000,
            pauseCount: aggrigate[key].pauseCount + task.pauseCount!,
            pauseTime: Math.floor(
              aggrigate[key].pauseTime + task.pauseTime! / 1000
            ),
          };
        } else {
          aggrigate[key] = {
            day: key,
            completedPomodoro: task.completedPomodoro! / 1000,
            workTime: task.workTime! / 1000,
            pauseCount: task.pauseCount!,
            pauseTime: Math.floor(task.pauseTime! / 1000),
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
