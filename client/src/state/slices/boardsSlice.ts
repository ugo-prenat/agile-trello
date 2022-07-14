import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Board } from '../../model'

export interface BoardState {
  boards: Board[]
}

const initialState: BoardState = {
  boards: [
    { id: 1657812243952, title: 'Premier tableau', columns: [] },
    { id: 1657812243932, title: 'Un autre', columns: [] }
  ]
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addBoard: (state: any, action: PayloadAction<Board>) => {
      state.boards = [ ...state.boards, action.payload ]
    },
    removeBoard: (state: any, action: PayloadAction<number>) => {
      state.boards = state.boards.filter((board:Board) => board.id !== action.payload)
    },
  },
})

export const { addBoard, removeBoard } = boardSlice.actions

export default boardSlice.reducer