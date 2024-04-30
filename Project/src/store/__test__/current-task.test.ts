import { currentTaskSlice } from "../slicies/current-task";
import { addTask } from "../slicies/tasks-slice";

describe("current task slice", () => {
  it("should changed after new task added if it has inited", () => {
    const state = currentTaskSlice.reducer(
      { state: "workInited", taskId: 10 },
      addTask("task2")
    );

    expect(state.state).toBe("workInited");
    expect(state.taskId).toBe(10);
  });

  it("startTask action", () => {
    const state = currentTaskSlice.reducer(
      {
        ...currentTaskSlice.getInitialState(),
        ...{ state: "workInited", taskId: 10 },
      },
      currentTaskSlice.actions.startTask()
    );
    expect(state.state).toBe("workTimer");
    expect(!!state.secondaryDisabled).toBe(true);
    expect(!!state.primaryDisabled).toBe(false);
    expect(state.primaryAction).toBe("pauseTask");
    expect(state.secondaryAction).toBe("stopTask");
  });
});
