import { generateTasks } from "../store";

describe("generateTasks", () => {
  it("should generate task for 2 weeks", () => {
    const tasks = generateTasks(new Date(2024, 1, 20));
    expect(tasks.length).toBe(15);
    expect(tasks.filter(({ id }) => id < 0).length).toBe(15);
    expect(tasks).toMatchSnapshot();
  });
});
