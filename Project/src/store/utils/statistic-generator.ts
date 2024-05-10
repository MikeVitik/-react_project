import { TASK_TIME, TOTAL_MILLISECONDS_IN_DAY } from "../const";
import { StatisticItem } from "../slicies/statistic";

export function generateStatistics(
  currentDate = new Date(Date.now() - TOTAL_MILLISECONDS_IN_DAY),
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
      const isPomodoroComplete = random(3) <= 1;
      const startDateString = currentDate.toUTCString();
      if (isPomodoroComplete) {
        result.push({
          taskId: id,
          startDateString,
          type: "work",
          isPomodoroComplete: true,
          workTime: TASK_TIME,
        } satisfies StatisticItem);
      } else {
        const workTime = random(TASK_TIME);
        result.push(
          {
            taskId: id,
            startDateString,
            type: "work",
            workTime,
          } satisfies StatisticItem,
          {
            taskId: id,
            startDateString,
            type: "pause",
            pauseTime: TASK_TIME - workTime,
          } satisfies StatisticItem
        );
      }
    }
    currentDate = new Date(currentDate.getTime() - TOTAL_MILLISECONDS_IN_DAY);
    id = id - 1;
  }
  return result.reverse();
}
