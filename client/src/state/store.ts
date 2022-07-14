import { configureStore } from '@reduxjs/toolkit'
import { boardSlice } from './slices/boardsSlice'


const store = configureStore({
  reducer: {
    boards: boardSlice.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export const selectBoards = (state: RootState) => state.boards.boards


export default store
