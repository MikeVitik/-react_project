import { TASK_TIME } from "../../const";
import { CurrentTask } from "../../slicies/current-task";
import { Timer, timerSlice } from "../../slicies/timer-slice";
import { configureAppStore } from "../../store";
import {
  completeTask,
  continueTask,
  createTask,
  nextTask,
  pauseBreak,
  pauseTask,
  startBreak,
  startTask,
} from "../task-actions";
import { updateTime } from "../update-time";

describe("taskActions", () => {
  describe("createTask", () => {
    it("check initial state", () => {
      const store = configureAppStore({});
      expect(store.getState().currentTask.state).toBe("inited");
    });
    it("should add task, setCurrent task and timer", () => {
      const store = configureAppStore({});
      store.dispatch(createTask("New Task"));
      expect(store.getState().tasks[0].name).toBe("New Task");
      expect(store.getState().currentTask.taskId).toBe(
        store.getState().tasks[0].id
      );
      expect(store.getState().currentTask.state).toBe("workInited");
      expect(store.getState().timer.state).toBe("created");
      expect(store.getState().timer.totalTime).toBeGreaterThan(0);
    });
    it("should not create timer if task already started", () => {
      const store = configureAppStore({});
      store.dispatch(createTask("New Task"));
      store.dispatch(startTask());
      store.dispatch(updateTime(200));
      store.dispatch(createTask("New Task 2"));
      expect(store.getState().tasks[0].name).toBe("New Task");
      expect(store.getState().currentTask.taskId).toBe(
        store.getState().tasks[0].id
      );
      expect(store.getState().currentTask.state).toBe("workTimer");
      expect(store.getState().timer.state).toBe("running");
      expect(store.getState().timer.totalTime).toBeGreaterThan(200);
    });
  });

  describe("startTask", () => {
    it("should update cuttentTask and run timer", () => {
      const store = configureAppStore({});
      store.dispatch(createTask("New Task"));
      store.dispatch(startTask());

      expect(store.getState().currentTask.state).toBe("workTimer");
      //      expect(store.getState().currentTask.primaryAction).toBe("pauseTask");
      expect(store.getState().timer.state).toBe("running");
    });
  });
  describe("pauseTask", () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date(2020, 3, 1, 10, 0, 0, 0));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it("should add statistic item", () => {
      const store = configureAppStore({});
      store.dispatch(createTask("New Task"));
      store.dispatch(startTask());
      store.dispatch(timerSlice.actions.updateTime(3000));
      store.dispatch(pauseTask());
      expect(store.getState().currentTask.state).toBe("workPause");
      expect(store.getState().currentTask.hasPause).toBe(true);
      expect(store.getState().statisticInfo.length).toBe(1);
      expect(store.getState().statisticInfo[0]).toEqual({
        startDateString: "Wed, 01 Apr 2020 07:00:00 GMT",
        taskId: expect.any(Number),
        type: "work",
        workTime: 3000,
      });
    });

    it("should add pause statistic after continueTask", async () => {
      const store = configureAppStore({});
      store.dispatch(createTask("New Task"));
      store.dispatch(timerSlice.actions.updateTime(3000));
      store.dispatch(startTask());

      store.dispatch(timerSlice.actions.updateTime(3000));
      store.dispatch(pauseTask());
      store.dispatch(timerSlice.actions.updateTime(1500));

      store.dispatch(continueTask());
      expect(store.getState().currentTask.hasPause).toBe(true);
      expect(store.getState().statisticInfo.length).toBe(2);
      expect(store.getState().statisticInfo[1]).toEqual({
        startDateString: "Wed, 01 Apr 2020 07:00:00 GMT",
        taskId: expect.any(Number),
        type: "pause",
        pauseTime: 1500,
      });
    });
  });

  describe("break", () => {
    it("startBreak timer pause", () => {
      const store = configureAppStore({
        currentTask: { taskId: 0, state: "workPause" },
        timer: {
          time: 200,
          currentTime: 500,
          state: "pause",
          totalTime: 1000,
        } satisfies Timer,
        tasks: [{ id: 0, name: "New Task" }],
      });
      store.dispatch(startBreak());
      expect(store.getState().currentTask.state).toBe("break");
      expect(store.getState().timer.state).toEqual("created");
      expect(store.getState().statisticInfo[0]).toEqual({
        startDateString: expect.any(String),
        taskId: 0,
        type: "pause",
        pauseTime: 500,
      });
    });
    it("startBreak timer running", () => {
      const store = configureAppStore({
        currentTask: {
          taskId: 0,
          state: "workTimer",
          hasPause: true,
        } satisfies CurrentTask,
        timer: {
          time: 1000,
          currentTime: 500,
          state: "running",
          totalTime: 2000,
        },
        tasks: [{ id: 0, name: "New Task" }],
      });
      store.dispatch(startBreak());
      expect(store.getState().currentTask.state).toBe("break");
      expect(store.getState().timer.state).toEqual("created");
      expect(store.getState().statisticInfo[0]).toEqual({
        startDateString: expect.any(String),
        taskId: 0,
        type: "work",
        workTime: 500,
      });
    });
    it("startBreak from timer end", () => {
      const store = configureAppStore({
        currentTask: {
          taskId: 0,
          state: "workTimer",
        } satisfies CurrentTask,
        timer: { time: 1000, currentTime: 1000, state: "end", totalTime: 1000 },
        tasks: [{ id: 0, name: "New Task" }],
      });
      store.dispatch(startBreak());
      expect(store.getState().currentTask.state).toBe("break");
      expect(store.getState().timer.state).toEqual("created");
      expect(store.getState().statisticInfo[0]).toEqual({
        startDateString: expect.any(String),
        taskId: 0,
        completedPomodoro: 1000,
        type: "work",
        workTime: 1000,
      });
    });
  });

  describe("pauseBreak", () => {
    it("should create new timer if time is end", () => {
      const store = configureAppStore({
        currentTask: {
          taskId: 0,
          state: "breakTimer",
        } satisfies CurrentTask,
        timer: { time: 1000, currentTime: 1000, state: "end", totalTime: 1000 },
        tasks: [{ id: 0, name: "New Task" }],
      });
      store.dispatch(pauseBreak());
      expect(store.getState().currentTask.state).toBe("breakStop");
      expect(store.getState().timer.state).toEqual("created");
    });
    it("should create stop timer", () => {
      const store = configureAppStore({
        currentTask: {
          taskId: 0,
          state: "breakTimer",
        } satisfies CurrentTask,
        timer: {
          time: 500,
          currentTime: 1000,
          state: "running",
          totalTime: 500,
        },
        tasks: [{ id: 0, name: "New Task" }],
      });
      store.dispatch(pauseBreak());
      expect(store.getState().currentTask.state).toBe("breakStop");
      expect(store.getState().timer.state).toEqual("pause");
    });
  });

  describe("completeTask", () => {
    const initialState = {
      currentTask: {
        taskId: 0,
        state: "workStop",
      } satisfies CurrentTask,
      timer: { time: 1000, currentTime: 1000, state: "end", totalTime: 1000 },
      tasks: [{ id: 0, name: "New Task" }],
    };
    it("should mark task completed", () => {
      const store = configureAppStore(initialState);
      store.dispatch(completeTask());
      expect(store.getState().currentTask.state).toBe("break");
      expect(store.getState().timer.state).toEqual("created");
      expect(store.getState().tasks[0].isCompleted).toBe(true);
    });
    it("should set current task taskId to undefined if no task", () => {
      const store = configureAppStore(initialState);
      store.dispatch(completeTask());
      expect(store.getState().currentTask.taskId).toBeUndefined();
    });
    it("should set current task next taskId", () => {
      const store = configureAppStore({
        ...initialState,
        tasks: [
          { id: 0, name: "New Task" },
          { id: 1, name: "New Task 1" },
        ],
      });
      store.dispatch(completeTask());
      expect(store.getState().currentTask.taskId).toBe(1);
    });
  });

  describe("nextOrContinueTask", () => {
    const initialState = {
      currentTask: {
        taskId: 0,
        state: "workStop",
      } satisfies CurrentTask,
      timer: { time: 1000, currentTime: 1000, state: "end", totalTime: 1000 },
      tasks: [{ id: 0, name: "New Task" }],
    };
    it("should move to work inited task state and set timer to TASK_TIME", () => {
      const store = configureAppStore(initialState);
      store.dispatch(nextTask());
      expect(store.getState().currentTask.state).toBe("workInited");
      expect(store.getState().timer.state).toEqual("created");
      expect(store.getState().timer.totalTime).toEqual(TASK_TIME);
      expect(store.getState().tasks[0].isCompleted).toBeUndefined();
    });
    it("should move to inited task state and set timer to 0", () => {
      const store = configureAppStore({
        ...initialState,
        currentTask: {
          taskId: undefined,
          state: "workStop",
        } satisfies CurrentTask,
      });
      store.dispatch(nextTask());
      expect(store.getState().currentTask.state).toBe("inited");
      expect(store.getState().timer.state).toEqual("inited");
      expect(store.getState().timer.totalTime).toEqual(0);
      expect(store.getState().tasks[0].isCompleted).toBeUndefined();
    });
  });
});
