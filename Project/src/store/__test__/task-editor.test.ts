import { taskEditorSlice } from "../slicies/task-editor";
import { addTask, changeTask } from "../slicies/tasks-slice";

describe("TaskEditorSlice", () => {
  it("should reset taskName after task added", () => {
    const initialState = {
      ...taskEditorSlice.getInitialState(),
      taskName: "task1",
    };
    expect(initialState.taskName).toBe("task1");
    const state = taskEditorSlice.reducer(initialState, addTask("task1"));

    expect(state.editTaskName).toBe("");
  });
  it("after changeTask switch to create task", () => {
    const initialState = {
      ...taskEditorSlice.getInitialState(),
      taskName: "task1",
      isEdit: true,
      tasks: [{ id: 0, name: "task1" }],
    };
    const state = taskEditorSlice.reducer(initialState, changeTask(0, "task1"));

    expect(state.editTaskName).toBe("");
    expect(state.isEdit).toBe(false);
  });
});
