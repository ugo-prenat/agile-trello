import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Board, Card, Column } from '../../model'
import { RootState } from '../store'

export interface BoardState {
  boards: Board[]
}

const initialState: BoardState = {
  boards: [
    { id: 1, title: 'Basic Agile Board', columns: [
      { id: new Date().valueOf(), title: 'Stories', color: 'afa', board: 1, cards: [] },
      { id: new Date().valueOf()+10, title: 'To do', color: 'faa', board: 1, cards: [] },
      { id: new Date().valueOf()+20, title: 'In progress', color: 'aaf', board: 1, cards: [] },
      { id: new Date().valueOf()+30, title: 'Done', color: 'ffsad', board: 1, cards: [] }
    ]},
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
        return state
      })
    },
    removeColumn: (state: any, action: PayloadAction<{boardId: number, columnId: number}>) => {
      state.boards.map((board:Board) => {
        if (board.id === action.payload.boardId) {
          board.columns = board.columns.filter((column:Column) => column.id !== action.payload.columnId)
        }
        return state
      })
    },
    addCard: (state: any, action: PayloadAction<Card>) => {
      state.boards.map((board:Board) => {
        if (board.id === action.payload.board) {
          board.columns.map((column:Column) => {
            if (column.id === action.payload.column) {
              column.cards.push(action.payload)
            }
            return state
          })
        }
        return state
      })
    },
    removeCard: (state: any, action: PayloadAction<Card>) => {
      state.boards.map((board:Board) => {
        if (board.id === action.payload.board) {
          board.columns.map((column:Column) => {
            if (column.id === action.payload.column) {
              const newCards:Card[] = column.cards.filter(card => card.id !== action.payload.id)
              column.cards = newCards
            }
            return state
          })
        }
        return state
      })
    },
    editCard: (state: any, action: PayloadAction<Card>) => {
      state.boards.map((board:Board) => {
        if (board.id === action.payload.board) {
          board.columns.map((column:Column) => {
            if (column.id === action.payload.column) {
              column.cards.map((card:Card, index: number) => {
                if (card.id === action.payload.id) {
                  column.cards[index] = action.payload
                }
                return state
              })
            }
            return state
          })
        }
        return state
      })
    },
    moveCard: (state: any, action: PayloadAction<{card: Card, source: {droppableId: string, index: number}, destination: {droppableId: string, index: number}}>) => {
      const payload = action.payload

      // Remove card
      state.boards.map((board:Board) => {
        if (board.id === payload.card.board) {
          board.columns.map((column:Column) => {
            if (column.id === +payload.source.droppableId) {
              const newCards:Card[] = column.cards.filter(card => card.id !== payload.card.id)
              column.cards = newCards
            }
            return state
          })
        }
        return state
      })
      
      // Add card
      state.boards.map((board:Board) => {
        if (board.id === payload.card.board) {
          board.columns.map((column:Column) => {
            if (column.id === +payload.destination.droppableId) {
              column.cards.splice(payload.destination.index, 0, payload.card)
            }
            return state
          })
        }
        return state
      })
      
    }
  },
})

export const {
  addBoard, removeBoard,
  addColumn, removeColumn,
  addCard, removeCard, editCard, moveCard
} = boardSlice.actions

export default boardSlice.reducer