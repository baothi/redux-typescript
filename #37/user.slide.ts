import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// First, create the thunk
export const fetchListUsers = createAsyncThunk(
    'users/fetchListUsers',
    async () => {
        const res = await fetch("http://localhost:8000/users");
        const data = await res.json();
        return data;
    }
)

interface IUserPayload {
    email: string;
    name: string;
}

export const createNewUser = createAsyncThunk(
    'users/createNewUser',
    async (payload: IUserPayload, thunkAPI) => {
        const res = await fetch("http://localhost:8000/users", {
            method: "POST",
            body: JSON.stringify({
                email: payload.email,
                name: payload.name
            }),
            headers: {
                "Content-Type": " application/json"
            }
        });
        const data = await res.json();
        if (data && data.id) {
            //create succeed
            thunkAPI.dispatch(fetchListUsers())
        }
        return data;
    }
)

export const updateAUser = createAsyncThunk(
    'users/updateUser',
    async (payload: any, thunkAPI) => {
        const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
            method: "PUT",
            body: JSON.stringify({
                email: payload.email,
                name: payload.name,
            }),
            headers: {
                "Content-Type": " application/json"
            }
        });
        const data = await res.json();
        if (data && data.id) {
            //create succeed
            thunkAPI.dispatch(fetchListUsers())
        }
        return data;
    }
)

interface IUser {
    id: number;
    name: string;
    email: string
}


const initialState: {
    listUsers: IUser[];
    isCreateSuccess: boolean;
    isUpdateSuccess: boolean;
} = {
    listUsers: [],
    isCreateSuccess: false,
    isUpdateSuccess: false
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetCreate(state) {
            state.isCreateSuccess = false;
        },
        resetUpdate(state) {
            state.isUpdateSuccess = false;
        },

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchListUsers.fulfilled, (state, action) => {
            // Add user to the state array
            state.listUsers = action.payload;
        }),

            builder.addCase(createNewUser.fulfilled, (state, action) => {
                // Add user to the state array
                state.isCreateSuccess = true;
            }),

            builder.addCase(updateAUser.fulfilled, (state, action) => {
                // Add user to the state array
                state.isUpdateSuccess = true;
            })
    },
})

// Action creators are generated for each case reducer function
export const { resetCreate, resetUpdate } = userSlide.actions

export default userSlide.reducer