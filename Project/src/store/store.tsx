import {
  configureStore,
  createAsyncThunk,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { rootReducer } from "./reducers";
import { addTask } from "./slicies/tasks-slice";
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
