import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import userService from './userService';

// Define a type for your user data
interface IUser {
  // Define user properties here
    id?: number;
    name?: string;
    email?: string;
}

// Define the state type
interface UserState {
  listUsers: IUser[];
  createUsers: IUser[];
  loading: boolean;
  isError: boolean,
  isSuccess: boolean,
  isCreateSuccess: boolean
  
}

// Initial state with types
const initialState: UserState = {
  listUsers: [],
  createUsers: [],
  loading: false,
  isError: false,
  isSuccess: false,
  isCreateSuccess: false
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

export const fetchCreateUsers = createAsyncThunk(
  'users/fetchCreateUsers',
  async (newUser: IUser, thunkAPI) => {
    try {
      const response = await userService.fetchCreateNewUsers(newUser);
      if(response && response.id){
        thunkAPI.dispatch(fetchListUsers());
      }
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
  reducers: {
    resetCreate(state){
      state.isCreateSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchListUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
      state.listUsers = action.payload;
      state.loading = false;
      state.isSuccess = true;
    });
    builder.addCase(fetchListUsers.rejected, (state) => {
        state.isError= false,
        state.loading = false;
    });
    builder.addCase(fetchCreateUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCreateUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
      state.createUsers = action.payload;
      state.loading = false;
      state.isCreateSuccess= true;
    });
    builder.addCase(fetchCreateUsers.rejected, (state) => {
        state.isError= false,
        state.loading = false;
    });
  },
});

export const { resetCreate } = userSlice.actions;

export default userSlice.reducer;