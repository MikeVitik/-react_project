import {
  addTask,
  changeTask,
  deleteTask,
  filterTasks,
  getTaskIndex,
  incrementPomodoro,
  selectCanDecrement,
  tasksSlice,
} from "../slicies/tasks-slice";

describe("TasksSlice", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2020, 3, 1));
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  it("should add task", () => {
    const tasks = tasksSlice.reducer(
      tasksSlice.getInitialState(),
      addTask("task1")
    );
    expect(tasks).toEqual([
      {
        id: 0,
        name: "task1",
        pomodoroCount: 1,
        isCompleted: false,
        startDateString: "Tue, 31 Mar 2020 21:00:00 GMT",
      },
    ]);
  });
  it("getTaskIndex should return correct index for id = 0", () => {
    expect(
      getTaskIndex(
        {
          tasks: [
            {
              id: 0,
              name: "task",
              pomodoroCount: 1,
              isCompleted: false,
              startDateString: expect.any(String),
            },
          ],
        },
        0
      )
    ).toBe(0);
  });
  it("cannot decrement pomodoro if has only one", () => {
    expect(
      selectCanDecrement(
        {
          tasks: [
            {
              id: 0,
              name: "task",
              pomodoroCount: 1,
              isCompleted: false,
              startDateString: expect.any(String),
            },
          ],
        },
        0
      )
    ).toBe(false);
  });
  it("should increment task pomodoro count", () => {
    let state = tasksSlice.reducer(
      tasksSlice.getInitialState(),
      addTask("task1")
    );
    state = tasksSlice.reducer(state, addTask("task2"));

    expect(tasksSlice.reducer(state, incrementPomodoro(state[1].id))).toEqual([
      expect.any(Object),
      {
        id: state[1].id,
        name: "task2",
        pomodoroCount: 2,
        isCompleted: false,
        startDateString: expect.any(String),
      },
    ]);
  });
  it("changeTask should change name of task", () => {
    let state = tasksSlice.reducer(
      tasksSlice.getInitialState(),
      addTask("task1")
    );
    expect(
      tasksSlice.reducer(state, changeTask(state[0].id, "ChangedName"))[0].name
    ).toEqual("ChangedName");
  });
  it("add should generate difference id", () => {
    let state = tasksSlice.reducer(
      tasksSlice.getInitialState(),
      addTask("task1")
    );
    state = tasksSlice.reducer(state, addTask("task2"));
    expect(state[0].id).not.toEqual(state[1].id);
  });
  it("delete should remove task", () => {
    let state = tasksSlice.reducer(
      tasksSlice.getInitialState(),
      addTask("task1")
    );
    const nextState = tasksSlice.reducer(state, deleteTask(state[0].id));
    expect(nextState.length).toBe(0);
  });
  describe("filterTasks", () => {
    it("return only completed", () => {
      const currentDate = new Date(2024, 3, 17);
      expect(
        filterTasks(
          {
            tasks: [
              { isCompleted: true, startDate: currentDate } as any,
              { isCompleted: false, startDate: currentDate } as any,
            ],
          },
          "currentWeek",
          currentDate
        )
      ).toEqual([{ isCompleted: true, startDate: currentDate }]);
    });
    it("currentWeek filter", () => {
      const currentDate = new Date(2024, 3, 17);
      const tasks = filterTasks(
        {
          tasks: [
            // In filter
            { isCompleted: true, startDate: new Date(2024, 3, 17) } as any,
            { isCompleted: true, startDate: new Date(2024, 3, 15) } as any,
            { isCompleted: true, startDate: new Date(2024, 3, 21) } as any,
            // not in filter
            { isCompleted: true, startDate: new Date(2024, 3, 14) } as any,
            { isCompleted: true, startDate: new Date(2024, 3, 22) } as any,
          ],
        },
        "currentWeek",
        currentDate
      );
      expect(tasks).toEqual([
        { isCompleted: true, startDate: new Date(2024, 3, 17) } as any,
        { isCompleted: true, startDate: new Date(2024, 3, 15) } as any,
        { isCompleted: true, startDate: new Date(2024, 3, 21) } as any,
      ]);
    });
    it("currentWeek filter and current date is Sunday", () => {
      const currentDate = new Date(2024, 3, 21);
      expect(
        filterTasks(
          {
            tasks: [{ isCompleted: true, startDate: currentDate } as any],
          },
          "currentWeek",
          currentDate
        )
      ).toEqual([{ isCompleted: true, startDate: currentDate }]);
    });
    it("pastWeek filter", () => {
      const currentDate = new Date(2024, 3, 17);
      const tasks = filterTasks(
        {
          tasks: [
            // In filter
            { isCompleted: true, startDate: new Date(2024, 3, 8) } as any,
            { isCompleted: true, startDate: new Date(2024, 3, 14) } as any,
            // not in filter
            { isCompleted: true, startDate: new Date(2024, 3, 7) } as any,
            { isCompleted: true, startDate: new Date(2024, 3, 15) } as any,
          ],
        },
        "pastWeek",
        currentDate
      );
      expect(tasks).toEqual([
        { isCompleted: true, startDate: new Date(2024, 3, 8) } as any,
        { isCompleted: true, startDate: new Date(2024, 3, 14) } as any,
      ]);
    });
    it("twoWeeksAgo filter", () => {
      const currentDate = new Date(2024, 3, 17);
      const tasks = filterTasks(
        {
          tasks: [
            // In filter
            { isCompleted: true, startDate: new Date(2024, 3, 1) } as any,
            { isCompleted: true, startDate: new Date(2024, 3, 7) } as any,
            // not in filter
            { isCompleted: true, startDate: new Date(2024, 2, 31) } as any,
            { isCompleted: true, startDate: new Date(2024, 3, 8) } as any,
          ],
        },
        "twoWeeksAgo",
        currentDate
      );
      expect(tasks).toEqual([
        { isCompleted: true, startDate: new Date(2024, 3, 1) } as any,
        { isCompleted: true, startDate: new Date(2024, 3, 7) } as any,
      ]);
    });
  });
});
