import { configureStore } from "@reduxjs/toolkit";
import issuesReducer from "./slices/issuesSlice";
import { issuesApi } from "./services/issuesApi";

export const store = configureStore({
  reducer: {
    issues: issuesReducer,
    [issuesApi.reducerPath]: issuesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(issuesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;