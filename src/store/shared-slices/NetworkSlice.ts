import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  isOnline: boolean;
}

const initialState: ThemeState = {
  isOnline: true,
};

const netWorkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    SetOnline: (state) => {
      state.isOnline = true;
    },
    SetOffline: (state) => {
      state.isOnline = false;
    },
  },
});

export const { SetOnline, SetOffline } = netWorkSlice.actions;
export default netWorkSlice.reducer;
