import { TASK_TIME, TOTAL_MILLISECONDS_IN_DAY } from "../const";
import { SerialiazableTask } from "../slicies/tasks-slice";

export function generateTasks(
  currentDate = new Date(),
  seed = 1
): SerialiazableTask[] {
  function random(max: number) {
    var x = Math.sin(seed++) * 10000;
    return Math.floor(max * (x - Math.floor(x)));
  }

  const result: SerialiazableTask[] = [];
  let id = -1;
  for (let i = 0; i < 7 * 3; i++) {
    const completedPomodoro = (random(4) + 1) * TASK_TIME;
    result.push({
      name: "Generated task " + i,
      id,
      startDateString: currentDate.toUTCString(),
      isCompleted: true,
      pomodoroCount: 3,
      completedPomodoro,
      workTime: Math.floor(
        completedPomodoro + completedPomodoro * (random(30) / 100)
      ),
      pauseCount: random(4),
      pauseTime: random(20 * 1000),
    });
    currentDate = new Date(currentDate.getTime() - TOTAL_MILLISECONDS_IN_DAY);
    id = id - 1;
  }
  return result.reverse();
}
