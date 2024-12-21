import { createSlice } from "@reduxjs/toolkit";

const uiControls = createSlice({
  name: "uiControls",
  initialState: {
    isMobileDevice: false,
    isSideBarOpen: false,
  },
  reducers: {
    setIsMobileDevice(state, action) {
      state.isMobileDevice = action.payload;
    },
    setIsSideBarOpen(state) {
      state.isSideBarOpen = !state.isSideBarOpen;
    },
  },
});

export const { setIsMobileDevice, setIsSideBarOpen } = uiControls.actions;
export default uiControls.reducer;
