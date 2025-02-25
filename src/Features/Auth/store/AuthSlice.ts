import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthenticationResponse } from "../../../store/services/authApiAlice";

interface IAuthData {
  userId: number | null;
  name: string | null;
  jwtToken: string | null;
  refreshToken: string | null;
}

interface AuthSliceState {
  authData: IAuthData;
}

const initialState: AuthSliceState = {
  authData: {
    jwtToken: null,
    name: null,
    refreshToken: null,
    userId: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set credentials with token and refresh token
    setCredentials: (state, action: PayloadAction<IAuthenticationResponse>) => {
      state.authData.userId = action.payload.userId;
      state.authData.name = action.payload.name;
      state.authData.jwtToken = action.payload.jwtToken;
      state.authData.refreshToken = action.payload.refreshToken;
    },

    // Clear auth information on logout
    logout: (state) => {
      state.authData.jwtToken = null;
      state.authData.refreshToken = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
