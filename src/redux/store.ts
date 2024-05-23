import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./features/usersSlice";
import receiptsReducer from "./features/receiptSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    receipts: receiptsReducer, // Add the receipts reducer here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
