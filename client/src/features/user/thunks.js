import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserRoute } from "./api";

export const fetchUser = createAsyncThunk("/fetch/user", async () => {
  const res = await fetchUserRoute();
  return res;
});
