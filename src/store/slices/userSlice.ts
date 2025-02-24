import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role?: string;
}

interface UserState {
  users: User[];
  total: number;
  loading: boolean;
  error: string | null;
  page: number;
  rowsPerPage: number;

}

const initialState: UserState = {
  users: [],
  total: 0,
  loading: false,
  error: null,
  page: 0,
  rowsPerPage: 10,
  
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ page, perPage }: { page: number; perPage: number }, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}&per_page=${perPage}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch users");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPage, setRowsPerPage } = userSlice.actions;
export default userSlice.reducer;
