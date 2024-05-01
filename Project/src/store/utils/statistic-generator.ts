import { TASK_TIME, TOTAL_MILLISECONDS_IN_DAY } from "../const";
import { StatisticItem } from "../slicies/statistic";

export function generateStatistics(
  currentDate = new Date(),
  seed = 1
): StatisticItem[] {
  function random(max: number) {
    var x = Math.sin(seed++) * 10000;
    return Math.floor(max * (x - Math.floor(x)));
  }

  const result: StatisticItem[] = [];
  let id = -1;
  for (let day = 0; day < 7 * 3; day++) {
    for (let attemps = 0; attemps < 5; attemps++) {
      const isCompletedPomodoro = random(3) <= 1;
      const startDateString = currentDate.toUTCString();
      if (isCompletedPomodoro) {
        result.push({
          taskId: id,
          startDateString,
          type: "work",
          completedPomodoro: TASK_TIME,
          workTime: TASK_TIME,
        } satisfies StatisticItem);
      } else {
        const time = random(20 * 1000);
        const type: StatisticItem["type"] = random(2) === 0 ? "work" : "pause";
        result.push({
          taskId: id,
          startDateString,
          type,
          [type + "Time"]: time,
        } satisfies StatisticItem);
      }
    }
    currentDate = new Date(currentDate.getTime() - TOTAL_MILLISECONDS_IN_DAY);
    id = id - 1;
  }
  return result.reverse();
}
