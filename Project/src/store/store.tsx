import {
  ActionCreator,
  configureStore,
  createAsyncThunk,
  createListenerMiddleware,
  createSelector,
  isAnyOf,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { rootReducer } from "./reducers";
import { CurrentTask, currentTaskSlice } from "./slicies/current-task";
import { SerialiazableTask, addTask, tasksSlice } from "./slicies/tasks-slice";
import { timerSlice } from "./slicies/timer-slice";
export const updateTime = createAsyncThunk<void, number, { state: RootState }>(
  "updateTimer",
  (delta: number, thunkAPI) => {
    thunkAPI.dispatch(timerSlice.actions.updateTime(delta));
    if (timerSlice.selectSlice(thunkAPI.getState()).state === "end") {
      // thunkAPI.dispatch(timerEnd)
    }
  }
);

const BREAK_TIME = 10 * 1000;
const TASK_TIME = 20 * 1000;

export const createTask = createAsyncThunk<void, string, { state: RootState }>(
  "createTask",
  (text, { dispatch, getState }) => {
    const addTaskAction = addTask(text);
    dispatch(addTaskAction);
    if (currentTask(getState()).taskId === undefined) {
      dispatch(currentTaskSlice.actions.initTask(addTaskAction.payload.id));
      dispatch(timerSlice.actions.create(TASK_TIME));
    }
  }
);

export const startTask = createAsyncThunk<void, void, { state: RootState }>(
  "startTask",
  (_, { dispatch }) => {
    dispatch(currentTaskSlice.actions.startTask());
    dispatch(timerSlice.actions.start());
  }
);

export const pauseTask = createAsyncThunk<void, void, { state: RootState }>(
  "pauseTask",
  (_, { dispatch }) => {
    dispatch(currentTaskSlice.actions.pauseTask());
    dispatch(timerSlice.actions.stop());
  }
);
export const stopTask = createAsyncThunk<void, void, { state: RootState }>(
  "stopTask",
  (_, { dispatch }) => {
    dispatch(currentTaskSlice.actions.stopTask());
    dispatch(timerSlice.actions.stop());
  }
);
export const continueTask = createAsyncThunk<void, void, { state: RootState }>(
  "continueTask",
  (_, { dispatch }) => {
    dispatch(currentTaskSlice.actions.continueTask());
    dispatch(timerSlice.actions.start());
  }
);

export const startBreak = createAsyncThunk<void, void, { state: RootState }>(
  "startBreak",
  (_, { dispatch, getState }) => {
    dispatch(currentTaskSlice.actions.startBreak());
    dispatch(timerSlice.actions.create(BREAK_TIME));
  }
);

export const pauseBreak = createAsyncThunk<void, void, { state: RootState }>(
  "pauseBreak",
  (_, { dispatch, getState }) => {
    dispatch(currentTaskSlice.actions.pauseBreak());
    dispatch(timerSlice.actions.stop());
  }
);
export const continueBreak = createAsyncThunk<void, void, { state: RootState }>(
  "continueBreak",
  (_, { dispatch, getState }) => {
    dispatch(currentTaskSlice.actions.continueBreak());
    dispatch(timerSlice.actions.start());
  }
);
export const nextOrContinueTask = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("nextOrContinueTask", (_, { dispatch, getState }) => {
  dispatch(currentTaskSlice.actions.nextOrContinueTask());
});
export const completeTask = createAsyncThunk<void, void, { state: RootState }>(
  "completeTask",
  (_, { dispatch, getState }) => {
    // dispatch(task ) getState()
    dispatch(currentTaskSlice.actions.pauseBreak());
    // dispatch(timerSlice.actions.stop());
  }
);

const fakeTask = { id: -1, name: "", pomodoroCount: 0 };

export const currentTask = createSelector(
  currentTaskSlice.selectSlice,
  (state: RootState) => {
    const currentTask = currentTaskSlice.selectSlice(state);
    if (currentTask.taskId !== undefined) {
      return tasksSlice.selectors.getTask(state, currentTask.taskId);
    } else {
      return fakeTask;
    }
  },
  (currentTask, task) => {
    return {
      ...currentTask,
      ...task,
    };
  }
);

const mapStateToPrimaryName: {
  [key in CurrentTask["state"]]: string;
} = {
  inited: "Старт",
  workInited: "Старт",
  workTimer: "Пауза",
  workPause: "Cтарт",
  break: "Старт",
  breakTimer: "Пауза",
  breakStop: "Продолжить",
  workStop: "Продолжить",
};

const mapStateToPrimaryAction: {
  [key in CurrentTask["state"]]: (() => ActionCreator<void>) | undefined;
} = {
  inited: undefined,
  workInited: startTask,
  workTimer: pauseTask,
  workPause: continueTask,
  break: continueBreak,
  breakTimer: pauseBreak,
  breakStop: continueBreak,
  workStop: pauseTask,
};
const mapStateToSecondaryName: {
  [key in CurrentTask["state"]]: string;
} = {
  inited: "Стоп",
  workInited: "Стоп",
  workTimer: "Стоп",
  workPause: "Стоп",
  break: "Стоп",
  breakTimer: "Продолжить",
  breakStop: "Продолжить",
  workStop: "Сделано",
};

const mapStateToSecondaryAction: {
  [key in CurrentTask["state"]]: (() => ActionCreator<void>) | undefined;
} = {
  inited: undefined,
  workInited: undefined,
  workTimer: startBreak,
  workPause: startBreak,
  break: nextOrContinueTask,
  breakTimer: nextOrContinueTask,
  breakStop: nextOrContinueTask,
  workStop: completeTask,
};

export const taskActions = createSelector(
  (state: RootState) => state.currentTask.state,
  (currentState) => {
    return {
      primaryActionName: mapStateToPrimaryName[currentState],
      primaryAction: mapStateToPrimaryAction[currentState],
      secondaryActionName: mapStateToSecondaryName[currentState],
      secondaryAction: mapStateToSecondaryAction[currentState],
    };
  }
);

export function generateTasks(
  currentDate = new Date(),
  seed = 1
): SerialiazableTask[] {
  const totalMilisecondInDay = 1000 * 60 * 60 * 24;

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
    currentDate = new Date(currentDate.getTime() - totalMilisecondInDay);
    id = id - 1;
  }
  return result.reverse();
}

export function configureAppStore(preloadedState = {}) {
  const listenerMiddleware = createListenerMiddleware();
  listenerMiddleware.startListening({
    predicate: isAnyOf(addTask),
    effect: () => {
      console.log("Added___");
    },
  });
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  });
  if (process.env.NODE_ENV !== "production" && (module as any).hot) {
    (module as any).hot.accept("./reducers", () =>
      store.replaceReducer(rootReducer)
    );
  }
  return store;
}

type Store = ReturnType<typeof configureAppStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = Store["dispatch"];
export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // Export a hook that can be reused to resolve types
