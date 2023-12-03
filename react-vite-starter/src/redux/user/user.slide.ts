import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import userService from './userService';

// Define a type for your user data
interface IUser {
  // Define user properties here
    id: number;
    name: string;
    email: string;
}

// Define the state type
interface UserState {
  listUsers: IUser[];
  loading: boolean;
  error: string | null;
}

// Initial state with types
const initialState: UserState = {
  listUsers: [],
  loading: false,
  error: null,
}

// Async thunk with TypeScript
export const fetchListUsers = createAsyncThunk<
  IUser[], // Type of the return value
  void, // First argument to the payload creator
  { rejectValue: string } // Types for ThunkAPI
>(
  'users/fetchListUsers',
  async (_, thunkAPI) => {
    try {
      const response = await userService.fetchUsers();
      return response;
    } catch (error) {
      // Type check and cast the error
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        // Handle cases where the error is not an instance of Error
        // You might want to return a generic error message here
        return thunkAPI.rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

// Slice with TypeScript
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchListUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchListUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
      state.listUsers = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchListUsers.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload ?? 'An unexpected error occurred'; // Provide a default error message
        state.loading = false;
    });
  },
});

export default userSlice.reducer;