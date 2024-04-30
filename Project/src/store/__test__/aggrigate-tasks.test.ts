import { aggrigateTasks } from "../aggrigate-tasks";
import { Task } from "../slicies/tasks-slice";

describe("aggrigateTasks", () => {
  it("should return all week values for one the Monday task", () => {
    const tasks: Task[] = [
      {
        completedPomodoro: 40000,
        id: -15,
        isCompleted: true,
        name: "Generated task 14",
        pauseCount: 1,
        pauseTime: 17875,
        pomodoroCount: 3,
        startDateString: new Date(2024, 3, 15).toUTCString(),
        startDate: new Date(2024, 3, 15),
        workTime: 145296,
      },
    ];
    const values = aggrigateTasks(tasks);
    expect(values.map((v) => v.day)).toEqual([0, 1, 2, 3, 4, 5, 6]);
    expect(values[0]).toMatchSnapshot();
    expect(values[1]).toMatchSnapshot();
  });
  it("should summarize same day value", () => {
    const task = {
      completedPomodoro: 40000,
      id: -15,
      isCompleted: true,
      name: "Generated task 14",
      pauseCount: 1,
      pauseTime: 17875,
      pomodoroCount: 3,
      startDateString: new Date(2024, 3, 15).toUTCString(),
      startDate: new Date(2024, 3, 15),
      workTime: 145296,
    };
    const tasks: Task[] = [task, task];
    const values = aggrigateTasks(tasks);
    expect(values[0]).toMatchSnapshot();
  });
});
