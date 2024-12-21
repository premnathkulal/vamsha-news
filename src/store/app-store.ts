import { configureStore } from "@reduxjs/toolkit";
import uiControlsReducers from "./slices/ui-controls";

const appStore = configureStore({
  reducer: {
    uiControls: uiControlsReducers,
  },
});

export default appStore;

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
