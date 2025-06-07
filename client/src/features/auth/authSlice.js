import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAuthRoute, postLoginRoute, postSignupRoute } from "./api";

const initialState = {
  auth: null,
  loading: false,
  error: null,
};

export const fetchAuth = createAsyncThunk("/fetch/auth", async () => {
  const res = await fetchAuthRoute();
  return res;
});

export const login = createAsyncThunk(
  "/login/auth",
  async ({ email, password }) => {
    const res = await postLoginRoute({ email, password });
    return res;
  }
);

export const signup = createAsyncThunk("/signup/auth", async (user) => {
  const res = await postSignupRoute(user);
  return res;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.auth = action.payload;
    });
    builder.addCase(fetchAuth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.auth = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(signup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.auth = action.payload;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default authSlice.reducer;
