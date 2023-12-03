import { configureStore } from '@reduxjs/toolkit'
import counterSlide from '../counter/counter.slide'
import userReducer from '../redux/user/user.slide'

export const store = configureStore({
  reducer: {
    counter: counterSlide,
    user: userReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch