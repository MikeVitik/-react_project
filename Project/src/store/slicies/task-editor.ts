import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addTask, changeTask } from "./tasks-slice";

export const taskEditorSlice = createSlice({
  name: "taskEditor",
  initialState: { isEdit: false, editTaskName: "", editTaskId: -1 },
  reducers: {
    updateEditTaskName: (state, action: PayloadAction<string>) => {
      state.editTaskName = action.payload;
    },
    editTask: {
      prepare: (taskId: number, name: string) => {
        return { payload: { taskId, name } };
      },
      reducer: (
        state,
        action: PayloadAction<{ taskId: number; name: string }>
      ) => {
        state.editTaskName = action.payload.name;
        state.editTaskId = action.payload.taskId;
        state.isEdit = true;
      },
    },
    cancelTaskEdit: (state) => {
      state.editTaskName = "";
      state.editTaskId = -1;
      state.isEdit = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTask, (state) => {
      state.editTaskName = "";
    });
    builder.addCase(changeTask, (state) => {
      state.editTaskName = "";
      state.isEdit = false;
    });
  },
});

export const { editTask, cancelTaskEdit, updateEditTaskName } =
  taskEditorSlice.actions;
