import { createTask, startTask } from "../actions/task-actions";
import { configureAppStore, updateTime } from "../store";

describe("createTask", () => {
  it("check initial state", () => {
    const store = configureAppStore({});
    expect(store.getState().currentTask.state).toBe("inited");
    expect(store.getState().currentTask.primaryDisabled).toBe(true);
    expect(store.getState().currentTask.primaryAction).toBe("startTask");
    expect(store.getState().currentTask.secondaryDisabled).toBe(true);
    expect(store.getState().currentTask.secondaryAction).toBe("stopTask");
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
  it("should not create timer in task already started", () => {
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
    expect(store.getState().currentTask.primaryAction).toBe("pauseTask");
    expect(store.getState().timer.state).toBe("running");
  });
  it("should setup startTime", () => {});
});
describe("completeTask", () => {
  it("should mark task completed", () => {});
  it("should increment completed_pomodoro", () => {});
  it("should move to initedTask state if has task", () => {});
  it("should move to inited state if has not task", () => {});
});
