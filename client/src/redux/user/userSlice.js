import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {
    name: "pppp",
  },
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      (state.loading = false),
        (state.error = false),
        (state.currentUser = action.payload);
    },
    signInFailure: (state, action) => {
      (state.error = action.payload),
        (state.loading = false),
        (state.currentUser = null);
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export const userReducer = userSlice.reducer;
