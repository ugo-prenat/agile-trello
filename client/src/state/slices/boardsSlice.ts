import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Board, Column } from '../../model'

export interface BoardState {
  boards: Board[]
}

const initialState: BoardState = {
  boards: [
    { id: 1657812243952, title: 'Premier tableau', columns: [
      {
        id: 1657812243952,
        title: 'colonne 1',
        board: 1657812243952,
        cards: [
          {
            id: new Date().valueOf(),
            title: 'Card 01',
            column: 1657812243952
          }
        ]
      },
      {
        id: new Date().valueOf()+12,
        title: 'colonne 2',
        board: 1657812243952,
        cards: []
      }
    ] },
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
    addColumn: (state: any, action: PayloadAction<Column>) => {
      state.boards.map((board:Board) => {
        if (board.id === action.payload.board) {
          board.columns.push(action.payload)
        }
      })
    },
    removeColumn: (state: any, action: PayloadAction<{boardId: number, columnId: number}>) => {
      state.boards.map((board:Board) => {
        if (board.id === action.payload.boardId) {
          board.columns.filter(column => column.id !== action.payload.columnId)
        }
      })
    },
  },
})

export const { addBoard, removeBoard, addColumn, removeColumn } = boardSlice.actions

export default boardSlice.reducer