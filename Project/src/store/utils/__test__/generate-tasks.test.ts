import { generateTasks } from "../tasks-generator";

describe("generateTasks", () => {
  it("should generate task for 2 weeks", () => {
    const tasks = generateTasks(new Date(2024, 1, 20));
    expect(tasks.length).toBe(21);
    expect(tasks.filter(({ id }) => id < 0).length).toBe(21);
    expect(tasks).toMatchSnapshot();
  });
});
