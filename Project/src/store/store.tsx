import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { addTask } from "./slicies/tasks-slice";

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
